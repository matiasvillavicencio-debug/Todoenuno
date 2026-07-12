import { discoModel } from "../models/discoModel.js";

export const getDiscos = async (req, res) => {
    try {
        const discos = await discoModel.find(); 
        res.json({ status: 'ok', data: discos });
    } catch (error) {
        res.status(500).json({ status: 'error' });
    }
};

export const getDiscoById = async (req, res) => {
    try {
        const disco = await discoModel.findById(req.params.id);
        if (!disco) return res.status(404).json({ status: 'not found' });
        res.json({ status: 'ok', data: disco });
    } catch (error) {
        res.status(500).json({ status: 'error' });
    }
};

export const saveDisco = async (req, res) => {
    try {
        const nuevoDisco = new discoModel(req.body);
        const data = await nuevoDisco.save();
        res.status(201).json({ status: 'ok', data });
    } catch (error) {
        res.status(400).json({ status: 'error', msg: 'Datos inválidos' });
    }
};

export const updateDisco = async (req, res) => {
    try {
        const data = await discoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ status: 'ok', data });
    } catch (error) {
        res.status(400).json({ status: 'error' });
    }
};

export const deleteDisco = async (req, res) => {
    try {
        await discoModel.findByIdAndDelete(req.params.id);
        res.json({ status: 'ok', msg: 'Disco eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ status: 'error' });
    }
};