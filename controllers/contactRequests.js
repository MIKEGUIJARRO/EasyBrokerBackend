const asyncHandler = require("../middlewares/async");
const EasyBrokerApi = require("../util/EasyBrokerApi");

module.exports.getContactRequests = asyncHandler(async (req, res, next) => {
    const ebApi = new EasyBrokerApi();
    const options = {
        params: { ...req.query }
    };

    const response = await ebApi.contactRequests('get', options);
    res.status(200).json({
        success: true,
        data: response
    });
});

module.exports.postContactRequests = asyncHandler(async (req, res, next) => {
    const ebApi = new EasyBrokerApi();
    const options = {
        data: { ...req.body }
    };
    console.log(options)
    const response = await ebApi.contactRequests('post', options);
    res.status(200).json({
        success: true,
        data: response
    });
});