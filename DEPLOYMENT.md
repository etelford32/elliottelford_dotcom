# Deployment Guide - elliottelford.com

## 🚀 Deployment Environments

This project supports three deployment environments:

### 1. **Development** (Local)
- **URL**: `http://localhost:3000`
- **Environment**: `development`
- **Dev Banner**: ✅ Shown
- **Use Case**: Local development and testing

### 2. **Preview/Prototype** (Vercel Preview)
- **URL**: Auto-generated Vercel preview URL
- **GitHub Pages**: `https://etelford32.github.io/elliottelford_dotcom`
- **Environment**: `preview`
- **Dev Banner**: ✅ Shown (purple)
- **Use Case**: Testing, optimization, stakeholder review
- **Special Page**: `/prototype` - Component testing and metrics

### 3. **Production**
- **URL**: `https://elliottelford.com`
- **Environment**: `production`
- **Dev Banner**: ❌ Hidden
- **Use Case**: Live public website

## 📦 Deployment Methods

### Method 1: Vercel (Recommended)

#### Initial Setup

1. **Install Vercel CLI** (optional for manual deployments):
   ```bash
   npm install -g vercel
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js configuration

3. **Set Environment Variables** in Vercel Dashboard:
   ```
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_ENVIRONMENT=production
   NEXT_PUBLIC_SHOW_DEV_BANNER=false
   ```

#### Automatic Deployments (GitHub Actions)

The project is configured with GitHub Actions for automatic deployments:

**Preview Deployments** (`.github/workflows/deploy-preview.yml`):
- Triggered on: Push to `claude/*`, `dev`, `preview` branches
- Triggered on: Pull requests to `main`
- Environment: `preview`
- Shows dev banner

**Production Deployments** (`.github/workflows/deploy-production.yml`):
- Triggered on: Push to `main` branch
- Triggered on: Manual workflow dispatch
- Environment: `production`
- No dev banner

#### Required GitHub Secrets

Add these to your repository's secrets (Settings → Secrets and variables → Actions):

```
VERCEL_TOKEN=<your-vercel-token>
VERCEL_ORG_ID=<your-vercel-org-id>
VERCEL_PROJECT_ID=<your-vercel-project-id>
```

To get these values:
1. Vercel Token: Account Settings → Tokens → Create Token
2. Org & Project IDs: Run `vercel link` in your project

#### Manual Deployment

```bash
# Preview deployment
vercel

# Production deployment
vercel --prod
```

### Method 2: GitHub Pages (Static Export)

For a static export deployment (limited features):

1. **Update next.config.ts**:
   ```typescript
   const config: NextConfig = {
     output: 'export',
     basePath: '/elliottelford_dotcom',
   };
   ```

2. **Build static site**:
   ```bash
   npm run build
   ```

3. **Deploy `out/` directory** to GitHub Pages

**Note**: Static export has limitations (no API routes, no ISR, etc.)

## 🛠️ Build Commands

```bash
# Development
npm run dev

# Build for preview
npm run build:preview

# Build for production
npm run build:production

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix

# Build and start locally
npm run preview
```

## 📊 Prototype/Testing Page

Access the prototype page at `/prototype` to:

- Test UI components
- View color palette and typography
- Check performance metrics
- Verify responsive design
- Test different scenarios

This page is available in all environments and includes environment information.

## 🔧 Environment Variables

### Local Development (`.env.development`)
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ENVIRONMENT=development
NEXT_PUBLIC_SHOW_DEV_BANNER=true
```

### Preview/Testing (`.env.preview`)
```env
NEXT_PUBLIC_SITE_URL=https://your-preview-url.vercel.app
NEXT_PUBLIC_ENVIRONMENT=preview
NEXT_PUBLIC_PREVIEW_MODE=true
NEXT_PUBLIC_SHOW_DEV_BANNER=true
```

### Production (`.env.production`)
```env
NEXT_PUBLIC_SITE_URL=https://elliottelford.com
NEXT_PUBLIC_ENVIRONMENT=production
NEXT_PUBLIC_SHOW_DEV_BANNER=false
```

### Secrets (`.env.local` - NOT committed)
```env
# Email Service
EMAIL_API_KEY=your_api_key

# Newsletter
NEWSLETTER_API_KEY=your_api_key

# Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Steam
NEXT_PUBLIC_STEAM_APP_ID=your_steam_app_id
```

## 🚦 Deployment Workflow

### Feature Development
1. Create branch from `main`: `git checkout -b feature/my-feature`
2. Develop locally: `npm run dev`
3. Test thoroughly
4. Push branch: `git push origin feature/my-feature`
5. GitHub Actions automatically deploys preview
6. Review preview deployment
7. Create PR to `main`
8. Review and merge

### Production Deployment
1. Merge PR to `main`
2. GitHub Actions automatically deploys to production
3. Verify deployment at production URL

### Hotfix
1. Create branch: `git checkout -b hotfix/issue-name`
2. Fix issue
3. Test locally
4. Push and create PR
5. Fast-track review and merge
6. Auto-deploy to production

## 📈 Monitoring & Analytics

### Performance Monitoring
- Use Vercel Analytics for real-time metrics
- Monitor Core Web Vitals
- Check `/prototype` page for manual testing

### Error Tracking
- Set up Sentry or similar (optional)
- Monitor Vercel deployment logs
- Check browser console in different environments

## 🔒 Security Checklist

- [x] Environment variables properly configured
- [x] No secrets in Git
- [x] Security headers in `vercel.json`
- [x] HTTPS enforced in production
- [ ] Add Content Security Policy (future)
- [ ] Configure rate limiting (future)

## 🎯 Pre-Deployment Checklist

Before deploying to production:

- [ ] All TypeScript errors resolved
- [ ] Linting passes (`npm run lint`)
- [ ] Build succeeds (`npm run build:production`)
- [ ] Tested on multiple browsers
- [ ] Tested on mobile devices
- [ ] Performance metrics acceptable
- [ ] Accessibility audit passed
- [ ] SEO metadata complete
- [ ] Analytics configured
- [ ] Error tracking configured

## 📞 Troubleshooting

### Build Fails
- Check TypeScript errors: `npm run type-check`
- Check for missing dependencies: `npm install`
- Verify environment variables are set

### Preview Not Working
- Verify GitHub Actions secrets are set
- Check workflow run logs in GitHub Actions tab
- Ensure branch name matches workflow triggers

### Production Issues
- Check Vercel deployment logs
- Verify production environment variables
- Test in preview environment first

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [GitHub Actions](https://docs.github.com/en/actions)

---

**Last Updated**: December 26, 2024
**Maintained By**: Elliot Telford
