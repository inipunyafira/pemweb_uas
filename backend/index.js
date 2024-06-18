const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3001;

// Middleware untuk mengizinkan CORS
app.use(cors());

// Koneksi ke database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Masukkan password Anda jika ada
    database: 'uas_pemweb'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

// Endpoint untuk mendapatkan data berita
app.get('/api/berita', (req, res) => {
    connection.query(`
      SELECT b.*, k.nama_kategori
      FROM berita b
      LEFT JOIN kategori k ON b.id_kategori = k.id_kategori
    `, (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Error fetching data');
        return;
      }
      const formattedResults = results.map(item => ({
       ...item,
        keywords: item.keywords? item.keywords.split(',') : [],
        nama_kategori: item.nama_kategori
      }));
      res.json(formattedResults);
    });
  });

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
