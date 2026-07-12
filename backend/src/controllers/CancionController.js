const Cancion = require('../models/CancionModel.js');

const crearCancion = async (req, res) => {
    try {
        const nuevaCancion = new Cancion(req.body);
        await nuevaCancion.save();
        res.status(201).json(nuevaCancion);
    } catch (error) {
        res.status(500).json({ message: "Error al crear", error });
    }
};

const obtenerCanciones = async (req, res) => {
    try {
        const canciones = await Cancion.find();
        res.status(200).json(canciones);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener", error });
    }
};

const actualizarCancion = async (req, res) => {
    try {
        const cancionActualizada = await Cancion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(cancionActualizada);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar", error });
    }
};

const eliminarCancion = async (req, res) => {
    try {
        await Cancion.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Canción eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar", error });
    }
};

module.exports = { crearCancion, obtenerCanciones, actualizarCancion, eliminarCancion };