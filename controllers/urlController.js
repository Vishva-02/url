const { nanoid } = require('nanoid');
const Url = require('../models/Url');
const Click = require('../models/Click');
const { ErrorResponse } = require('../middleware/errorMiddleware');

// @desc    Shorten a URL
// @route   POST /api/v1/urls/shorten
// @access  Private
exports.shortenUrl = async (req, res, next) => {
    try {
        const { originalUrl, customAlias, expiresAt } = req.body;

        if (!originalUrl) {
            return next(new ErrorResponse('Please provide an original URL', 400));
        }

        let shortCode;
        if (customAlias) {
            // Check if custom alias is already taken
            const existingAlias = await Url.findOne({ shortCode: customAlias });
            if (existingAlias) {
                return next(new ErrorResponse('Custom alias is already taken', 400));
            }
            shortCode = customAlias;
        } else {
            // Generate shortCode
            shortCode = nanoid(6);
        }

        // Create URL record
        const url = await Url.create({
            originalUrl,
            shortCode,
            userId: req.user.id,
            expiresAt: expiresAt ? new Date(expiresAt) : null,
        });

        res.status(201).json({
            success: true,
            data: url,
        });
    } catch (err) {
        if (err.code === 11000) {
            return next(new ErrorResponse('Short code collision, please try again', 500));
        }
        next(err);
    }
};

// @desc    Get all URLs for a user
// @route   GET /api/v1/urls/user-urls
// @access  Private
exports.getUserUrls = async (req, res, next) => {
    try {
        const urls = await Url.find({ userId: req.user.id }).sort('-createdAt');

        res.status(200).json({
            success: true,
            count: urls.length,
            data: urls,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Redirect to original URL
// @route   GET /:shortCode
// @access  Public
exports.redirectUrl = async (req, res, next) => {
    try {
        const url = await Url.findOne({ shortCode: req.params.shortCode });

        if (!url) {
            return res.status(404).json({ message: 'No URL found for this alias' });
        }

        url.clicks++;
        await url.save();

        // Record the physical click analytics
        await Click.create({
            urlId: url._id,
            ip: req.ip || req.connection.remoteAddress,
            userAgent: req.headers['user-agent']
        });

        return res.redirect(url.originalUrl);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get analytics for a single URL
// @route   GET /api/v1/urls/:id/analytics
// @access  Private
exports.getUrlAnalytics = async (req, res, next) => {
    try {
        const url = await Url.findById(req.params.id);

        if (!url) {
            return next(new ErrorResponse('URL not found', 404));
        }

        // Check if user owns the URL
        if (url.userId.toString() !== req.user.id) {
            return next(new ErrorResponse('Not authorized to access this analytics', 401));
        }

        // Get total clicks and last 10 visits
        const recentVisits = await Click.find({ urlId: url._id })
            .sort('-timestamp')
            .limit(10);

        const lastVisited = recentVisits.length > 0 ? recentVisits[0].timestamp : null;

        // Aggregate daily clicks for the last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const dailyClicks = await Click.aggregate([
            {
                $match: {
                    urlId: url._id,
                    timestamp: { $gte: sevenDaysAgo }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.status(200).json({
            success: true,
            data: {
                totalClicks: url.clicks,
                lastVisited,
                recentVisits,
                dailyClicks, // Array of { _id: "YYYY-MM-DD", count: X }
            },
        });
    } catch (err) {
        next(err);
    }
};
// @desc    Delete a URL
// @route   DELETE /api/v1/urls/:id
// @access  Private
exports.deleteUrl = async (req, res, next) => {
    try {
        const url = await Url.findById(req.params.id);

        if (!url) {
            return next(new ErrorResponse('URL not found', 404));
        }

        // Check if user owns the URL
        if (url.userId.toString() !== req.user.id) {
            return next(new ErrorResponse('Not authorized to delete this URL', 401));
        }

        await url.deleteOne();

        // Also delete associated clicks
        await Click.deleteMany({ urlId: req.params.id });

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (err) {
        next(err);
    }
};
