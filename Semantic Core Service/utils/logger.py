import sys
from loguru import logger
from config import LOG_LEVEL, LOG_FILE

# 移除默认的日志处理器
logger.remove()

# 添加控制台日志
logger.add(
    sys.stdout,
    level=LOG_LEVEL,
    format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>",
    enqueue=True
)

# 添加文件日志
logger.add(
    LOG_FILE,
    level=LOG_LEVEL,
    format="{time:YYYY-MM-DD HH:mm:ss} | {level: <8} | {name}:{function}:{line} - {message}",
    rotation="10 MB",
    retention="30 days",
    compression="zip",
    enqueue=True
)


def reset_log_file_for_paradigm(log_path):
    """Remove existing file handlers and switch to a new paradigm-specific log file.

    Call at the start of a new paradigm serve.
    """
    # Remove any existing file sinks (keep only the console handlers)
    # Snapshot as list of (id, handler) tuples since we mutate during iteration
    sinks = list(logger._core.handlers.items())
    for sink_id, handler in sinks:
        try:
            # handler is a loguru Handler; its underlying sink is handler._sink
            sink = getattr(handler, "_sink", handler)
            is_file = (
                hasattr(sink, "_file") and sink._file is not None
            ) or hasattr(sink, "file_path")
            if is_file:
                logger.remove(sink_id)
        except Exception:
            continue
    # Add new paradigm-specific file sink
    logger.add(
        str(log_path),
        level=LOG_LEVEL,
        format="{time:YYYY-MM-DD HH:mm:ss} | {level: <8} | {name}:{function}:{line} - {message}",
        rotation="10 MB",
        retention="30 days",
        compression="zip",
        enqueue=True,
    )
    logger.info(f"[LOG] 切换到范式日志: {log_path}")


__all__ = ["logger", "reset_log_file_for_paradigm"]
