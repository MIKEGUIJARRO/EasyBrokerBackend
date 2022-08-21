const errorHandler = (err, req, res, next) => {
    res.status(err?.statusCode || 500).json({
        success: false,
        error: err.message || 'Unexpected Server Error',
        data: err.data || {}
    });
}

module.exports = errorHandler;