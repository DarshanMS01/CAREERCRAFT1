const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');
const auth = require('../middleware/auth');

router.post('/chat', auth, agentController.chat);

module.exports = router;
