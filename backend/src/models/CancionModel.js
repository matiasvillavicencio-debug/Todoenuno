const mongoose = require('mongoose');

const CancionSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    artista: { type: String, required: true },
    genero: { type: String, required: true },
    duracion: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Cancion', CancionSchema);