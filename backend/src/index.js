const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');
const authRoutes = require('./routes/AuthRoute');
const cancionRoutes = require('./routes/CancionRoute');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

conectarDB();

app.use('/api/auth', authRoutes);
app.use('/api/canciones', cancionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});