# Deployment Instructions for GitHub Pages

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `vaibhav_site` (or any name you prefer)
3. Leave it public
4. Don't initialize with README
5. Click "Create repository"

## Step 2: Push Code to GitHub

From the vaibhav site directory:

```bash
git init
git add .
git commit -m "Initial commit: Personal portfolio"
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
- Push the built files to that branch

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

## Optional: Custom Domain

To use your own domain (e.g., vaibhav16.me):

1. Buy a domain from any registrar
2. Create a file `public/CNAME` with your domain:
   ```
   vaibhav16.me
   ```
3. Update `vite.config.js` and change `base: '/vaibhav_site/'` to `base: '/'`
4. Configure your domain's DNS:
   - Add A records pointing to GitHub's IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - Or add a CNAME record: `web1havv.github.io`
5. Deploy: `npm run deploy`
6. In GitHub Settings → Pages, add your custom domain

## Troubleshooting

**Site not loading CSS/JS?**
- Make sure `base: '/'` in `vite.config.js` matches your setup
- If using custom domain, set `base: '/'`

**404 on page reload?**
- This is normal for single-page apps on GitHub Pages
- You can add a 404.html that redirects to index.html if needed

**Changes not showing?**
- Hard refresh your browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Wait a few minutes for GitHub Pages to rebuild
- Check if `npm run deploy` completed successfully
