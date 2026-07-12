import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userModel } from "../models/userModel.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const usuario = new userModel({ name, email, password: hash });
        const data = await usuario.save();
        res.status(201).json({ status: 'ok', data: { id: data._id, name: data.name } });
    } catch (error) {
        res.status(500).json({ status: 'error', msg: 'Error al registrar' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        
        if (!user) return res.status(404).json({ status: 'error', msg: 'Usuario no encontrado' });

        const passOk = await bcrypt.compare(password, user.password);
        if (!passOk) return res.status(401).json({ status: 'error', msg: 'Contraseña incorrecta' });

        const token = jwt.sign(
            { id: user._id, name: user.name }, 
            process.env.SECRET_KEY, 
            { expiresIn: '1h' }
        );

        res.json({ status: 'ok', token });
    } catch (error) {
        res.status(500).json({ status: 'error' });
    }
};