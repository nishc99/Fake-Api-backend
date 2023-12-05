// routes/airlinesRoutes.js
const express = require('express');
const airlinesController = require('../controllers/airlinesController');

const router = express.Router();

router.get('/airlines', airlinesController.getAirlines);
router.get('/airlines/:id', airlinesController.getAirlineById);
router.post('/airlines', airlinesController.createAirline);
router.put('/airlines/:id', airlinesController.updateAirline);
router.patch('/airlines/:id', airlinesController.updateAirlinePartial);
router.delete('/airlines/:id', airlinesController.deleteAirline);

module.exports = router;
