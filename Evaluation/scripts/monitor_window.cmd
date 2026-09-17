@echo off
chcp 65001 >nul
set PYTHONIOENCODING=utf-8
title DLR 跑题监控 - PID / 范式 / 题号 / 运行 / CPU / 内存
"D:\ProgramData\anaconda3\envs\lepe_som\python.exe" "%~dp0monitor_runs.py" --watch 5 --until-done %*
echo.
echo 监控已退出（跑题进程全部结束）。10 秒后关闭窗口...
timeout /t 10 >nul
