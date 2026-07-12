import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import routerAPI from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

routerAPI(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});