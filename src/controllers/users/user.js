const { sendResponse } = require("../../helpers/response");
const User = require("../../models/users/User");

exports.checkConnectedAdAccounts = async (req, res, next) => {
    try {
        console.log(req.user)
        let user = await User.findByPk(req.user.id);
        let connectedAccounts = {}
        if (user) {
            connectedAccounts.ad_account_connected = user.ad_account_connected
            connectedAccounts.facebook_connected = user.facebook_connected
            connectedAccounts.tiktok_connected = user.tiktok_connected
            connectedAccounts.google_connected = user.google_connected
            await sendResponse(res, 200, true, null, "Data fetched successfully", { connected_accounts: connectedAccounts })
        } else {
            await sendResponse(res, 400, false, null, "Something went wrong please read error message", null)
        }
    } catch (err) {
        next(err)
        console.log(err, 'er')
        await sendResponse(res, 500, false, err.message, "Something went wrong please read error message", null)
    }
};