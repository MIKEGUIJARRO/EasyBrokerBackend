const asyncHandler = require("../middlewares/async")

module.exports.getProperties = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true
    })
    console.log(e)
})