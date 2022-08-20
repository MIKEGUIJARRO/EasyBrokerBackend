module.exports.getProperties = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true
        })
    } catch(e) {
        console.log(e)
    }
}