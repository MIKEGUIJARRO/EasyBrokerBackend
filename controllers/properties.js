const asyncHandler = require("../middlewares/async");
const EasyBrokerApi = require('../util/EasyBrokerApi');

module.exports.getProperties = asyncHandler(async (req, res, next) => {
    const ebApi = new EasyBrokerApi();
    const options = { params: { ...req.query } };
    console.log(options);
    const response = await ebApi.properties('get', options);
    res.status(200).json({
        success: true,
        data: response
    });
});

