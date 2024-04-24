const express = require('express');

const router = express.Router();

// Importa rotas de cada módulo
router.use('/links', require('./linksRoutes'));
// router.use('/accesses', require('./accessesRoutes'));
// router.use('/auth', require('./authRoutes'));

module.exports = router;