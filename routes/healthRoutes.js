const express = require('express');
const { checkHealth } = require('../controllers/healthController');
const { requireApiKey } = require('../middleware/apiKeyMiddleware');

const router = express.Router();

// Mount the GET execution mapping to the controller and protect it with the reusable middleware
router.get('/', requireApiKey, checkHealth);

module.exports = router;
