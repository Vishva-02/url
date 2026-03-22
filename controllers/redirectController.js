const Url = require('../models/Url');
const Click = require('../models/Click');
const { ErrorResponse } = require('../middleware/errorMiddleware');

// @desc    Redirect to original URL
// @route   GET /:shortCode
// @access  Public
exports.redirectUrl = async (req, res, next) => {
    try {
        const { shortCode } = req.params;

        const url = await Url.findOne({ shortCode });

        if (!url) {
            return next(new ErrorResponse('URL not found', 404));
        }

        // Check for expiry
        if (url.expiresAt && new Date() > url.expiresAt) {
            return next(new ErrorResponse('This URL has expired', 410));
        }

        // Increment click count in Url model
        url.clicks += 1;
        await url.save();

        // Store analytics data in Click model
        await Click.create({
            urlId: url._id,
            ip: req.ip,
            userAgent: req.headers['user-agent'],
        });

        // Redirect to original URL
        res.redirect(url.originalUrl);
    } catch (err) {
        next(err);
    }
};
