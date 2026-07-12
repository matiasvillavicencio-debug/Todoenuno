import { artistaModel } from "../models/artistaModel.js";

export const getArtistas = async (req, res) => {
    try {
        const { nombre, nacionalidad } = req.query;
        let query = {};
        
        if (nombre) query.nombre = { $regex: nombre, $options: 'i' };

        if (nacionalidad) query.nacionalidad = nacionalidad;

        const artistas = await artistaModel.find(query);
        res.json({ status: 'ok', data: artistas });
    } catch (error) {
        res.status(500).json({ status: 'error' });
    }
};

export const getArtistaById = async (req, res) => {
    try {
        const artista = await artistaModel.findById(req.params.id);
        if (!artista) return res.status(404).json({ status: 'not found' });
        res.json({ status: 'ok', data: artista });
    } catch (error) {
        res.status(500).json({ status: 'error' });
    }
};

export const saveArtista = async (req, res) => {
    try {
        console.log(req.body);

        const nuevo = await artistaModel.create(req.body);

        res.status(201).json({ status: 'ok', data: nuevo });
    } catch (error) {
        res.status(400).json({ 
            status: 'error', 
            msg: error.message 
        });
    }
};

export const updateArtista = async (req, res) => {
    try {
        const data = await artistaModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ status: 'ok', data });
    } catch (error) {
        res.status(400).json({ status: 'error' });
    }
};

export const deleteArtista = async (req, res) => {
    try {
        await artistaModel.findByIdAndDelete(req.params.id);
        res.json({ status: 'ok', msg: 'Artista eliminado' });
    } catch (error) {
        res.status(500).json({ status: 'error' });
    }
};