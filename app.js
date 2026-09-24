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

// Daftar jenis sampah yang diperbolehkan
const JENIS_SAMPAH = ["plastik", "kertas", "logam", "kaca"];

// Fungsi bantu: cek format tanggal YYYY-MM-DD dan tanggalnya valid
function isValidDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value + "T00:00:00Z"); // ubah ke objek Date (UTC)
  return !isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value; // tolak 2026-02-30 dsb.
}

// Fungsi bantu: validasi semua field wajib, mengembalikan pesan error atau null
function validateWasteDeposit(body) {
  const { namaNasabah, jenisSampah, beratKg, hargaPerKg, tanggalSetor } = body || {};

  // cek field wajib yang kosong / tidak dikirim
  const wajib = { namaNasabah, jenisSampah, beratKg, hargaPerKg, tanggalSetor };
  const kosong = Object.keys(wajib).filter(
    (key) => wajib[key] === undefined || wajib[key] === null || String(wajib[key]).trim() === ""
  );
  if (kosong.length > 0) {
    return `Field wajib tidak boleh kosong: ${kosong.join(", ")}`;
  }

  // cek tipe data dan nilai
  if (typeof namaNasabah !== "string") return "namaNasabah harus berupa string";
  if (!JENIS_SAMPAH.includes(jenisSampah)) {
    return `jenisSampah harus salah satu dari: ${JENIS_SAMPAH.join(", ")}`;
  }
  if (typeof beratKg !== "number" || !Number.isFinite(beratKg) || beratKg <= 0) {
    return "beratKg harus berupa angka lebih dari 0";
  }
  if (typeof hargaPerKg !== "number" || !Number.isFinite(hargaPerKg) || hargaPerKg <= 0) {
    return "hargaPerKg harus berupa angka lebih dari 0";
  }
  if (!isValidDate(tanggalSetor)) return "tanggalSetor harus berformat YYYY-MM-DD";

  return null; // lolos validasi
}

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

// ---------------------------------------------------------------------
// GET /waste-deposits
// GET /waste-deposits?jenisSampah=plastik  (filter dengan query string)
// Mengembalikan array langsung (boleh kosong [])
// ---------------------------------------------------------------------
app.get("/waste-deposits", (req, res) => {
  const { jenisSampah } = req.query; // ambil query string jenisSampah

  if (jenisSampah !== undefined) {
    const keyword = String(jenisSampah).toLowerCase(); // tidak peka huruf besar/kecil
    const hasil = wasteDeposits.filter((item) => item.jenisSampah.toLowerCase() === keyword);
    return res.status(200).json(hasil); // array hasil filter
  }

  res.status(200).json(wasteDeposits); // array semua data
});

// ---------------------------------------------------------------------
// GET /waste-deposits/:id
// Mengembalikan objek satu data, atau 404 jika tidak ada
// ---------------------------------------------------------------------
app.get("/waste-deposits/:id", (req, res) => {
  const id = Number(req.params.id); // ambil id dari route parameter
  const item = wasteDeposits.find((d) => d.id === id); // cari data

  if (!item) {
    return res.status(404).json({
      status: "error",
      message: `Setoran sampah dengan id ${req.params.id} tidak ditemukan`,
      data: null,
    });
  }

  res.status(200).json(item); // objek data langsung
});

// ---------------------------------------------------------------------
// POST /waste-deposits
// Body: { "namaNasabah": "Rina", "jenisSampah": "plastik", "beratKg": 4,
//         "hargaPerKg": 3000, "tanggalSetor": "2026-09-10" }
// ---------------------------------------------------------------------
app.post("/waste-deposits", (req, res) => {
  const error = validateWasteDeposit(req.body); // validasi field wajib
  if (error) {
    return res.status(400).json({ status: "error", message: error, data: null });
  }

  const { namaNasabah, jenisSampah, beratKg, hargaPerKg, tanggalSetor } = req.body;
  const dataBaru = {
    id: nextId++, // id dibuat otomatis oleh server
    namaNasabah: namaNasabah.trim(),
    jenisSampah,
    beratKg,
    hargaPerKg,
    tanggalSetor,
  };
  wasteDeposits.push(dataBaru); // simpan ke array

  res.status(201).json({
    status: "success",
    message: "Setoran sampah berhasil ditambahkan",
    data: dataBaru,
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
