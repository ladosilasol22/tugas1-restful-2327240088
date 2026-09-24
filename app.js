// =====================================================================
// Tugas 1 - RESTful API Murni dengan Express.js
// Topik 3 - Bank Sampah: Setoran Sampah
// Nama : Michella Valery
// NIM  : ISI_NIM_ANDA   <-- GANTI dengan NIM Anda
// =====================================================================

const express = require("express"); // impor express
const app = express(); // buat instance aplikasi express
const PORT = process.env.PORT || 3000; // port dari environment (Vercel) atau 3000

app.use(express.json()); // middleware untuk membaca body JSON

// Data setoran sampah disimpan di array (memori), minimal 3 data awal
let wasteDeposits = [
  {
    id: 1,
    namaNasabah: "Budi Santoso",
    jenisSampah: "plastik",
    beratKg: 5.5,
    hargaPerKg: 3000,
    tanggalSetor: "2026-09-01",
  },
  {
    id: 2,
    namaNasabah: "Siti Aminah",
    jenisSampah: "kertas",
    beratKg: 10,
    hargaPerKg: 2000,
    tanggalSetor: "2026-09-02",
  },
  {
    id: 3,
    namaNasabah: "Andi Wijaya",
    jenisSampah: "logam",
    beratKg: 3,
    hargaPerKg: 8000,
    tanggalSetor: "2026-09-03",
  },
];
let nextId = 4; // id berikutnya untuk data baru

// ---------------------------------------------------------------------
// GET /
// Info API: nama mahasiswa, NIM, nomor topik, daftar endpoint
// ---------------------------------------------------------------------
app.get("/", (req, res) => {
  res.status(200).json({
    nama: "Michella Valery",
    nim: "ISI_NIM_ANDA", // GANTI dengan NIM Anda
    topik: 3,
    judulTopik: "Bank Sampah - Setoran Sampah",
    endpoint: [
      "GET /waste-deposits",
      "GET /waste-deposits/:id",
      "POST /waste-deposits",
      "PUT /waste-deposits/:id",
      "DELETE /waste-deposits/:id",
      "GET /waste-deposits?jenisSampah=plastik",
    ],
  });
});


// Jalankan server hanya jika file dijalankan langsung (node app.js / nodemon).
// Di Vercel (serverless) app tidak di-listen, tetapi diekspor.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

module.exports = app; // ekspor app untuk Vercel
