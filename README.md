# BizDirectory PWA 🏢
**Direktori Perusahaan Responsif Berbasis Google Sheets**

Progressive Web App yang menampilkan direktori perusahaan bergaya kartu dari Google Sheets, dilengkapi blog terintegrasi dan dukungan offline penuh.

---

## 🌐 Live Demo

Online Version :  
https://progressive-web-app-company.vercel.app

---

## ✨ Fitur Utama

| Fitur | Keterangan |
|-------|-----------|
| 📊 Google Sheets Integration | Tarik data langsung dari CSV export Google Sheets |
| 🃏 Card Directory | Kartu perusahaan dengan logo, kategori, filter & pencarian |
| 📝 Blog Terintegrasi | Artikel dari Sheet kedua dengan modal reader |
| 📱 Mobile-First PWA | Responsif penuh, installable, offline-capable |
| 🔍 Real-time Search | Cari nama, kategori, lokasi secara instan |
| 🗃️ Filter Kategori | Filter chip berdasarkan kategori perusahaan |
| 🌐 Offline Support | Service Worker + caching strategi berlapis |
| 🔔 Install Prompt | Banner install ke homescreen |
| 🎨 Dark Theme | Desain editorial premium dark-mode |

---

## 🚀 Cara Penggunaan

### 1. Siapkan Google Sheet

**Sheet 1 — Direktori Perusahaan** (nama sheet bebas)

| nama | kategori | tagline | deskripsi | lokasi | website | logo | email | karyawan | tahun |
|------|----------|---------|-----------|--------|---------|------|-------|----------|-------|
| Gojek | Teknologi | Super-app terdepan | Gojek adalah... | Jakarta | https://gojek.com | https://logo.clearbit.com/gojek.com | hi@gojek.com | 10,000+ | 2010 |

**Sheet 2 — Blog** (opsional, buat sheet terpisah)

| judul | tag | penulis | tanggal | excerpt | konten | gambar |
|-------|-----|---------|---------|---------|--------|--------|
| Tren AI 2025 | Teknologi | Budi | 10 Apr 2025 | Ringkasan singkat... | Isi artikel lengkap... | https://... |

### 2. Publish Google Sheet

1. Buka Google Sheets → **File → Share → Bagikan ke semua orang yang memiliki tautan**
2. Klik **File → Bagikan → Publikasikan ke web → CSV** → Salin URL

Format URL CSV Export:
```
https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv
```

Untuk sheet tertentu (gid):
```
https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv&gid={GID}
```

### 3. Deploy PWA

**Opsi A — Lokal (Dev)**
```bash
# Instal http-server global
npm install -g http-server

# Jalankan dari folder proyek
cd progressive web app
http-server -p 8080 --cors
```

Buka: `http://localhost:8080`

**Opsi B — GitHub Pages (Gratis)**
```bash
git init
git add  .
git commit -m "Initial BizDirectory PWA"
git remote add origin https://github.com/username/biz-directory.git
git push -u origin main
```
Aktifkan GitHub Pages di Settings → Pages → Branch: main

**Opsi C — Netlify / Vercel**
Drag & drop folder ke [netlify.com/drop](https://netlify.com/drop) — selesai dalam 30 detik!

### 4. Hubungkan Sheet

1. Buka aplikasi
2. Masukkan URL CSV Sheet di panel **Pengaturan**
3. Klik **Muat Data**
4. Selesai! Data tersinkron otomatis

---

## 🛠️ Kustomisasi

### Ubah Warna Tema
Edit CSS variables di `index.html`:
```css
:root {
  --gold:   #c9a84c;   /* Warna aksen utama */
  --teal:   #2dd4c0;   /* Warna kategori */
  --bg-base: #0a0f1e;  /* Background gelap */
}
```

### Tambah Kolom Kustom
Di fungsi `loadData()` pada script, tambahkan mapping kolom baru:
```js
const companies = rows.map(r => ({
  ...
  namaKolom: r.nama_kolom_di_sheet || '',
}));
```

### Nonaktifkan Demo Data
Komentari baris `loadDemoData()` di fungsi `init()` agar tidak menampilkan data contoh.

---

## 🧑‍💻 Teknologi

- **HTML5** — Semantic markup, ARIA accessibility
- **CSS3** — Custom Properties, Grid, Flexbox, Animations
- **Vanilla JavaScript** — Zero dependencies, ES2020+
- **Service Worker API** — Offline caching, background sync
- **Web App Manifest** — Installable PWA
- **Google Sheets CSV API** — Data source tanpa backend

---

## 📊 Skor Lighthouse (Expected)

| Metrik | Skor |
|--------|------|
| Performance | 95+ |
| Accessibility | 95+ |
| Best Practices | 100 |
| SEO | 95+ |
| PWA | ✅ Installable |

---

## 📄 Lisensi
MIT License — Bebas digunakan untuk proyek komersial maupun personal.
