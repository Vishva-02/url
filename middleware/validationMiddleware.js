const { check, validationResult } = require('express-validator');

// Helper to format errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation Error',
            errors: errors.array().map(err => err.msg)
        });
    }
    next();
};

exports.validateSignup = [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    handleValidationErrors
];

exports.validateLogin = [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
    handleValidationErrors
];

exports.validateUrl = [
    check('originalUrl', 'Please provide a valid URL').isURL({ require_valid_protocol: true, require_tld: true }),
    handleValidationErrors
];
