const mongoose = require('mongoose');

// @desc    Get API Health Status
// @route   GET /health
// @access  Private (API Key required)
exports.checkHealth = (req, res) => {
    // Extensible design: Easily add system checks here
    const mongoStatus = mongoose.connection.readyState;
    
    // Mongoose readyState mapping: 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
    const isDbConnected = mongoStatus === 1;

    // Return the strict requirement structure, while leaving room for extensibility
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        // Bonus: Extensible diagnostic info that you can build on later!
        diagnostics: {
            database: isDbConnected ? 'connected' : 'disconnected',
            uptimeSeconds: Math.floor(process.uptime()),
            memoryUsageMB: Math.floor(process.memoryUsage().heapUsed / 1024 / 1024)
        }
    });
};
