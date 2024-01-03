module.exports = async function (app) {
    try {
        let routes = {
            roleRouter: require('./role'),
            authRouter: require('./auth'),
            productRouter: require('./product'),
            campaignRouter: require('./campaign'),
            userRouter: require('./user')
        }
        let base_version = '/api/v1'
        app.use(`${base_version}/roles/`, routes.roleRouter);
        app.use(`${base_version}/authentication/`, routes.authRouter);
        app.use(`${base_version}/products/`, routes.productRouter);
        app.use(`${base_version}/campaign/`, routes.campaignRouter);
        app.use(`${base_version}/user/`, routes.userRouter);

    } catch (err) {
        console.log("ERROR: ", err)
    }
}