const mongoose = require('mongoose');
const AccountSchema = new mongoose.Schema({
  accountName: { type: String, required: true }, // e.g., "Kas", "Piutang Usaha"
  accountNumber: { type: String, unique: true }, // e.g., "1001"
  type: { type: String, enum: ['Aset', 'Kewajiban', 'Ekuitas', 'Pendapatan', 'Beban'] },
  balance: { type: Number, default: 0 }
});
module.exports = mongoose.model('Account', AccountSchema);