# Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### 1. Clone & Install
```bash
git clone https://github.com/etelford32/elliottelford_dotcom.git
cd elliottelford_dotcom
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Visit: `http://localhost:3000`

### 3. View Prototype Page
Visit: `http://localhost:3000/prototype`

Test components, colors, and performance metrics.

## 📦 Key Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Build and preview locally

# Testing
npm run type-check      # Check TypeScript
npm run lint            # Check code quality
npm run lint:fix        # Auto-fix linting issues

# Deployment Builds
npm run build:preview      # Build for preview/testing
npm run build:production   # Build for production
```

## 🌐 URLs

- **Local**: `http://localhost:3000`
- **Prototype**: `http://localhost:3000/prototype`
- **Preview** (after deployment): Auto-generated Vercel URL
- **Production** (future): `https://elliottelford.com`

## 🔧 Environment Setup

Copy `.env.local.example` to `.env.local` for secrets:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your API keys (not committed to Git).

## 📱 What's Available Now

- ✅ Responsive navigation (desktop + mobile)
- ✅ Custom dark theme with starfield background
- ✅ UI component library (Button, Card, Badge, Modal, etc.)
- ✅ Prototype/testing page
- ✅ Development environment banner
- ✅ Deployment configuration

## 🎯 Next Steps

1. Customize social links in `lib/constants.ts`
2. Update site metadata in `lib/constants.ts`
3. Add your own content
4. Deploy to Vercel (see `DEPLOYMENT.md`)

## 📚 Documentation

- `README.md` - Project overview
- `DEPLOYMENT.md` - Full deployment guide
- `IMPLEMENTATION_PLAN.md` - Roadmap for all phases

## 🆘 Need Help?

- Build fails? Run `npm run type-check`
- Styling issues? Check `app/globals.css`
- Deployment? See `DEPLOYMENT.md`

---

**Happy coding!** 🎉
