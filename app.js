// import express from "express";
// import path from "path";
const express = require('express');
const path = require('path');
// import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '/public')));

// Khởi động server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'newindex.html'));
});

app.get('/trang-chu', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'newindex.html'));
});

app.get('/gioi-thieu', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'gioi-thieu.html'));
});

app.get('/dich-vu', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'dich-vu.html'));
});

app.get('/thiet-ke-noi-that', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'thiet-ke-noi-that.html'));
});

app.get('/chinh-sach-uu-dai', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'chinh-sach-uu-dai.html'));
});

app.get('/cong-trinh', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'cong-trinh.html'));
});


app.get('/noi-that', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'noi-that.html'));
});

app.get('/tin-tuc', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'tin-tuc.html'));
});

app.get('/lien-he', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'lien-he.html'));
});
