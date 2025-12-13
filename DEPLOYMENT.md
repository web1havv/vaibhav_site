# Deployment Instructions for GitHub Pages

## Repository Information

- **Repository**: `https://github.com/web1havv/vaibhav_site.git`
- **Custom Domain**: `vaibhav16.me`
- **Deployment Branch**: `gh-pages`

## Step 1: Initial Setup (if needed)

1. Go to https://github.com/web1havv/vaibhav_site
2. Make sure the repository exists and is public

## Step 2: Push Code to GitHub

```bash
git branch -M main
git remote add origin https://github.com/web1havv/vaibhav_site.git
git push -u origin main
```

## Step 3: Deploy to GitHub Pages

```bash
npm run deploy
```

This will:
- Build the production version
- Create a `gh-pages` branch
- Push the built files to that branch (including the CNAME file for custom domain)

## Step 4: Configure GitHub Pages

1. Go to your repository on GitHub: https://github.com/web1havv/vaibhav_site
2. Click "Settings" tab
3. Click "Pages" in the left sidebar
4. Under "Source":
   - Select "Deploy from a branch"
   - Select branch: `gh-pages`
   - Select folder: `/ (root)`
   - Click "Save"
5. Under "Custom domain":
   - Enter: `vaibhav16.me`
   - Click "Save"

Wait 1-2 minutes, then your site will be live at:
**https://vaibhav16.me**

## Updating the Site

Whenever you make changes:

```bash
# Make your changes to the code
git add .
git commit -m "Description of changes"
git push

# Deploy updated version
npm run deploy
```

## Custom Domain Setup (vaibhav16.me)

The site is configured to use the custom domain `vaibhav16.me`.

**DNS Configuration Required:**
Configure your domain's DNS settings with your registrar:
- **Option 1 (Recommended)**: Add a CNAME record:
  - Type: `CNAME`
  - Name: `@` (or root domain)
  - Value: `web1havv.github.io`
  
- **Option 2**: Add A records pointing to GitHub's IPs:
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153

The `public/CNAME` file is already configured with `vaibhav16.me` and will be deployed automatically.

## Troubleshooting

**Site not loading CSS/JS?**
- The `base` path in `vite.config.js` is set to `'/'` for the custom domain
- Make sure you've deployed with `npm run deploy` after any changes

**404 on page reload?**
- This is normal for single-page apps on GitHub Pages
- You can add a 404.html that redirects to index.html if needed

**Changes not showing?**
- Hard refresh your browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Wait a few minutes for GitHub Pages to rebuild
- Check if `npm run deploy` completed successfully
