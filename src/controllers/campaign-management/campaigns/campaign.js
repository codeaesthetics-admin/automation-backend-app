const bizSdk = require('facebook-nodejs-business-sdk');
const Account = require('../../../models/campaigns/Account');
const { sendResponse } = require("../../../helpers/response");
const axios = require('axios');
let JSONbig = require('json-bigint');

exports.createCampaign = async (req, res, next) => {
    try {
        console.log(req.body);
        let { account_id, buying_type, app_install_campaign_type, ios_14_campaign, campaign_budget_optimization, a_b_test,
            life_time_budget, campaign_bid_strategy, add_scdeduling, special_ad_categories, objective, status } = req.body
        let user_account = await Account.findOne({ where: { id: account_id } });
        let user = req.user;
        console.log(user_account)
        const AdAccount = bizSdk.AdAccount;
        // let access_token = user_account.fb_access_token;
        let access_token = "EAATjO7XNE2UBAHnh863dQUICJTq1RZCFdO6faiHxc7mZBHEZBskZBlDDO4ZBqZCHK66ado5lBFdDWx82nLlCzDm2b62GLxocSjDpJRsiLRciLd2rZBAcV3CKq9bWk7zNrImO7LAnf4r4l5AUTgEXg1aDm9T8bcKDTf9ZAHOww9nIda9ny00zzxzEZBaMFP6ruf88ZD"
        // let ad_account_id = user_account.fb_AdAccountId;
        let ad_account_id = "act_1591708051201765"
        // let page_id = user_account.fb_pageId;
        // let page_id = "107198391846668"
        // let app_id = user_account.fb_appId;
        const api = bizSdk.FacebookAdsApi.init(access_token);
        const account = new AdAccount(ad_account_id);
        const fields = [
        ];
        const params = {
            'name': "game_name",
            'buying_type': buying_type,
            'app_install_campaign_type': app_install_campaign_type,
            'ios_14_campaign': ios_14_campaign,
            'a/b_test': a_b_test,
            'campaign_budget_optimization': campaign_budget_optimization,
            'life_time_budget': 250,
            'campaign_bid_strategy': campaign_bid_strategy,
            'add-scdeduling': add_scdeduling,
            'special_ad_categories': special_ad_categories,
            'objective': objective,
            'status': status,
        };
        let campaign = await account.createCampaign(
            fields,
            params
        );
        await sendResponse(res, 200, true, null, "campaign created successfully", { campaign })
    } catch (err) {
        next(err)
        console.log(err.message)
        await sendResponse(res, 500, false, err.message, "Something went wrong please try again later", {})
    }
};
exports.viewAllAdAccountsByToken = async (req, res, next) => {
    try {
        const ad_accounts = await axios({
            method: "get",
            url: `https://graph.facebook.com/v15.0/me/adaccounts`,
            params: {
                'access_token': "EAATjO7XNE2UBAHnh863dQUICJTq1RZCFdO6faiHxc7mZBHEZBskZBlDDO4ZBqZCHK66ado5lBFdDWx82nLlCzDm2b62GLxocSjDpJRsiLRciLd2rZBAcV3CKq9bWk7zNrImO7LAnf4r4l5AUTgEXg1aDm9T8bcKDTf9ZAHOww9nIda9ny00zzxzEZBaMFP6ruf88ZD"
            },

        });
        // console.log(campaigns.data);
        await sendResponse(res, 200, true, null, "Data fetched successfully", { ad_accounts: ad_accounts?.data });
    } catch (err) {
        next(err)
        console.log(err.message)
        await sendResponse(res, 500, false, err.message, "Something went wrong please try again later", {})
    }
};
exports.viewAllCamaignsByAccId = async (req, res, next) => {
    try {
        const campaigns = await axios({
            method: "get",
            url: `https://graph.facebook.com/v15.0/act_1591708051201765/campaigns`,
            params: {
                'effective_status': [
                    "ACTIVE",
                    "PAUSED"
                ],

                'fields': "name,objective",
                'access_token': "EAATjO7XNE2UBAHnh863dQUICJTq1RZCFdO6faiHxc7mZBHEZBskZBlDDO4ZBqZCHK66ado5lBFdDWx82nLlCzDm2b62GLxocSjDpJRsiLRciLd2rZBAcV3CKq9bWk7zNrImO7LAnf4r4l5AUTgEXg1aDm9T8bcKDTf9ZAHOww9nIda9ny00zzxzEZBaMFP6ruf88ZD"
            },
            // filtering: [{ 'field': 'id', 'operator': 'IN', 'value': [] }]

        });
        // console.log(campaigns.data);
        await sendResponse(res, 200, true, null, "Data fetched successfully", { campaigns: campaigns?.data });
    } catch (err) {
        next(err)
        console.log(err.message)
        await sendResponse(res, 500, false, err.message, "Something went wrong please try again later", {})
    }
};
exports.viewAllAdSetsByCampId = async (req, res, next) => {
    try {
        let { campaign_id } = req.body;
        const ad_sets = await axios({
            method: "get",
            url: `https://graph.facebook.com/v15.0/${campaign_id}/adsets`,
            params: {
                'fields': "name",
                'access_token': "EAATjO7XNE2UBAHnh863dQUICJTq1RZCFdO6faiHxc7mZBHEZBskZBlDDO4ZBqZCHK66ado5lBFdDWx82nLlCzDm2b62GLxocSjDpJRsiLRciLd2rZBAcV3CKq9bWk7zNrImO7LAnf4r4l5AUTgEXg1aDm9T8bcKDTf9ZAHOww9nIda9ny00zzxzEZBaMFP6ruf88ZD"
            },
            // filtering: [{ 'field': 'id', 'operator': 'IN', 'value': [] }]

        });
        // console.log(ad_sets.data);
        await sendResponse(res, 200, true, null, "Data fetched successfully", { ad_sets: ad_sets?.data });
    } catch (err) {
        next(err)
        console.log(err.message)
        await sendResponse(res, 500, false, err.message, "Something went wrong please try again later", {})
    }
};

// Tiktok
exports.createTiktokCampaign = async (req, res, next) => {
    try {
        const result = await axios({
            method: "POST",
            url: `https://business-api.tiktok.com/open_api/v1.3/campaign/create/`,
            headers: {
                'Content-Type': 'application/json',
                'Access-Token': '55cce4c4acedf2e1942aca41e44a84ad2f45fcc5'
            },
            data: {
                "advertiser_id": "7067431159843569665",
                "campaign_name": "PRODUCT_SALES object campaign 1.1",
                "operation_status": "ENABLE",
                "budget_mode": "BUDGET_MODE_TOTAL",
                "budget": 130, //required when budget mood is BUDGET_MODE_DAY or BUDGET_MODE_TOTAL
                "campaign_type": "REGULAR_CAMPAIGN",
                "objective_type": "PRODUCT_SALES",
                // "app_promotion_type":"APP_INSTALL", //required when object is App promotion
                // "campaign_app_profile_page_state":"OFF" // required when object is app promotion
            }
        });
        await sendResponse(res, 200, true, null, "campaign created successfully", { campaign })
    } catch (err) {
        next(err)
        console.log(err.message)
        await sendResponse(res, 500, false, err.message, "Something went wrong please try again later", {})
    }
};
exports.generateAccessTokenTiktok = async (req, res, next) => {
    try {
        let { auth_code } = req.body
        console.log(req.body);
        if (auth_code) {
            const result = await axios({
                method: "post",
                url: `https://business-api.tiktok.com/open_api/v1.2/oauth2/access_token/`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "app_id": process.env.APP_ID,
                    "auth_code": auth_code,
                    "secret": process.env.APP_SECRET
                }
            });
            // console.log(result.data);
            if (result && result.data && result.data.data && result.data.data) {
                let { data } = await axios({
                    method: "get",
                    url: `https://business-api.tiktok.com/open_api/v1.3/oauth2/advertiser/get/`,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Token': result.data.data.access_token
                    },
                    params: {
                        "app_id": process.env.APP_ID,
                        "secret": process.env.APP_SECRET,
                    }
                });
                console.log(data)
                if (data && data.data && data.data.list && data.data.list.length > 0) {
                    await sendResponse(res, 200, true, null, "Data fetched successfully", { accounts: data.data.list })
                } else {
                    await sendResponse(res, 400, false, data.message, "Something went wrong please read error message", null)
                }
            }
        } else {
            await sendResponse(res, 400, true, null, "Bad request", { generatedData: null })
        }
    } catch (err) {
        next(err)
        console.log(err, 'er')
        await sendResponse(res, 500, true, err.message, "Something went wrong please try again ", { generatedData: null })
    }
};
exports.viewTiktokAdAccountsOldVersion = async (req, res, next) => {
    try {
        var BigNumber = require('big-number');
        let { data } = await axios({
            method: "post",
            url: `https://business-api.tiktok.com/open_api/oauth2/advertiser/get/`,
            headers: {
                'Content-Type': 'application/json'
            },
            transformResponse: [(data) => {
                return data
            }],
            data: {
                "app_id": '7163495736028446722',
                "access_token": '197913fdfda718742ba458e11d5bb823c5fe3c66',
                "secret": 'f882d1df7cf68cbd1608f066ddf2376245fa001a'
            }
        });
        console.log(data)
        let accounts = JSONbig.parse(data)
        // if () {
        await sendResponse(res, 200, true, null, "Data fetched successfully", { accounts })
        // } else {
        //     await sendResponse(res, 400, false, data.message, "Something went wrong please read error message", null)
        // }
    } catch (err) {
        next(err)
        console.log(err)
        await sendResponse(res, 400, false, err.message, "Something went wrong please read error message", null)
    }
};
exports.viewTiktokAdAccounts = async (req, res, next) => {
    try {
        var BigNumber = require('big-number');
        let { data } = await axios({
            method: "get",
            url: `https://business-api.tiktok.com/open_api/v1.3/oauth2/advertiser/get/`,
            headers: {
                'Content-Type': 'application/json',
                'Access-Token': '197913fdfda718742ba458e11d5bb823c5fe3c66'
            },
            params: {
                "app_id": '7163495736028446722',
                "secret": 'f882d1df7cf68cbd1608f066ddf2376245fa001a'
            }
        });
        if (data && data.data && data.data.list && data.data.list.length > 0) {
            await sendResponse(res, 200, true, null, "Data fetched successfully", { accounts: data.data.list })
        } else {
            await sendResponse(res, 400, false, data.message, "Something went wrong please read error message", null)
        }
    } catch (err) {
        next(err)
        console.log(err.message)
        await sendResponse(res, 400, false, err.message, "Something went wrong please read error message", null)
    }
};
exports.viewTikTokCampaignsByAdvertiserID = async (req, res, next) => {
    try {
        let { page_size, page_number } = req.params
        const { data } = await axios({
            method: "get",
            url: `https://business-api.tiktok.com/open_api/v1.3/campaign/get/`,
            headers: {
                'Content-Type': 'application/json',
                "Access-Token": '5e70c7011454ad72cf5ada774cdcc4571e47d00e',
            },
            params: {
                "advertiser_id": "7067431159843569665",
                "page_size": page_size,
                "page": page_number
            }
        });
        if (data && data.data && data.data.list && data.data.list.length > 0) {
            await sendResponse(res, 200, true, null, "Data fetched successfully", { campaigns: data.data.list, pagination: data.data.page_info })
        } else {
            await sendResponse(res, 400, false, data.message, "Something went wrong please read error message", null)
        }
    } catch (err) {
        next(err)
        console.log(err.message)
        await sendResponse(res, 400, false, err.message, "Something went wrong please read error message", null)
    }
};
exports.viewAdgroupsByCampaignID = async (req, res, next) => {
    try {
        let { page_size, page_number, campaign_id } = req.params
        const { data } = await axios({
            method: "get",
            url: `https://business-api.tiktok.com/open_api/v1.3/adgroup/get/`,
            headers: {
                'Content-Type': 'application/json',
                "Access-Token": '5e70c7011454ad72cf5ada774cdcc4571e47d00e',
            },
            params: {
                "advertiser_id": "7067431159843569665",
                filtering: { campaign_ids: [campaign_id] },
                "page_size": page_size,
                "page": page_number
            }
        });
        if (data && data.data && data.data.list && data.data.list.length > 0) {
            await sendResponse(res, 200, true, null, "Data fetched successfully", { campaigns: data.data.list, pagination: data.data.page_info })
        } else {
            await sendResponse(res, 400, false, data.message, "Something went wrong please read error message", null)
        }
    } catch (err) {
        next(err)
        console.log(err, 'er')
        res.status(200).json({
            status: false,
            message: "Something went wrong please try again later"
        })
    }
};
exports.viewAdsByAdgroupID = async (req, res, next) => {
    try {
        let { page_size, page_number, adgroup_id } = req.params
        const { data } = await axios({
            method: "get",
            url: `https://business-api.tiktok.com/open_api/v1.3/ad/get/`,
            headers: {
                'Content-Type': 'application/json',
                "Access-Token": '5e70c7011454ad72cf5ada774cdcc4571e47d00e',
            },
            params: {
                "advertiser_id": "7067431159843569665",
                filtering: { adgroup_ids: [adgroup_id] },
                "page_size": page_size,
                "page": page_number
            }
        });
        if (data && data.data && data.data.list && data.data.list.length > 0) {
            await sendResponse(res, 200, true, null, "Data fetched successfully", { ads: data.data.list, pagination: data.data.page_info })
        } else {
            await sendResponse(res, 400, false, data.message, "Something went wrong please read error message", null)
        }
    } catch (err) {
        next(err)
        console.log(err, 'er')
        res.status(200).json({
            status: false,
            message: "Something went wrong please try again later"
        })
    }
};

// check if user have any of the accounts connected;