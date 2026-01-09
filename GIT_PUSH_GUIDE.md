# Git Commands for Origo Landing Page

## Quick Push (Recommended)
Use the provided batch script:
```batch
git-push.bat
```

## Manual Steps

### 1. Check Status
```bash
git status
```

### 2. Add All Changes
```bash
git add .
```

### 3. Commit Changes
```bash
git commit -m "Update landing page content - new sections and copy"
```

### 4. Push to Remote
```bash
git push
```

## What Changed?

### Modified Files:
- `components/landing/Hero.tsx` - Updated headline and subheadline
- `components/landing/ValueProps.tsx` - Updated 3 pillars content
- `app/page.tsx` - Added new sections

### New Files:
- `components/landing/HowItWorks.tsx` - New "How It Works" section
- `components/landing/Credibility.tsx` - New "Who We Are" section
- `components/landing/CTASection.tsx` - New CTA section
- `LANDING_UPDATE_SUMMARY.md` - Documentation of changes

## Commit Message Suggestions

**Short version:**
```
Update landing page with new content sections
```

**Detailed version:**
```
Update landing page content and structure

- Update Hero section with new headline and copy
- Revise ValueProps to focus on Market Direction, Customer Priority, and Execution Efficiency
- Add HowItWorks section with assessment details
- Add Credibility section with company background
- Add final CTA section
- Update main page to include all new sections
```

## Troubleshooting

### If push is rejected:
```bash
# Pull latest changes first
git pull origin main

# Then push again
git push
```

### If you need to force push (use with caution):
```bash
git push --force
```

### Check remote repository:
```bash
git remote -v
```

### Switch branch if needed:
```bash
# Check current branch
git branch

# Switch to main
git checkout main
```
