// linksRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../services/db')
const linkController = require('../controllers/linksController');

// Defina as rotas para operações relacionadas a Links
router.post('/register', linkController.createLink);
router.get('/', (req, res) => {
    console.log("Get all links")
    linkController.getAllLinks(req, res)
});
// router.post('/register', LinksController.register);
// router.put('/:id', LinksController.update);

module.exports = router;