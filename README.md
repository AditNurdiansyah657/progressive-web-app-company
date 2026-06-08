# BizDirectory PWA 🏢
**Responsive Company Directory Powered by Google Sheets**

A Progressive Web App that displays a card-style company directory sourced from Google Sheets, complete with an integrated blog and full offline support.

---

## 🌐 Live Demo

🔗 [Online Version](https://progressive-web-app-company.vercel.app)

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 📊 Google Sheets Integration | Pull data directly from a Google Sheets CSV export |
| 🃏 Card Directory | Company cards with logos, categories, filters & search |
| 📝 Integrated Blog | Articles from a second sheet with a modal reader |
| 📱 Mobile-First PWA | Fully responsive, installable, and offline-capable |
| 🔍 Real-time Search | Instantly search by name, category, or location |
| 🗃️ Category Filters | Filter chips based on company categories |
| 🌐 Offline Support | Service Worker with multi-layer caching strategy |
| 🔔 Install Prompt | Add-to-homescreen install banner |
| 🎨 Dark Theme | Premium editorial dark-mode design |

---

## 🚀 Getting Started

### 1. Set Up Your Google Sheet

**Sheet 1 - Company Directory** (any sheet name works)

| name | category | tagline | description | location | website | logo | email | employees | year |
|------|----------|---------|-------------|----------|---------|------|-------|-----------|------|
| Gojek | Technology | Leading super-app | Gojek is... | Jakarta | https://gojek.com | https://logo.clearbit.com/gojek.com | hi@gojek.com | 10,000+ | 2010 |

**Sheet 2 - Blog** (optional, create a separate sheet)

| title | tag | author | date | excerpt | content | image |
|-------|-----|--------|------|---------|---------|-------|
| AI Trends 2025 | Technology | Budi | Apr 10 2025 | A brief summary... | Full article content... | https://... |

### 2. Publish Your Google Sheet

1. Open Google Sheets → **File → Share → Share with anyone who has the link**
2. Click **File → Share → Publish to the web → CSV** → Copy the URL

CSV export URL format:
```
https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv
```

For a specific sheet (gid):
```
https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv&gid={GID}
```

### 3. Deploy the PWA

**Option A - Local (Dev)**
```bash
# Install http-server globally
npm install -g http-server

# Run from your project folder
cd progressive-web-app
http-server -p 8080 --cors
```
Open: `http://localhost:8080`

**Option B - GitHub Pages (Free)**
```bash
git init
git add .
git commit -m "Initial BizDirectory PWA"
git remote add origin https://github.com/username/biz-directory.git
git push -u origin main
```
Enable GitHub Pages under Settings → Pages → Branch: main

**Option C - Netlify / Vercel**
Drag & drop your project folder to [netlify.com/drop](https://netlify.com/drop) — live in 30 seconds!

### 4. Connect Your Sheet

1. Open the app
2. Enter your CSV sheet URL in the **Settings** panel
3. Click **Load Data**
4. Done! Data syncs automatically

---

## 🛠️ Customization

### Change the Theme Colors

Edit the CSS variables in `index.html`:
```css
:root {
  --gold:    #c9a84c;  /* Primary accent color */
  --teal:    #2dd4c0;  /* Category color */
  --bg-base: #0a0f1e;  /* Dark background */
}
```

### Add Custom Columns

In the `loadData()` function in the script, add a new column mapping:
```js
const companies = rows.map(r => ({
  ...
  customField: r.your_column_name || '',
}));
```

### Disable Demo Data

Comment out the `loadDemoData()` call inside the `init()` function to prevent sample data from being displayed.

---

## 🧑‍💻 Tech Stack

- **HTML5** - Semantic markup, ARIA accessibility
- **CSS3** - Custom Properties, Grid, Flexbox, Animations
- **Vanilla JavaScript** - Zero dependencies, ES2020+
- **Service Worker API** - Offline caching, background sync
- **Web App Manifest** - Installable PWA
- **Google Sheets CSV API** - Backend-free data source
