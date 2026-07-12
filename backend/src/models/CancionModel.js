import mongoose from "mongoose";

const CancionSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    artista: { type: String, required: true },
    genero: { type: String, required: true },
    duracion: { type: String },
}, { timestamps: true });

export const cancionModel = mongoose.model('Cancion', CancionSchema);