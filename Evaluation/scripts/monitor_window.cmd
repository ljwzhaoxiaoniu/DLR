@echo off
chcp 65001 >nul
set PYTHONIOENCODING=utf-8
rem 窗口标题由调用方设定（eval_run.sh 用 start "<标题>" 传入 run_id），此处不覆盖
"D:\ProgramData\anaconda3\envs\lepe_som\python.exe" "%~dp0monitor_runs.py" --watch 5 --until-done %*
echo.
echo 监控已退出（跑题进程全部结束）。10 秒后关闭窗口...
timeout /t 10 >nul
