// const connection = require("../../db/sequelize_connection");
const { QueryTypes } = require("sequelize");
const { findUserByEmail, emailAvailabilityCheck, findUserCustomField } = require("./utils");
const bcrypt = require('bcrypt');
const User = require("../../models/users/User");
const { accessToken } = require("../../middleware/jwt_token");
const { sendResponse } = require("../../helpers/response");
const { OAuth2Client } = require('google-auth-library');

exports.registerUser = async (req, res, next) => {
    try {
        let { first_name, email, password, last_name } = req.body;
        let emailCheck = await emailAvailabilityCheck(email);
        if (emailCheck && emailCheck == 2) {
            res.status(400).json({
                status: false,
                message: "Email taken!"
            })
        } else if (emailCheck) {
            let hashedPass = await bcrypt.hash(password, 10)
            password = hashedPass;
            let new_user = await User.create({
                name: first_name + last_name,
                user_email: email,
                user_special_name: "Uzair",
                password,
                is_admin: true,
                is_deleted: false,
                status: 0
            })
            if (new_user) {
                let token = await accessToken(new_user);
                await sendResponse(res, 200, true, null, "User registered successfully", {token})
            } else {
                await sendResponse(res, 400, false, null, "Something went wrong please try again later", {})
            }
        } else {
            await sendResponse(res, 400, false, null, "Email taken!", {})
        }
    } catch (err) {
        next(err)
        console.log(err.message)
        await sendResponse(res, 500, false, err.message, "Something went wrong please try again later", {})
    }
};
exports.loginUser = async (req, res, next) => {
    try {
        let { email, password } = req.body
        let user = await findUserByEmail(email);
        if (user && user == 2) {
            await sendResponse(res, 400, false, null, "Invalid credentials", {})
        } else if (user) {
            if (await bcrypt.compare(password, user.password)) {
                user.password = null
                let token = await accessToken(user);
                await sendResponse(res, 200, true, null, "User registered successfully", { user, token })
            } else {
                await sendResponse(res, 400, false, null, "Invalid credentials", {})
            }
        } else {
            await sendResponse(res, 400, false, null, "Invalid credentials", {})
        }
    } catch (err) {
        next(err)
        console.log(err.message)
        await sendResponse(res, 500, false, err.message, "Something went wrong please try again later", {})
    }
};
exports.loginWithFacebook = async (req, res, next) => {
    try {
        let { user_name, email, profile_image } = req.body;
        console.log(req.body)
        let user = await findUserByEmail(email);
        if (user && user == 2) {
            await sendResponse(res, 400, false, null, "Invalid credentials", {})
        } else if (user) {
            let token = await accessToken(user);
            await sendResponse(res, 200, true, null, "Login successful", { token })
        } else {
            // let's create a new user with given google_id
            let new_user = await User.create({
                name: user_name,
                is_admin: false,
                is_deleted: false,
                // profile_image,
                email,
                status: 0
            })
            if (new_user) {
                let token = await accessToken(new_user);
                await sendResponse(res, 200, true, null, "User registered successfully", { token })
            } else {
                await sendResponse(res, 400, false, null, "Something went wrong please try again later", {})
            }
        }
    } catch (err) {
        next(err)
        console.log(err.message)
        await sendResponse(res, 500, false, err.message, "Something went wrong please try again later", {})
    }
};
exports.loginWithGoogle = async (req, res, next) => {
    try {
        let { token } = req.body;
        const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        });
        let { email, name, picture } = ticket.getPayload();
        let user = await findUserByEmail(email);
        if (user && user == 2) {
            await sendResponse(res, 400, false, null, "Invalid credentials", {})
        } else if (user) {
            let token = await accessToken(user);
            await sendResponse(res, 200, true, null, "Login successful", { token })
        } else {
            // let's create a new user with given google_id
            let new_user = await User.create({
                name,
                is_admin: false,
                is_deleted: false,
                email,
                status: 0
            })
            if (new_user) {
                let token = await accessToken(new_user);
                await sendResponse(res, 200, true, null, "User registered successfully", { token })
            } else {
                await sendResponse(res, 400, false, null, "Something went wrong please try again later", {})
            }
        }
    } catch (err) {
        next(err)
        console.log(err.message)
        await sendResponse(res, 500, false, err.message, "Something went wrong please try again later", {})
    }
};