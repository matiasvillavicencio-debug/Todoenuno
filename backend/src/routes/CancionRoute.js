const express = require('express');
const router = express.Router();
const { crearCancion, obtenerCanciones, actualizarCancion, eliminarCancion } = require('../controllers/CancionController');
const authMiddleware = require('../middleware/authMiddleware'); 

router.get('/', obtenerCanciones);

router.post('/', authMiddleware, crearCancion);
router.put('/:id', authMiddleware, actualizarCancion);
router.delete('/:id', authMiddleware, eliminarCancion);

module.exports = router;