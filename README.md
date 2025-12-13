# Vaibhav Sharma - Personal Portfolio

Personal portfolio website built with React and Vite.

## Local Development

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

**Repository**: `https://github.com/web1havv/vaibhav_site.git`
**Custom Domain**: `vaibhav16.me`

1. Push code to GitHub:
```bash
git branch -M main
git remote add origin https://github.com/web1havv/vaibhav_site.git
git push -u origin main
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

3. Go to your GitHub repository settings:
   - Settings → Pages
   - Under "Source", select "Deploy from a branch"
   - Under "Branch", select "gh-pages" and "/ (root)"
   - Under "Custom domain", enter `vaibhav16.me`
   - Click Save

Your site will be live at: `https://vaibhav16.me`

## Updating the Site

After making changes:
```bash
git add .
git commit -m "Update content"
git push
npm run deploy
```

## Custom Domain Setup

The site is configured to use the custom domain `vaibhav16.me`.

**DNS Configuration:**
- Add a CNAME record: `@` → `web1havv.github.io`
- Or add A records pointing to GitHub's IPs (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153)

The `public/CNAME` file is already configured and will be deployed automatically.
