// routes/salesRoutes.js
const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.get('/', salesController.obtenerVentas);
router.post('/', salesController.agregarVenta);

module.exports = router;
