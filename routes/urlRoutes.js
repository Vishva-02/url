const express = require('express');
const { shortenUrl, getUserUrls, getUrlAnalytics } = require('../controllers/urlController');
const { protect } = require('../middleware/authMiddleware');
const { validateUrl } = require('../middleware/validationMiddleware');

const router = express.Router();

router.post('/shorten', protect, validateUrl, shortenUrl);
router.get('/', protect, getUserUrls);
router.get('/:id/analytics', protect, getUrlAnalytics);

module.exports = router;