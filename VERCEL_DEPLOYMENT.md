# Vercel Deployment Guide for Web Kebonarum

This guide will walk you through setting up and deploying this project to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your code to GitHub
3. **Environment Variables**: Prepare API keys for YouTube and Google Drive

## Step 1: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

1. **Install Vercel CLI**:

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:

   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

### Option B: Using GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Select "Import Git Repository"
4. Select your GitHub repository
5. Click "Import"

## Step 2: Configure Environment Variables

After deployment starts, you need to add environment variables:

1. **In Vercel Dashboard**:
   - Go to your project → Settings → Environment Variables
   - Add the following variables:

```
FRONTEND_ORIGIN=https://your-project.vercel.app
BACKEND_PORT=5050
YOUTUBE_API_KEY=your_youtube_api_key
YOUTUBE_CHANNEL_ID=your_channel_id (optional)
GOOGLE_DRIVE_API_KEY=your_google_drive_api_key
GOOGLE_DRIVE_FOLDER_ID=your_folder_id
```

### Getting API Keys

#### YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable YouTube Data API v3
4. Create an API key (Credentials → Create Credentials → API Key)
5. Copy the key to `YOUTUBE_API_KEY`

#### Google Drive API Key

1. In the same Google Cloud project:
2. Enable Google Drive API
3. Use the same or create a new API key
4. Copy the key to `GOOGLE_DRIVE_API_KEY`

## Step 3: Redeploy with Environment Variables

1. After adding environment variables, trigger a redeploy:
   ```bash
   vercel --prod
   ```

Or in the Vercel Dashboard:

- Go to Deployments → Select latest → Click the 3-dot menu → Redeploy

## Project Structure

```
web-kebonarum/
├── api/                          # Serverless API functions
│   ├── health.js                # Health check endpoint
│   ├── cors.js                  # CORS middleware
│   ├── youtube/
│   │   └── videos.js            # YouTube videos endpoint
│   └── documentation/
│       ├── index.js             # List documentation
│       └── [id].js              # Folder details & images
├── src/                         # React frontend
├── backend/                     # Backend services (for reference)
├── public/                      # Static files
├── vercel.json                  # Vercel configuration
├── .vercelignore               # Files to ignore in deployment
├── .env.example                 # Example environment variables
└── package.json
```

## API Endpoints

After deployment, your API endpoints will be:

- `GET /api/health` - Health check
- `GET /api/youtube/videos` - Get YouTube videos
- `GET /api/documentation` - List documentation folders
- `GET /api/documentation/:id` - Get folder details
- `GET /api/documentation/:id/images` - Get folder images

## Configuration Files

### vercel.json

- Specifies build command and output directory
- Configures serverless functions
- Sets up rewrites for React routing

### .vercelignore

- Excludes unnecessary files from deployment
- Prevents build bloat

### .env.example

- Template for environment variables
- Copy and fill with actual values

## Troubleshooting

### API Routes Not Working

1. Check environment variables are set in Vercel Dashboard
2. Verify API keys are valid and have proper permissions
3. Check Vercel function logs: Deployments → Select deployment → Functions

### CORS Issues

- Make sure `FRONTEND_ORIGIN` is set correctly in environment variables
- It should match your Vercel app URL

### Build Errors

1. Check Node.js version (currently set to 18.x in vercel.json)
2. Verify all dependencies are in package.json
3. Check build logs in Vercel Dashboard

### API Quota Issues

- YouTube API has free tier limits
- Google Drive API has rate limiting
- Consider implementing caching on the frontend

## Local Development

To test locally before deployment:

```bash
# Install dependencies
npm install

# Create .env file with your variables
cp .env.example .env
# Edit .env with your actual API keys

# Run locally
npm run dev
```

## Continuous Deployment

After initial setup:

- Push changes to GitHub
- Vercel automatically redeploys on push to main branch
- Previous deployments available for rollback

## Next Steps

1. ✅ Configure environment variables
2. ✅ Verify API endpoints are working
3. ✅ Test the application in Vercel URL
4. ✅ Set up custom domain (optional)
5. ✅ Configure analytics (optional)

## Support

For more information:

- [Vercel Documentation](https://vercel.com/docs)
- [React Deployment](https://vercel.com/guides/deploying-react)
- [Environment Variables](https://vercel.com/docs/environment-variables)
