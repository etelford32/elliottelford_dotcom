# 🚀 Deploy to Vercel - Quick Guide

## Step 1: Deploy via Vercel Dashboard (Easiest Method - 3 Minutes)

### Option A: Web Interface (Recommended for First Deployment)

1. **Go to Vercel**
   - Visit: https://vercel.com
   - Click "Sign Up" or "Log In"
   - Choose "Continue with GitHub"

2. **Import Your Repository**
   - Click "Add New..." → "Project"
   - Find `elliottelford_dotcom` in your repository list
   - Click "Import"

3. **Configure Project** (most settings are auto-detected)
   - **Framework Preset**: Next.js ✅ (auto-detected)
   - **Root Directory**: `./` ✅
   - **Build Command**: `npm run build` ✅
   - **Output Directory**: `.next` ✅
   - **Install Command**: `npm install` ✅

4. **Add Environment Variables** (Optional for first deploy)
   Click "Environment Variables" and add these for **Preview**:
   ```
   NEXT_PUBLIC_ENVIRONMENT = preview
   NEXT_PUBLIC_PREVIEW_MODE = true
   NEXT_PUBLIC_SHOW_DEV_BANNER = true
   ```

5. **Click "Deploy"**
   - Wait 1-2 minutes for build
   - You'll get a URL like: `https://elliottelford-dotcom-xyz.vercel.app`

6. **🎉 Visit Your Live Prototype!**
   ```
   Main Site: https://your-project.vercel.app
   Prototype: https://your-project.vercel.app/prototype
   ```

---

## Step 2: Set Up Automatic Deployments (GitHub Actions)

Once your project is deployed, enable automatic deployments:

### 2.1 Get Your Vercel Token

1. Go to: https://vercel.com/account/tokens
2. Click "Create Token"
3. Name it: "GitHub Actions"
4. Click "Create"
5. **Copy the token** (you won't see it again!)

### 2.2 Link Project Locally (Get IDs)

Run this in your terminal:

```bash
# Login to Vercel (opens browser)
vercel login

# Link your project
vercel link

# Answer the prompts:
# - Set up and deploy? → N (no)
# - Link to existing project? → Y (yes)
# - Project name? → elliottelford_dotcom
```

This creates `.vercel/project.json` with your IDs.

### 2.3 Get Your Project IDs

```bash
# View your org ID
cat .vercel/project.json | grep orgId

# View your project ID
cat .vercel/project.json | grep projectId
```

Copy these values!

### 2.4 Add GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Add these three secrets:

   **Secret 1: VERCEL_TOKEN**
   - Name: `VERCEL_TOKEN`
   - Value: [paste token from step 2.1]

   **Secret 2: VERCEL_ORG_ID**
   - Name: `VERCEL_ORG_ID`
   - Value: [paste orgId from .vercel/project.json]

   **Secret 3: VERCEL_PROJECT_ID**
   - Name: `VERCEL_PROJECT_ID`
   - Value: [paste projectId from .vercel/project.json]

### 2.5 Test Automatic Deployment

```bash
# Make a small change
echo "# Deployment Test" >> README.md

# Commit and push
git add README.md
git commit -m "test: Trigger automatic deployment"
git push origin claude/setup-website-project-96vhy
```

**Go to GitHub → Actions tab** to see your deployment running!

---

## Step 3: Verify Everything Works

### Check Your Deployments

1. **Vercel Dashboard**: https://vercel.com/dashboard
   - See all deployments
   - View build logs
   - Check performance metrics

2. **GitHub Actions**: https://github.com/etelford32/elliottelford_dotcom/actions
   - Monitor automated deployments
   - Check workflow runs
   - View build status

3. **Your Live Sites**:
   - Preview Branch: `https://elliottelford-dotcom-[hash].vercel.app`
   - Prototype Page: Add `/prototype` to any URL

### Test Features

Visit your prototype page and test:
- ✅ Performance Monitor (Start FPS tracking)
- ✅ Responsive Tester (Resize window)
- ✅ Animation Tester (Try different animations)
- ✅ Component Playground (Customize buttons/badges)
- ✅ Dev Banner (Should show "Preview" mode)

---

## Quick Reference

### Deploy Commands

```bash
# Preview deployment (current branch)
vercel

# Production deployment
vercel --prod

# Check deployment status
vercel ls

# View project info
vercel inspect
```

### Your URLs

After deployment, you'll have:
- **Preview URL**: `https://elliottelford-dotcom-[hash].vercel.app`
- **Prototype**: `https://elliottelford-dotcom-[hash].vercel.app/prototype`
- **Production** (when you merge to main): `https://elliottelford-dotcom.vercel.app`

### Environment Variables

Set these in Vercel Dashboard → Project Settings → Environment Variables:

**For Preview/Development:**
```
NEXT_PUBLIC_ENVIRONMENT=preview
NEXT_PUBLIC_PREVIEW_MODE=true
NEXT_PUBLIC_SHOW_DEV_BANNER=true
```

**For Production:**
```
NEXT_PUBLIC_ENVIRONMENT=production
NEXT_PUBLIC_PREVIEW_MODE=false
NEXT_PUBLIC_SHOW_DEV_BANNER=false
NEXT_PUBLIC_SITE_URL=https://elliottelford.com
```

---

## Troubleshooting

### Build Fails
- Check Vercel build logs in dashboard
- Run `npm run build` locally first
- Verify all dependencies are in package.json

### GitHub Actions Not Running
- Verify all 3 secrets are added
- Check branch name matches workflow triggers
- Look at Actions tab for error messages

### Preview URL Not Working
- Check Vercel dashboard for deployment status
- Verify build succeeded
- Try hard refresh (Ctrl+Shift+R)

---

## Next Steps After Deployment

1. **Share Your Prototype**
   - Copy the prototype URL
   - Share with team/stakeholders
   - Get feedback on components and design

2. **Run Performance Tests**
   - Use Lighthouse on the live URL
   - Check Core Web Vitals
   - Test on real mobile devices

3. **Set Up Custom Domain** (Optional)
   - Go to Vercel → Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration steps

4. **Enable Analytics** (Optional)
   - Vercel Analytics (built-in)
   - Google Analytics
   - Other analytics tools

---

## Success Checklist

- [ ] Vercel account created
- [ ] Project deployed successfully
- [ ] Can access preview URL
- [ ] Prototype page works (`/prototype`)
- [ ] Performance Monitor functioning
- [ ] Responsive Tester working
- [ ] Animations playing smoothly
- [ ] Component Playground interactive
- [ ] Dev banner showing "Preview" mode
- [ ] Vercel CLI installed
- [ ] Project linked locally
- [ ] GitHub secrets added (all 3)
- [ ] Automatic deployments working
- [ ] GitHub Actions running on push

---

**🎉 You're Live!**

Your prototype is now publicly accessible for testing and optimization!

Need help? Check:
- [VERCEL_SETUP.md](./VERCEL_SETUP.md) - Detailed deployment guide
- [PROTOTYPE_GUIDE.md](./PROTOTYPE_GUIDE.md) - Testing workflows
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Full deployment documentation
