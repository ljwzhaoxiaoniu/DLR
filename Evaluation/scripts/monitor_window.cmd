@echo off
chcp 65001 >nul
set PYTHONIOENCODING=utf-8
rem Window title comes from the caller (eval_run.sh via start "<title>"); do not override here.
"D:\ProgramData\anaconda3\envs\lepe_som\python.exe" "%~dp0monitor_runs.py" --watch 5 --until-done %*
echo.
echo Monitor exited (all eval processes finished). Closing in 10s...
"%SystemRoot%\System32\timeout.exe" /t 10 >nul
exit
