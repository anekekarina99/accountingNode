const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const { Account } = require('../models');

// POST: Tambah akun baru
router.post('/', async (req, res, next) => {
  try {
    const account = await Account.create(req.body);
    res.status(201).json(account);
  } catch (err) {
    if (err.name === 'SequelizeDatabaseError') {
      // Eskalasi ke tim L3 Support untuk error DB kompleks
      return next(createError(500, 'Database error – hubungi L3 Support'));
    }
    next(createError(400, err.message));
  }
});

// GET: Ambil semua akun
router.get('/', async (req, res, next) => {
  try {
    const accounts = await Account.findAll();
    res.json(accounts);
  } catch (err) {
    next(createError(500, 'Gagal mengambil data – cek L3 Support jika perlu'));
  }
});

// PUT: Update akun by ID
router.put('/:id', async (req, res, next) => {
  try {
    const [updated] = await Account.update(req.body, {
      where: { id: req.params.id },
      returning: true
    });
    if (!updated) return next(createError(404, 'Akun tidak ditemukan'));
    res.json(updated);
  } catch (err) {
    next(createError(400, err.message));
  }
});

// DELETE: Hapus akun by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Account.destroy({ where: { id: req.params.id } });
    if (!deleted) return next(createError(404, 'Akun tidak ditemukan'));
    res.json({ message: 'Akun berhasil dihapus' });
  } catch (err) {
    next(createError(500, 'Gagal menghapus – eskalasi ke L3 Support'));
  }
});

module.exports = router;
