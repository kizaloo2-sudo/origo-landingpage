@echo off
REM Git Push Script for Origo Landing Page Updates

echo ===================================
echo Origo Landing Page - Git Push
echo ===================================
echo.

REM Step 1: Check git status
echo [1/5] Checking git status...
git status
echo.

REM Step 2: Add all changed files
echo [2/5] Adding changed files to git...
git add .
echo.

REM Step 3: Show what will be committed
echo [3/5] Files to be committed:
git status --short
echo.

REM Step 4: Commit with message
echo [4/5] Creating commit...
set /p commit_message="Enter commit message (or press Enter for default): "
if "%commit_message%"=="" set commit_message="Update landing page content - new sections and copy"

git commit -m "%commit_message%"
echo.

REM Step 5: Push to remote
echo [5/5] Pushing to remote repository...
git push
echo.

echo ===================================
echo Done! Changes pushed successfully.
echo ===================================
pause
