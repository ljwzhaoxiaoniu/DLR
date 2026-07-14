import sys
from loguru import logger
from config import LOG_LEVEL, LOG_FILE, LOG_DIR

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


def _switch_file_sink(log_path: str):
    """Remove existing file sinks and add a new one at *log_path*."""
    sinks = list(logger._core.handlers.items())
    for sink_id, handler in sinks:
        try:
            sink = getattr(handler, "_sink", handler)
            is_file = (
                hasattr(sink, "_file") and sink._file is not None
            ) or hasattr(sink, "file_path")
            if is_file:
                logger.remove(sink_id)
        except Exception:
            continue
    logger.add(
        str(log_path),
        level=LOG_LEVEL,
        format="{time:YYYY-MM-DD HH:mm:ss} | {level: <8} | {name}:{function}:{line} - {message}",
        rotation="10 MB",
        retention="30 days",
        compression="zip",
        enqueue=True,
    )
    logger.info(f"[LOG] 切换到日志: {log_path}")


def reset_log_file_for_paradigm(log_path):
    """Switch to a paradigm-specific log file (serve mode)."""
    _switch_file_sink(log_path)


def reset_log_file_for_build(paradigm: str):
    """Switch to a build-specific log file (build mode).

    Creates ``log/build_{paradigm}_{timestamp}.log``.
    """
    from datetime import datetime
    ts = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    log_path = LOG_DIR / f"build_{paradigm}_{ts}.log"
    _switch_file_sink(str(log_path))
    return log_path


__all__ = ["logger", "reset_log_file_for_paradigm", "reset_log_file_for_build"]
