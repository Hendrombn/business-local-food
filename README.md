# 🍴 Kuliner Lokal

Aplikasi website pencarian bisnis makanan lokal berbasis Next.js yang terintegrasi dengan peta interaktif Leaflet.js dan OpenStreetMap. Dibangun sebagai bagian dari penelitian skripsi mengenai analisis pengalaman pengguna (UX) pada platform pencarian kuliner lokal.

---

## ✨ Fitur Utama

- 🗺️ **Peta Interaktif** — Temukan bisnis makanan lokal di sekitarmu secara visual menggunakan Leaflet.js + OpenStreetMap
- 🔍 **Pencarian & Filter** — Cari bisnis berdasarkan nama, kategori, rating, dan jam buka
- 📍 **Geolocation Otomatis** — Deteksi lokasi pengguna secara otomatis
- 🍽️ **Detail Bisnis** — Informasi lengkap: menu makanan, foto, jam operasional, ulasan, dan metode pembayaran
- 📅 **Reservasi Meja** — Pesan meja langsung dari aplikasi
- ⭐ **Rating & Ulasan** — Beri penilaian dan tulis ulasan untuk bisnis
- 👤 **Owner Dashboard** — Panel analitik dan manajemen bisnis untuk pemilik UMKM
- 🛡️ **Admin Portal** — Verifikasi bisnis dan moderasi konten platform
- 🔐 **Autentikasi** — Login & register dengan NextAuth.js

---

## 🛠️ Tech Stack

| Kategori        | Teknologi                        |
| --------------- | -------------------------------- |
| Framework       | Next.js 14 (App Router)          |
| Language        | TypeScript                       |
| Styling         | Tailwind CSS + CSS Modules       |
| Peta            | Leaflet.js + OpenStreetMap       |
| Auth            | NextAuth.js                      |
| ORM             | Prisma                           |
| Database        | PostgreSQL                       |
| Linting         | ESLint + Prettier                |
| Git Hooks       | Husky + lint-staged + commitlint |
| Package Manager | pnpm                             |

---

## 📁 Struktur Folder

```
src/
├── app/
│   ├── (auth)/              # Halaman login & register
│   ├── (main)/              # Halaman utama (explore map, detail bisnis)
│   ├── dashboard/           # Owner dashboard
│   ├── admin/               # Admin portal
│   └── api/                 # API routes
├── components/
│   ├── ui/                  # Reusable UI components (Button, Input, Modal, dll)
│   ├── layout/              # Layout components (Navbar, Sidebar, Footer)
│   ├── business/            # Komponen khusus bisnis
│   ├── map/                 # Komponen peta
│   ├── review/              # Komponen ulasan
│   └── reservation/         # Komponen reservasi
├── hooks/                   # Custom hooks global
├── lib/                     # Utilities & config
├── types/                   # TypeScript types
└── constants/               # Konstanta aplikasi
```

---

## 🚀 Cara Menjalankan

### Prasyarat

- Node.js >= 18
- pnpm >= 8
- PostgreSQL

### Instalasi

1. Clone repository

```bash
git clone https://github.com/username/skripsi-business-local-food.git
cd skripsi-business-local-food
```

2. Install dependencies

```bash
pnpm install
```

3. Setup environment variables

```bash
cp .env.example .env.local
```

Isi variabel berikut di `.env.local`:

```env
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=postgresql://username:password@localhost:5432/bisnis_makanan_db
```

4. Setup database

```bash
pnpm db:migrate
pnpm db:seed
```

5. Jalankan development server

```bash
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 📝 Scripts

| Script              | Deskripsi                         |
| ------------------- | --------------------------------- |
| `pnpm dev`          | Jalankan development server       |
| `pnpm build`        | Build untuk production            |
| `pnpm start`        | Jalankan production server        |
| `pnpm lint`         | Cek ESLint                        |
| `pnpm lint:fix`     | Auto-fix ESLint                   |
| `pnpm format`       | Format semua file dengan Prettier |
| `pnpm format:check` | Cek format Prettier               |
| `pnpm db:migrate`   | Jalankan Prisma migration         |
| `pnpm db:studio`    | Buka Prisma Studio                |
| `pnpm db:seed`      | Seed data awal ke database        |

---

## 📐 Konvensi Commit

Project ini menggunakan [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: tambah fitur pencarian berdasarkan lokasi
fix: perbaiki bug marker peta tidak muncul
docs: update README
style: rapikan format kode
refactor: refactor komponen BisnisCard
test: tambah unit test untuk useLogin
chore: update dependencies
perf: optimasi loading gambar
```

---

## 👥 Kontributor

| Nama       | Role                 |
| ---------- | -------------------- |
| Rodomarbun | Peneliti / Developer |

---

## 📄 Lisensi

Project ini dibuat untuk keperluan penelitian skripsi. Seluruh hak cipta dilindungi.
