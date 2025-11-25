# 🚀 Setup & Installation Guide

Complete step-by-step guide to get the Company Intelligence Portal up and running.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
  - Check version: `node --version`
  - Download: [nodejs.org](https://nodejs.org/)
  
- **npm** (comes with Node.js) or **yarn**
  - Check version: `npm --version`
  
- **Git** (for cloning the repository)
  - Check version: `git --version`
  - Download: [git-scm.com](https://git-scm.com/)

- **Base44 Account** (for API access)
  - Sign up at: [base44.com](https://base44.com)
  - Get your App ID from Base44 dashboard

## 🔧 Installation Steps

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/joudathashmi/Company-profile.git

# Navigate to the project directory
cd Company-profile
```

### Step 2: Install Dependencies

```bash
# Install all required packages
npm install

# This will install:
# - React and React DOM
# - Base44 SDK
# - Tailwind CSS
# - Radix UI components
# - Recharts for data visualization
# - And all other dependencies
```

**Expected Output:**
```
added 600 packages, and audited 601 packages
```

### Step 3: Configure Base44 SDK

The Base44 SDK is already configured in `src/api/base44Client.js`:

```javascript
export const base44 = createClient({
  appId: "68d836725a03957a20f5e244",
  requiresAuth: true
});
```

**If you need to use your own Base44 App ID:**
1. Sign up at [base44.com](https://base44.com)
2. Create a new app in your dashboard
3. Copy your App ID
4. Update `src/api/base44Client.js` with your App ID

### Step 4: Start Development Server

```bash
# Start the development server
npm run dev
```

**Expected Output:**
```
  VITE v6.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 5: Open in Browser

Open your browser and navigate to:
```
http://localhost:5173
```

## 🎯 Quick Start Commands

```bash
# Development
npm run dev          # Start development server with hot reload

# Production Build
npm run build        # Build for production (creates 'dist' folder)
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint to check code quality

# Install Dependencies
npm install          # Install all dependencies
```

## 📁 Project Structure

```
Company-profile/
├── src/
│   ├── components/          # React components
│   │   ├── ai-insights/     # AI-powered analysis modules
│   │   ├── dashboard/       # Dashboard components
│   │   ├── common/          # Shared components
│   │   └── ui/              # UI component library
│   ├── pages/               # Main application pages
│   ├── api/                 # Base44 SDK integration
│   ├── hooks/               # Custom React hooks
│   └── utils/               # Utility functions
├── docs/                    # Documentation
│   ├── ARCHITECTURE.md      # System architecture
│   ├── FEATURES.md          # Feature documentation
│   └── API.md               # API integration guide
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── README.md                # Project overview
```

## 🔐 Authentication Setup

The application uses Base44's authentication system:

1. **Automatic Authentication**: Base44 SDK handles authentication automatically
2. **Required**: All operations require authentication (`requiresAuth: true`)
3. **User Management**: Handled through `base44.auth`

## 🌐 Environment Configuration

### Development Environment

No additional environment variables are required. The Base44 SDK handles configuration through the App ID.

### Production Environment

For production deployment:

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting platform:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront
   - GitHub Pages
   - Any static hosting service

3. **Configure Base44 App ID** in production:
   - Update `src/api/base44Client.js` with production App ID if different

## 🐛 Troubleshooting

### Issue: "vite: command not found"

**Solution:**
```bash
npm install
```

### Issue: "Cannot find module '@base44/sdk'"

**Solution:**
```bash
npm install @base44/sdk
```

### Issue: Port 5173 already in use

**Solution:**
```bash
# Kill the process using port 5173
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

### Issue: "Error loading companies"

**Possible Causes:**
- Base44 authentication not set up
- Invalid App ID
- Network connectivity issues

**Solution:**
1. Verify your Base44 App ID is correct
2. Check Base44 dashboard for API status
3. Ensure you're authenticated in Base44

### Issue: Build errors

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
```

## 📦 Dependencies Overview

### Core Dependencies

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Base44 SDK** - Corporate data and AI platform
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible components
- **Recharts** - Data visualization

### Development Dependencies

- **ESLint** - Code linting
- **TypeScript types** - Type definitions
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 🚀 Deployment Options

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify Deployment

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

### GitHub Pages

1. Build the project: `npm run build`
2. Configure GitHub Pages to serve from `dist` folder
3. Update base path in `vite.config.js` if needed

## 📚 Next Steps

After installation:

1. **Explore the Application**
   - Navigate to different company profiles
   - Try the AI Insights features
   - Test the interactive AI chat

2. **Read the Documentation**
   - [README.md](README.md) - Project overview
   - [ARCHITECTURE.md](docs/ARCHITECTURE.md) - System design
   - [FEATURES.md](docs/FEATURES.md) - Feature details
   - [API.md](docs/API.md) - API integration

3. **Customize the Application**
   - Update Base44 App ID if needed
   - Modify company data structure
   - Customize AI prompts
   - Add new analysis modules

## 🆘 Getting Help

- **Documentation**: Check the `docs/` folder
- **Issues**: Open an issue on GitHub
- **Base44 Support**: Contact app@base44.com
- **Community**: Check Base44 documentation

## ✅ Verification Checklist

After installation, verify:

- [ ] Node.js version 18+ installed
- [ ] All dependencies installed (`npm install` completed)
- [ ] Development server starts (`npm run dev`)
- [ ] Application loads in browser (http://localhost:5173)
- [ ] Base44 SDK connected (companies load)
- [ ] AI insights generate successfully
- [ ] No console errors

---

**Ready to go!** Your Company Intelligence Portal should now be running. 🎉

For more information, see the [README.md](README.md) file.
