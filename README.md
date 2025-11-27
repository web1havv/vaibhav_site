# Vaibhav Sharma - Personal Portfolio

Personal portfolio website built with React and Vite.

## Local Development

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

1. Create a new repository on GitHub named `portfolio-site` (or whatever you prefer)

2. Initialize git and push:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/web1havv/portfolio-site.git
git push -u origin main
```

3. Deploy to GitHub Pages:
```bash
npm run deploy
```

4. Go to your GitHub repository settings:
   - Settings → Pages
   - Under "Source", select "Deploy from a branch"
   - Under "Branch", select "gh-pages" and "/ (root)"
   - Click Save

Your site will be live at: `https://web1havv.github.io/portfolio-site/`

## Updating the Site

After making changes:
```bash
git add .
git commit -m "Update content"
git push
npm run deploy
```

## Custom Domain (Optional)

To use a custom domain:
1. Add a file named `CNAME` in the `public` folder with your domain
2. Configure your domain's DNS settings to point to GitHub Pages
