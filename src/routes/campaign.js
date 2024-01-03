const express = require('express')
let CampaignController = require('../controllers/campaign-management/campaigns/campaign');
const router = express.Router()
const { userAuth } = require('../middleware/auth');

// Products
router.post('/view-ad-accounts', userAuth, CampaignController.viewAllAdAccountsByToken)
router.post('/create-campaign', userAuth, CampaignController.createCampaign)
router.post('/view-campaigns', userAuth, CampaignController.viewAllCamaignsByAccId)
router.post('/view-adsets', userAuth, CampaignController.viewAllAdSetsByCampId)

// Tiktok
router.post('/tiktok/generate-token', userAuth, CampaignController.generateAccessTokenTiktok);
router.get('/tiktok/ad-accounts', CampaignController.viewTiktokAdAccounts);
router.get('/tiktok/campaigns/:page_size/:page_number', CampaignController.viewTikTokCampaignsByAdvertiserID);
router.get('/tiktok/adgroups/:campaign_id/:page_size/:page_number', CampaignController.viewAdgroupsByCampaignID);
router.get('/tiktok/ads/:adgroup_id/:page_size/:page_number', CampaignController.viewAdsByAdgroupID);
module.exports = router