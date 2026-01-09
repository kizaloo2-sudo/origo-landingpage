@echo off
REM Quick Git Push for Vercel Deployment

echo ===================================
echo Git Push to Trigger Vercel Deploy
echo ===================================
echo.

echo [1/4] Checking git status...
git status
echo.

echo [2/4] Adding all changes...
git add .
echo.

echo [3/4] Committing changes...
git commit -m "Update landing page: new Hero, ValueProps, and additional sections (HowItWorks, Credibility, CTA)"
echo.

echo [4/4] Pushing to remote (will trigger Vercel deployment)...
git push
echo.

echo ===================================
echo Done! 
echo.
echo Vercel will now automatically deploy your changes.
echo Check your Vercel dashboard for deployment status:
echo https://vercel.com/dashboard
echo.
echo Your site will be live in 1-2 minutes.
echo ===================================
pause
