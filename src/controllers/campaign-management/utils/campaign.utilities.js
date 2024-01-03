exports.getCampaignObjectives = async () => {

    let objectives = ['APP_INSTALLS',
        'BRAND_AWARENESS',
        'CONVERSIONS',
        'EVENT_RESPONSES',
        'LEAD_GENERATION',
        'LINK_CLICKS',
        'LOCAL_AWARENESS',
        'MESSAGES',
        'OFFER_CLAIMS',
        'PAGE_LIKES,',
        'POST_ENGAGEMENT',
        'PRODUCT_CATALOG_SALES',
        'REACH',
        'STORE_VISITS',
        'VIDEO_VIEWS'
    ]

    return objectives
}

exports.getCampaignParameters = async () => {

    let objectives_with_possible_values = [{
        name: "bid_strategy",
        values: ['LOWEST_COST_WITHOUT_CAP', 'LOWEST_COST_WITH_BID_CAP', 'COST_CAP']
    },
    {
        name: "buying_type",
        values: ['AUCTION', 'RESERVED']
    },
    {
        name: "special_ad_category",
        values: ['HOUSING', 'EMPLOYMENT', 'COST_CAP']
    },
    {
        name: "bid_strategy",
        values: ['LOWEST_COST_WITHOUT_CAP', 'LOWEST_COST_WITH_BID_CAP', 'CREDIT', 'NONE']
    },
    {
        name: "Status",
        values: ['ACTIVE', 'PAUSED', 'DELETED', 'ARCHIVED']
    },
    {
        name: "ios_14_campaign",
        values: ['ON', 'OFF']
    },
    {
        name: "a / b_test",
        values: ['ON', 'OFF']
    },
    {
        name: "campaign_budget_optimization",
        values: ['ON', 'OFF']
    },
    {
        name: "a / b_test",
        values: ['ON', 'OFF']
    }]

    return objectives_with_possible_values
}

