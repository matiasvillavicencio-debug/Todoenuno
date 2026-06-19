import mongoose from 'mongoose';

const discoSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    genero: { type: String, required: true },
    año: { type: Number, required: true },
    artista: { type: String, required: true }
});

export const discoModel = mongoose.model('disco', discoSchema);