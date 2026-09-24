# Tugas 1 — RESTful API Bank Sampah (Setoran Sampah)

RESTful API murni dengan **Express.js** untuk Topik 3 — Bank Sampah: Setoran Sampah.
Data disimpan di array memori, semua response berformat JSON.

- **Nama:** Michella Valery
- **NIM:** ISI_NIM_ANDA
- **Topik:** 3 — resource `/waste-deposits`

## Menjalankan di lokal

```bash
npm install
npm run dev     # dengan nodemon
# atau
npm start       # node app.js
```

Server berjalan di `http://localhost:3000`.

## Endpoint

| No | Method | Endpoint | Fungsi | Sukses | Gagal |
|----|--------|----------|--------|--------|-------|
| 1 | GET | `/waste-deposits` | Ambil semua data | 200 | — |
| 2 | GET | `/waste-deposits/:id` | Ambil satu data | 200 | 404 |
| 3 | POST | `/waste-deposits` | Tambah data baru | 201 | 400 |
| 4 | PUT | `/waste-deposits/:id` | Ubah seluruh data | 200 | 400 / 404 |
| 5 | DELETE | `/waste-deposits/:id` | Hapus data | 200 | 404 |
| 6 | GET | `/waste-deposits?jenisSampah=plastik` | Filter dengan query string | 200 | — |

## Field

| Field | Tipe | Keterangan |
|-------|------|------------|
| `id` | number | dibuat otomatis oleh server |
| `namaNasabah`* | string | |
| `jenisSampah`* | string | `plastik` \| `kertas` \| `logam` \| `kaca` |
| `beratKg`* | number | > 0 |
| `hargaPerKg`* | number | > 0 |
| `tanggalSetor`* | string | format `YYYY-MM-DD` |

Contoh body POST/PUT:

```json
{
  "namaNasabah": "Rina Marlina",
  "jenisSampah": "plastik",
  "beratKg": 4,
  "hargaPerKg": 3000,
  "tanggalSetor": "2026-09-10"
}
```

## Deploy ke Vercel

`app.js` mengekspor `app` (`module.exports = app`) dan hanya memanggil `app.listen`
saat dijalankan langsung. File `vercel.json` mengarahkan semua request ke `app.js`.
Import repository ini di dashboard Vercel (**Add New → Project**) lalu klik **Deploy**.
