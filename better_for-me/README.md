# 🚀 LLM Model Explorer & Cost Calculator

An interactive web application to explore, compare, and calculate costs for 2,000+ LLM models across 40+ providers.

## ✨ Features

- **🔍 Model Explorer**: Browse and search through all available models
- **💰 Cost Calculator**: Calculate exact costs for your usage
- **⚖️ Model Comparison**: Side-by-side comparison of any two models
- **🎯 Advanced Filtering**: Filter by provider, type, features, and price
- **📊 Real-time Updates**: All calculations update instantly

## 🚀 Quick Start

### Option 1: Simple HTTP Server (Recommended)

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (with npx)
npx http-server -p 8000

# PHP
php -S localhost:8000
```

Then open: `http://localhost:8000`

### Option 2: VS Code Live Server

1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 📁 Project Structure

```
.
├── index.html          # Main HTML file
├── styles.css          # Styling
├── app.js              # Application logic
├── models/             # Model data (pricing & config)
│   ├── pricing/       # Pricing JSON files
│   └── general/       # Configuration JSON files
└── README.md          # This file
```

## 🎯 Usage

### Model Explorer
- Use the search box to find models by name
- Filter by provider, type, features, or max price
- Click any model card to use it in the calculator

### Cost Calculator
- Select a model from the dropdown
- Enter your token usage (input, output, cache, etc.)
- See real-time cost breakdown and total

### Model Comparison
- Select two models to compare
- View side-by-side comparison of pricing, features, and capabilities

## 🔧 Customization

### Adding More Providers

1. Add pricing data: `models/pricing/[provider].json`
2. Add general data: `models/general/[provider].json`
3. Update `app.js` to include the new files in the `loadData()` function

### Styling

Edit `styles.css` to customize colors, fonts, and layout. The CSS uses CSS variables for easy theming:

```css
:root {
    --primary: #6366f1;
    --bg: #0f172a;
    /* ... */
}
```

## 📊 Data Sources

This tool uses data from the [Portkey Models](https://github.com/Portkey-AI/models) repository, which contains:
- Pricing for 2,000+ models
- Configuration data for all models
- 40+ providers (OpenAI, Anthropic, Google, etc.)

## 🛠️ Future Enhancements

- [ ] Load all providers automatically
- [ ] Historical pricing data
- [ ] Export comparison reports
- [ ] Save favorite models
- [ ] Batch cost calculations
- [ ] API integration
- [ ] Dark/light theme toggle

## 📝 License

This project uses data from Portkey Models repository. Check their license for data usage terms.

## 🤝 Contributing

Feel free to submit issues, fork the repo, and create pull requests!

---

**Built with ❤️ for the LLM community**
