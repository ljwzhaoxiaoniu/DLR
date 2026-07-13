import os
import sqlite3
from collections import OrderedDict
from typing import List, Dict
from pathlib import Path
from models.physical_models import PhysicalTable, PhysicalColumn
from utils.logger import logger
from config import SQLITE_DIR

class PhysicalScanner:
    """SQLite物理结构扫描器"""

    def __init__(self, sqlite_dir: Path = SQLITE_DIR):
        self.sqlite_dir = sqlite_dir
        self.db_files = self._find_all_dbs()
        logger.info(f"发现 {len(self.db_files)} 个SQLite数据库文件")

    def _find_all_dbs(self) -> List[Path]:
        """Find all SQLite database files.

        Searches:
        1. Primary SQLITE_DIR (top-level + one level of subdirectories)
        2. Additional data roots (e.g. bench databases in sibling directories)
        """
        found = OrderedDict()  # path -> Path, dedup while preserving order

        def add_candidates(candidates):
            for p in candidates:
                rp = p.resolve()
                if rp not in found:
                    found[rp] = p

        # 1. Primary SQLITE_DIR
        if self.sqlite_dir.exists():
            add_candidates(self.sqlite_dir.glob("*.db"))
            add_candidates(self.sqlite_dir.glob("*.sqlite"))
            add_candidates(self.sqlite_dir.glob("*/*.db"))
            add_candidates(self.sqlite_dir.glob("*/*.sqlite"))

        # 2. Additional data roots — scan known bench locations
        #    Walk up from SQLITE_DIR to find project-level data directories
        extra_roots = self._find_extra_data_roots()
        for root in extra_roots:
            if root.exists():
                # Structure: root/db_name/db_name.sqlite (one dir per database)
                # Also match root/*.sqlite and root/*.db at top level
                add_candidates(root.glob("*/*.sqlite"))
                add_candidates(root.glob("*/*.db"))
                add_candidates(root.glob("*.sqlite"))
                add_candidates(root.glob("*.db"))

        return list(found.values())

    def _find_extra_data_roots(self) -> List[Path]:
        """Find additional data root directories to scan for SQLite files."""
        roots = []
        # Collect all ancestors up to 4 levels above SQLITE_DIR
        ancestors = []
        current = self.sqlite_dir
        for _ in range(4):
            parent = current.parent
            if parent == current or parent in ancestors:
                break
            ancestors.append(parent)
            current = parent

        # Check each ancestor for known bench data locations
        for ancestor in ancestors:
            candidate = ancestor / "MINIDEV_sqlite" / "dev_databases"
            if candidate.exists() and candidate not in roots:
                roots.append(candidate)

        return roots

    def scan_all(self) -> List[PhysicalTable]:
        """扫描所有SQLite数据库的结构"""
        all_tables = []
        for db_file in self.db_files:
            try:
                tables = self._scan_single_db(db_file)
                all_tables.extend(tables)
                logger.info(f"扫描数据库 {db_file.name} 完成，发现 {len(tables)} 张表")
            except Exception as e:
                logger.error(f"扫描数据库 {db_file.name} 失败: {str(e)}")
        return all_tables

    def _scan_single_db(self, db_file: Path) -> List[PhysicalTable]:
        """扫描单个SQLite数据库的结构"""
        tables = []
        db_name = db_file.stem
        conn = None
        try:
            conn = sqlite3.connect(str(db_file))
            cursor = conn.cursor()

            # 查询所有表
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'")
            table_names = [row[0] for row in cursor.fetchall()]

            for table_name in table_names:
                # 查询表字段信息（用双引号包裹表名，兼容中文/空格/特殊字符）
                cursor.execute(f'PRAGMA table_info("{table_name}")')
                columns_info = cursor.fetchall()

                physical_columns = []
                for col in columns_info:
                    cid, col_name, col_type, notnull, dflt_value, pk = col
                    column_id = f"{db_name}.{table_name}.{col_name}"
                    physical_column = PhysicalColumn(
                        column_id=column_id,
                        table_name=table_name,
                        column_name=col_name,
                        data_type=col_type,
                        is_primary_key=pk == 1
                    )
                    physical_columns.append(physical_column)

                table_id = f"{db_name}.{table_name}"
                physical_table = PhysicalTable(
                    table_id=table_id,
                    db_name=db_name,
                    table_name=table_name,
                    columns=physical_columns
                )
                tables.append(physical_table)

            return tables
        finally:
            if conn:
                conn.close()
