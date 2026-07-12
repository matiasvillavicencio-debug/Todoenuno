import mongoose from 'mongoose';

const artistaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    nacionalidad: { type: String, required: true },
    generoPrincipal: { type: String }
});

export const artistaModel = mongoose.model('artista', artistaSchema);