exports.requireApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    
    // Missing header -> 401 Unauthorized
    if (!apiKey) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: Missing X-API-KEY header'
        });
    }

    // Invalid header -> 403 Forbidden
    // Get the expected secret from environment variables or use a default one
    const validKey = process.env.API_SECRET_KEY || 'super-secret-key';
    
    if (apiKey !== validKey) {
        return res.status(403).json({
            success: false,
            message: 'Forbidden: Invalid API Key'
        });
    }

    // Valid header -> proceed to next middleware/controller
    next();
};
