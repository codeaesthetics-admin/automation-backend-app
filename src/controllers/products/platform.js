const Platform = require("../../models/products/Platform");

exports.createPlatform = async (req, res, next) => {
    try {
        let { platform_name } = req.body;
        let platform = await Platform.create({
            platform_name, is_deleted: false
        })
        if (platform) {
            res.status(200).json({
                status: true,
                message: "Platform registered successfully"
            })
        } else {
            res.status(400).json({
                status: false,
                message: "Something went wrong please try again later"
            })
        }
    } catch (err) {
        next(err)
        console.log(err.message)
        res.status(500).json({
            status: false,
            message: "Something went wrong please try again later"
        })
    }
};
exports.viewPlatforms = async (req, res, next) => {
    try {
        let platforms = await Platform.findAll({ where: { is_deleted: false } });
        if (platforms && platforms.length > 0) {
            res.status(200).json({
                status: true,
                message: "Platforms fetched successfully",
                platforms
            })
        } else {
            res.status(400).json({
                status: false,
                message: "Something went wrong please try again later"
            })
        }
    } catch (err) {
        next(err)
        console.log(err.message)
        res.status(500).json({
            status: false,
            message: "Something went wrong please try again later"
        })
    }
};