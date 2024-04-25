// accessesRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../services/db')
const accessController = require('../controllers/accessesController');

// Defina as rotas para operações relacionadas a Accesses
router.post('/register', accessController.createAccess);
router.get('/', accessController.getAllAccesses);
router.post('/counts', accessController.getAccessCounts);
// router.post('/register', AccessesController.register);
// router.put('/:id', AccessesController.update);

module.exports = router;