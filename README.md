# PlasticBank Indonesia

Website frontend/prototype untuk monitoring bank sampah plastik Indonesia.

## Fitur
- Splash screen saat website dibuka
- Home / Beranda
- Dashboard statistik
- Peta Indonesia interaktif berbasis Leaflet + OpenStreetMap
- Filter risiko rendah/sedang/tinggi
- Halaman laporan + form laporan demo
- Menu fitur
- Profil pengguna
- Ekspor data dashboard ke CSV
- Responsive untuk laptop dan HP

## Penting
Angka statistik, marker peta, dan laporan di versi ini adalah **data simulasi/demo**. Agar menjadi sistem produksi, sambungkan JavaScript ke backend/API/database resmi.

## Menjalankan
Cukup buka `index.html` di browser. Internet diperlukan untuk peta Leaflet/OpenStreetMap dan Google Fonts.

## Upload ke GitHub Pages
1. Buat repository baru di GitHub, misalnya `plasticbank-indonesia`.
2. Extract ZIP ini.
3. Upload `index.html`, `style.css`, `app.js`, dan `README.md` ke repository (jangan upload folder ZIP-nya).
4. Buka **Settings → Pages**.
5. Pada **Build and deployment**, pilih **Deploy from a branch**.
6. Pilih branch `main` dan folder `/ (root)`, lalu **Save**.
7. Tunggu proses deployment. GitHub akan memberikan alamat website Pages.

## Jika ingin memakai Git
```bash
git init
git add .
git commit -m "Initial PlasticBank Indonesia website"
git branch -M main
git remote add origin https://github.com/USERNAME/plasticbank-indonesia.git
git push -u origin main
```

Setelah push, aktifkan GitHub Pages melalui Settings → Pages seperti langkah di atas.

## Pengembangan berikutnya
- Backend Node.js/Express atau PHP
- Database MySQL/PostgreSQL
- Login dan role admin/user
- API data bank sampah resmi
- Data laporan tersimpan permanen
- Dashboard realtime
- GeoJSON/polygon wilayah risiko
- Integrasi sumber data pemerintah
