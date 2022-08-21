const asyncHandler = require("../middlewares/async");
const EasyBrokerApi = require('../util/EasyBrokerApi');

module.exports.getProperties = asyncHandler(async (req, res, next) => {
    const ebApi = new EasyBrokerApi();
    const options = {
        params: { ...req.query }
    };
    const response = await ebApi.properties('get', options);
    res.status(200).json({
        success: true,
        data: response
    });
});

module.exports.getProperty = asyncHandler(async (req, res, next) => {
    const ebApi = new EasyBrokerApi();
    const options = {
        id: req.params.id
    }
    const response = await ebApi.properties('getProperty', options)
    res.status(200).json({
        success: true,
        data: response
    });
})