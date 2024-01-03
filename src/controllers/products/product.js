const Product = require("../../models/products/Product");
const User = require("../../models/users/User");
const { getSignedURL } = require("../../utils/get_signed_urls");
let sequelize = require('sequelize');
const Platform = require("../../models/products/Platform");
const { sendResponse } = require("../../helpers/response");

exports.createProduct = async (req, res, next) => {
    try {
        let { platform_id, product_url, product_name } = req.body;
        // 9
        let product = await Product.create({
            is_deleted: false, product_name, platform_id, product_url, product_icon: req.file.key, user_id: req.user.id
        })
        if (product) {
            sendResponse(res, 200, true, null, "Data fetched successfully", { product })
        } else {
            sendResponse(res, 400, false, "Error!", "Error while creating product", {})
        }
    } catch (err) {
        next(err)
        sendResponse(res, 500, false, err.message, "Error while creating product", {})
    }
};
exports.viewProducts = async (req, res, next) => {
    try {
        User.hasMany(Product, { foreignKey: 'user_id' });
        Product.belongsTo(User, { foreignKey: 'user_id' });
        Product.belongsTo(Platform, { foreignKey: 'platform_id' });
        let products = await Product.findAll({
            include: [{
                model: User
            }, {
                model: Platform
            }],
            where: { is_deleted: false, user_id: req.user.id },
            raw: true,
            nest: true,
        }, { type: sequelize.QueryTypes.SELECT });
        // console.log(products)
        if (products && products.length > 0) {
            for (let i = 0; i < products.length; i++) {
                products[i].product_url = await getSignedURL(products[i].product_icon);
            }
            sendResponse(res, 200, true, null, "Data fetched successfully", { products })
        } else {
            sendResponse(res, 400, false, "Error!", "Error while creating product", {})
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