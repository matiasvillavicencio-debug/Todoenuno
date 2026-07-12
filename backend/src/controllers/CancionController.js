import { cancionModel } from "../models/CancionModel.js";

export const crearCancion = async (req, res) => {
    try {
        const nuevaCancion = new cancionModel(req.body);
        await nuevaCancion.save();
        res.status(201).json({ status: 'ok', data: nuevaCancion });
    } catch (error) {
        res.status(500).json({ status: 'error', msg: "Error al crear", error: error.message });
    }
};

export const obtenerCanciones = async (req, res) => {
    try {
        const canciones = await cancionModel.find();
        res.status(200).json(canciones);
    } catch (error) {
        res.status(500).json({ status: 'error', msg: "Error al obtener", error: error.message });
    }
};

export const actualizarCancion = async (req, res) => {
    try {
        const cancionActualizada = await cancionModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ status: 'ok', data: cancionActualizada });
    } catch (error) {
        res.status(500).json({ status: 'error', msg: "Error al actualizar", error: error.message });
    }
};

export const eliminarCancion = async (req, res) => {
    try {
        await cancionModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: 'ok', msg: "Canción eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ status: 'error', msg: "Error al eliminar", error: error.message });
    }
};