import os
# 配置Hugging Face国内镜像，解决网络访问问题
os.environ['HF_ENDPOINT'] = 'https://hf-mirror.com'

import numpy as np
import pickle
from typing import List, Dict, Any, Optional
from sentence_transformers import SentenceTransformer
from utils.logger import logger
from config import VECTOR_DB_PATH, EMBEDDING_MODEL, VECTOR_DIM, TOP_K, extract_entity_id

# 尝试导入FAISS，如果没有则用简单的余弦相似度实现
try:
    import faiss
    FAISS_AVAILABLE = True
except ImportError:
    FAISS_AVAILABLE = False
    logger.warning("FAISS不可用，将使用内置余弦相似度实现向量搜索")

class VectorDB:
    """向量数据库封装（FAISS实现，兼容Windows）"""
    _instances: Dict[str, "VectorDB"] = {}

    def __new__(cls, db_path: str = str(VECTOR_DB_PATH)):
        if db_path not in cls._instances:
            instance = super().__new__(cls)
            cls._instances[db_path] = instance
        return cls._instances[db_path]

    def __init__(self, db_path: str = str(VECTOR_DB_PATH)):
        if hasattr(self, 'index'):
            return
        self.db_path = db_path
        self.index = None
        self.id_map = []  # 存储id到向量索引的映射
        self.metadata = []  # 存储每条记录的元数据
        self.embedding_model = None
        self._init_db()
        self._init_embedding_model()

    def _init_db(self):
        """初始化向量数据库"""
        try:
            logger.info(f"初始化向量数据库: {self.db_path}")
            if FAISS_AVAILABLE:
                # 使用FAISS索引
                self.index = faiss.IndexFlatIP(VECTOR_DIM)  # 内积等价于余弦相似度（向量归一化后）
            else:
                # 使用内存存储
                self.vectors = []

            # 尝试加载已有数据
            self._load_data()
            logger.info("向量数据库初始化成功")
        except Exception as e:
            logger.error(f"向量数据库初始化失败: {str(e)}")
            raise

    def _init_embedding_model(self):
        """初始化Embedding模型"""
        try:
            logger.info(f"加载Embedding模型: {EMBEDDING_MODEL}")
            self.embedding_model = SentenceTransformer(EMBEDDING_MODEL)
            logger.info("Embedding模型加载成功")
        except Exception as e:
            logger.error(f"Embedding模型加载失败: {str(e)}")
            raise

    def _normalize_vector(self, vector: List[float]) -> np.ndarray:
        """向量归一化"""
        vec = np.array(vector, dtype=np.float32)
        norm = np.linalg.norm(vec)
        return vec / norm if norm > 0 else vec

    def encode_text(self, text: str) -> List[float]:
        """将文本转换为向量"""
        return self.embedding_model.encode(text).tolist()

    def insert_entity(self, entity_id: str, name: str, description: Optional[str] = None) -> bool:
        """插入业务实体向量"""
        try:
            text = f"{name} {description or ''}"
            vector = self.encode_text(text)
            normalized_vec = self._normalize_vector(vector)

            if FAISS_AVAILABLE:
                self.index.add(normalized_vec.reshape(1, -1))
            else:
                self.vectors.append(normalized_vec)

            self.id_map.append(entity_id)
            self.metadata.append({
                "id": entity_id,
                "name": name,
                "type": "entity",
                "description": description or ""
            })

            logger.info(f"插入实体向量: {entity_id} - {name}")
            return True
        except Exception as e:
            logger.error(f"插入实体向量失败 {entity_id}: {str(e)}")
            return False

    def insert_attribute(self, attr_id: str, name: str, description: Optional[str] = None) -> bool:
        """插入业务属性向量"""
        try:
            text = f"{name} {description or ''}"
            vector = self.encode_text(text)
            normalized_vec = self._normalize_vector(vector)

            if FAISS_AVAILABLE:
                self.index.add(normalized_vec.reshape(1, -1))
            else:
                self.vectors.append(normalized_vec)

            self.id_map.append(attr_id)
            self.metadata.append({
                "id": attr_id,
                "name": name,
                "type": "attribute",
                "description": description or ""
            })

            logger.info(f"插入属性向量: {attr_id} - {name}")
            return True
        except Exception as e:
            logger.error(f"插入属性向量失败 {attr_id}: {str(e)}")
            return False

    def insert_relation(self, relation_id: str, name: str, from_entity_attr_id: str, from_entity_name: str, to_entity_attr_id: str, to_entity_name: str, description: Optional[str] = None) -> bool:
        """插入业务关系向量"""
        try:
            text = f"{name} {from_entity_name} {to_entity_name} {description or ''}"
            vector = self.encode_text(text)
            normalized_vec = self._normalize_vector(vector)

            if FAISS_AVAILABLE:
                self.index.add(normalized_vec.reshape(1, -1))
            else:
                self.vectors.append(normalized_vec)

            # 从属性ID中提取实体ID
            from_entity_id = extract_entity_id(from_entity_attr_id)
            to_entity_id = extract_entity_id(to_entity_attr_id)

            self.id_map.append(relation_id)
            self.metadata.append({
                "id": relation_id,
                "name": name,
                "type": "relation",
                "from_entity_id": from_entity_id,
                "from_entity_attr_id": from_entity_attr_id,
                "from_entity_name": from_entity_name,
                "to_entity_id": to_entity_id,
                "to_entity_attr_id": to_entity_attr_id,
                "to_entity_name": to_entity_name,
                "description": description or ""
            })

            logger.info(f"插入关系向量: {relation_id} - {name} ({from_entity_name} -> {to_entity_name})")
            return True
        except Exception as e:
            logger.error(f"插入关系向量失败 {relation_id}: {str(e)}")
            return False

    # ===================================================================
    # DLR vector methods
    # ===================================================================

    def insert_logical_entity(self, logical_entity_id: str, name: str,
                              description: Optional[str] = None) -> bool:
        """Insert LogicalEntity vector (DLR)."""
        try:
            text = f"{name} {description or ''}"
            vector = self.encode_text(text)
            normalized_vec = self._normalize_vector(vector)

            if FAISS_AVAILABLE:
                self.index.add(normalized_vec.reshape(1, -1))
            else:
                self.vectors.append(normalized_vec)

            self.id_map.append(logical_entity_id)
            self.metadata.append({
                "id": logical_entity_id,
                "name": name,
                "type": "logical_entity",
                "description": description or "",
            })
            logger.info(f"插入逻辑实体向量: {logical_entity_id} - {name}")
            return True
        except Exception as e:
            logger.error(f"插入逻辑实体向量失败 {logical_entity_id}: {e}")
            return False

    def insert_pas_relation(self, relation_id: str, relation_name: str,
                            vector_text: str, from_le_id: str = "",
                            to_le_id: str = "", a_attribute: str = "") -> bool:
        """Insert PAS relation vector (DLR)."""
        try:
            vector = self.encode_text(vector_text)
            normalized_vec = self._normalize_vector(vector)

            if FAISS_AVAILABLE:
                self.index.add(normalized_vec.reshape(1, -1))
            else:
                self.vectors.append(normalized_vec)

            self.id_map.append(relation_id)
            self.metadata.append({
                "id": relation_id,
                "name": relation_name,
                "type": "pas_relation",
                "from_le_id": from_le_id,
                "to_le_id": to_le_id,
                "A_attribute": a_attribute,
                "description": vector_text,
            })
            logger.info(f"插入PAS关系向量: {relation_id} - {relation_name}")
            return True
        except Exception as e:
            logger.error(f"插入PAS关系向量失败 {relation_id}: {e}")
            return False

    def search(self, query: str, top_k: int = TOP_K) -> List[Dict[str, Any]]:
        """语义搜索"""
        try:
            query_vector = self.encode_text(query)
            normalized_query = self._normalize_vector(query_vector)

            if len(self.id_map) == 0:
                logger.warning("向量数据库为空")
                return []

            if FAISS_AVAILABLE:
                # FAISS搜索
                scores, indices = self.index.search(normalized_query.reshape(1, -1), min(top_k, len(self.id_map)))
                results = []
                for i, idx in enumerate(indices[0]):
                    if idx < 0 or idx >= len(self.metadata):
                        continue
                    meta = self.metadata[idx]
                    results.append({
                        "id": meta["id"],
                        "name": meta["name"],
                        "type": meta["type"],
                        "description": meta["description"],
                        "score": float(scores[0][i])
                    })
            else:
                # 内置余弦相似度搜索
                similarities = []
                for vec in self.vectors:
                    sim = np.dot(normalized_query, vec)
                    similarities.append(sim)

                # 获取top_k结果
                top_indices = np.argsort(similarities)[-min(top_k, len(similarities)):][::-1]
                results = []
                for idx in top_indices:
                    meta = self.metadata[idx]
                    results.append({
                        "id": meta["id"],
                        "name": meta["name"],
                        "type": meta["type"],
                        "description": meta["description"],
                        "score": float(similarities[idx])
                    })

            logger.info(f"搜索查询 '{query}' 返回 {len(results)} 条结果")
            for r in results:
                logger.info(f"  - {r['type']} | {r['id']} | score={r['score']:.3f}")
            return results
        except Exception as e:
            logger.error(f"向量搜索失败: {str(e)}")
            return []

    def _load_data(self):
        """加载已有的向量数据"""
        # db_path is the concrete file path (already resolved by config)
        data_path = self.db_path
        try:
            if os.path.exists(data_path):
                with open(data_path, "rb") as f:
                    data = pickle.load(f)
                    self.id_map = data["id_map"]
                    self.metadata = data["metadata"]
                    if FAISS_AVAILABLE:
                        self.index = data["index"]
                    else:
                        self.vectors = data["vectors"]
                logger.info(f"加载已有向量数据，共{len(self.id_map)}条记录")
        except Exception as e:
            logger.warning(f"加载已有向量数据失败: {str(e)}，将创建新的数据库")

    def _save_data(self):
        """保存向量数据到磁盘"""
        # db_path is the concrete file path (already resolved by config)
        data_path = self.db_path
        try:
            data = {
                "id_map": self.id_map,
                "metadata": self.metadata
            }
            if FAISS_AVAILABLE:
                data["index"] = self.index
            else:
                data["vectors"] = self.vectors

            os.makedirs(os.path.dirname(data_path), exist_ok=True)
            with open(data_path, "wb") as f:
                pickle.dump(data, f)
            logger.info("向量数据已保存到磁盘")
        except Exception as e:
            logger.error(f"保存向量数据失败: {str(e)}")

    def clear(self):
        """清空所有数据"""
        try:
            logger.info("清空向量数据库所有数据")
            if FAISS_AVAILABLE:
                self.index = faiss.IndexFlatIP(VECTOR_DIM)
            else:
                self.vectors = []
            self.id_map = []
            self.metadata = []
            # 立即保存清空后的状态
            self._save_data()
            logger.info("向量数据库已清空")
            return True
        except Exception as e:
            logger.error(f"清空向量数据库失败: {str(e)}")
            return False

    def close(self):
        """关闭数据库连接"""
        self._save_data()
        VectorDB._instances.pop(self.db_path, None)
        logger.info("向量数据库连接已关闭")
