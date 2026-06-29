# Deployment Guide (Vercel)

## Overview

CODED Web is designed to deploy on **Vercel**, the platform built by the creators of Next.js. The project uses Next.js 16 with Turbopack and requires minimal configuration.

## Prerequisites

- A Vercel account (free tier works for initial deployment)
- The GitHub repository connected to Vercel
- (Optional) An Anthropic API key for AI features

## Deployment Steps

### 1. Connect Repository

1. Go to [vercel.com](https://vercel.com) and sign in.
2. Click **"Add New Project"**.
3. Import the `mkjalothman/coded-platform` repository.
4. Set the **Root Directory** to `coded-web`.
5. Vercel will auto-detect Next.js and configure build settings.

### 2. Configure Build Settings

Vercel should auto-detect these, but verify:

| Setting | Value |
|---------|-------|
| Framework | Next.js |
| Root Directory | `coded-web` |
| Build Command | `next build` |
| Output Directory | `.next` |
| Install Command | `npm install` |

### 3. Set Environment Variables

In the Vercel project dashboard, go to **Settings → Environment Variables**:

| Variable | Required | Value |
|----------|----------|-------|
| `ANTHROPIC_API_KEY` | No | Your Anthropic API key (`sk-ant-...`) |

The AI features (chat and recommendations) work without the API key by falling back to local logic. Add the key to enable Claude-powered responses.

**Important**: Never commit API keys to the repository. Use Vercel's environment variables exclusively.

### 4. Deploy

Click **Deploy**. Vercel will:

1. Install dependencies
2. Run `next build`
3. Deploy the static and serverless outputs
4. Assign a `.vercel.app` URL

### 5. Custom Domain (Optional)

1. Go to **Settings → Domains**.
2. Add your custom domain (e.g., `coded.kw`).
3. Configure DNS records as instructed by Vercel.

## Environment-Specific Configuration

### Preview Deployments

Every push to a non-production branch creates a preview deployment with its own URL. This is useful for reviewing changes before merging.

### Production Deployments

Pushes to `main` (or your configured production branch) trigger production deployments.

## Monitoring

### Build Logs

Available in the Vercel dashboard under **Deployments → [deployment] → Build Logs**.

### Runtime Logs

For API route debugging, check **Logs** in the Vercel dashboard. The `/api/chat` and `/api/recommend` endpoints run as serverless functions.

### Performance

Vercel provides built-in analytics for Core Web Vitals. Enable it in **Settings → Analytics**.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Check that `coded-web` is set as root directory |
| AI chat returns errors | Verify `ANTHROPIC_API_KEY` is set in environment variables |
| AI chat works locally but not in production | Environment variables may not be set for the correct environment (Preview vs. Production) |
| Static pages show stale content | Trigger a redeployment or check ISR configuration |
| CSS not rendering | Ensure `globals.css` is imported in the root layout |

## CI/CD

The recommended workflow:

1. Create a feature branch
2. Push changes — Vercel creates a preview deployment
3. Review the preview URL
4. Merge to `main` — Vercel deploys to production

No additional CI/CD configuration is needed. Vercel handles the entire pipeline.
