# Vercel Deployment Setup - Step by Step

## 🚀 Quick Vercel Setup (5 minutes)

### Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your repositories

### Step 2: Import Your Project

1. Click "Add New..." → "Project"
2. Find `elliottelford_dotcom` in your repository list
3. Click "Import"

### Step 3: Configure Project Settings

**Framework Preset**: Next.js (auto-detected) ✅

**Build Settings** (leave as default):
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

**Environment Variables** (click "Environment Variables" dropdown):

Add these for **Production**:
```
NEXT_PUBLIC_SITE_URL = https://your-project.vercel.app
NEXT_PUBLIC_ENVIRONMENT = production
NEXT_PUBLIC_SHOW_DEV_BANNER = false
```

Add these for **Preview**:
```
NEXT_PUBLIC_ENVIRONMENT = preview
NEXT_PUBLIC_PREVIEW_MODE = true
NEXT_PUBLIC_SHOW_DEV_BANNER = true
```

### Step 4: Deploy!

1. Click "Deploy"
2. Wait 1-2 minutes for initial deployment
3. You'll get a URL like: `https://elliottelford-dotcom.vercel.app`

### Step 5: Get Your Secrets for GitHub Actions

After deployment, run these commands locally:

```bash
# Install Vercel CLI
npm install -g vercel

# Link your project (this gets your IDs)
vercel link
```

You'll be asked:
- Set up and deploy? **N** (no, we just want to link)
- Which scope? Choose your account
- Link to existing project? **Y** (yes)
- What's your project's name? **elliottelford_dotcom**

This creates `.vercel/project.json` with your IDs.

### Step 6: Add GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**

Add these three secrets:

**VERCEL_TOKEN**:
- Go to Vercel → Account Settings → Tokens
- Create new token
- Copy and paste

**VERCEL_ORG_ID**:
- Open `.vercel/project.json` locally
- Copy the `orgId` value

**VERCEL_PROJECT_ID**:
- Open `.vercel/project.json` locally
- Copy the `projectId` value

### Step 7: Test Automatic Deployments

```bash
# Make a small change
echo "# Test" >> README.md

# Commit and push
git add README.md
git commit -m "test: Trigger preview deployment"
git push
```

Go to GitHub → Actions tab to see your workflow running!

## ✅ Verification Checklist

- [ ] Vercel project created
- [ ] Initial deployment successful
- [ ] Production environment variables set
- [ ] Preview environment variables set
- [ ] Vercel CLI installed
- [ ] Project linked locally
- [ ] GitHub secrets added (all 3)
- [ ] Test deployment triggered
- [ ] Automatic deployment works

## 🌐 Your URLs

After setup, you'll have:

- **Production**: `https://your-project.vercel.app`
- **Prototype Page**: `https://your-project.vercel.app/prototype`
- **Preview Branches**: Auto-generated for each branch
- **Custom Domain** (optional): Add in Vercel → Settings → Domains

## 🎯 Quick Reference

### Deploy Preview
```bash
git checkout -b feature/my-feature
# Make changes
git push origin feature/my-feature
# GitHub Actions auto-deploys preview
```

### Deploy Production
```bash
git checkout main
git merge feature/my-feature
git push origin main
# GitHub Actions auto-deploys production
```

### Manual Deploy (if needed)
```bash
vercel           # Preview
vercel --prod    # Production
```

## 🔧 Troubleshooting

**Build fails?**
- Check Vercel build logs
- Run `npm run build` locally first
- Verify environment variables are set

**GitHub Actions not running?**
- Check you added all 3 secrets
- Verify workflow files are in `.github/workflows/`
- Check branch name matches workflow triggers

**Preview not deploying?**
- Branch names with `claude/` prefix are supported
- Check GitHub Actions logs
- Verify Vercel integration is enabled

## 🎉 Next Steps

Once deployed:
1. Share your prototype URL for feedback
2. Test performance with Lighthouse
3. Add custom domain (optional)
4. Set up analytics (optional)

---

**Need help?** Check logs in:
- Vercel Dashboard → Deployments → [Your Deployment] → Build Logs
- GitHub → Actions → [Your Workflow Run]
