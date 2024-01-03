// const connection = require("../../db/sequelize_connection");
const { QueryTypes } = require("sequelize");
const User = require("../../models/users/User");

exports.emailAvailabilityCheck = async (value) => {
    try {
        let user = await User.findOne({ where: { user_email: value } });
        // console.log('---------------', user)
        if (user) {
            // console.log('--------------')
            return false
        } else {
            return true
        }
    } catch (err) {
        console.log(err.message)
        return 2
    }
};
exports.findUserByEmail = async (value) => {
    try {
        let user = await User.findOne({ where: { user_email: value } });
        if (user) {
            return user
        } else {
            return false
        }

    } catch (err) {
        console.log(err.message)
        return 2
    }
};
exports.findUserCustomField = async (field_name, value) => {
    try {
        let user = await User.findOne({ where: { [field_name]: value } });
        if (user) {
            return user
        } else {
            return false
        }

    } catch (err) {
        console.log(err.message)
        return 2
    }
};