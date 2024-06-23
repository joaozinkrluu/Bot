const mongoose = require('mongoose');

const BotSchema = new mongoose.Schema({
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true },
});

module.exports = mongoose.model('Bot', BotSchema);
