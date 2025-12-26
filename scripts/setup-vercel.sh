#!/bin/bash

# Vercel Setup Helper Script
# This script helps you set up Vercel deployment step by step

set -e

echo "🚀 Vercel Setup Helper for elliottelford.com"
echo "=============================================="
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Vercel CLI not found. Installing..."
    npm install -g vercel
    echo "✅ Vercel CLI installed"
else
    echo "✅ Vercel CLI already installed"
fi

echo ""
echo "📋 Step 1: Link your Vercel project"
echo "------------------------------------"
echo "This will connect your local project to Vercel"
echo "You'll be asked to:"
echo "  1. Log in to Vercel (opens browser)"
echo "  2. Set up and deploy? Choose: N (no, just link)"
echo "  3. Link to existing project? Choose: Y (yes)"
echo "  4. Project name: elliottelford_dotcom"
echo ""
read -p "Press Enter to continue..."

vercel link

echo ""
echo "✅ Project linked!"
echo ""
echo "📋 Step 2: Get your Vercel secrets"
echo "-----------------------------------"

if [ -f .vercel/project.json ]; then
    ORG_ID=$(grep -o '"orgId":"[^"]*' .vercel/project.json | sed 's/"orgId":"//')
    PROJECT_ID=$(grep -o '"projectId":"[^"]*' .vercel/project.json | sed 's/"projectId":"//')

    echo ""
    echo "🔑 Your Vercel IDs:"
    echo "==================="
    echo ""
    echo "VERCEL_ORG_ID:"
    echo "$ORG_ID"
    echo ""
    echo "VERCEL_PROJECT_ID:"
    echo "$PROJECT_ID"
    echo ""
    echo "⚠️  You still need to get your VERCEL_TOKEN:"
    echo "   1. Go to: https://vercel.com/account/tokens"
    echo "   2. Create a new token"
    echo "   3. Copy the token value"
    echo ""
else
    echo "❌ Could not find .vercel/project.json"
    echo "   Make sure you completed the 'vercel link' step above"
    exit 1
fi

echo "📋 Step 3: Add secrets to GitHub"
echo "---------------------------------"
echo "Go to your GitHub repository:"
echo "  Settings → Secrets and variables → Actions → New repository secret"
echo ""
echo "Add these three secrets with the values above:"
echo "  1. VERCEL_TOKEN (get from Vercel)"
echo "  2. VERCEL_ORG_ID"
echo "  3. VERCEL_PROJECT_ID"
echo ""
echo "GitHub URL: https://github.com/etelford32/elliottelford_dotcom/settings/secrets/actions"
echo ""

read -p "Press Enter when you've added all secrets to GitHub..."

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "✅ Vercel project linked"
echo "✅ Secrets retrieved"
echo "✅ GitHub secrets configured"
echo ""
echo "🚀 Next steps:"
echo "   1. Push any branch to trigger a preview deployment"
echo "   2. Merge to main to trigger production deployment"
echo "   3. Check GitHub Actions tab to see deployments"
echo ""
echo "📍 Your prototype page will be at:"
echo "   https://your-project.vercel.app/prototype"
echo ""
echo "Happy deploying! 🎊"
