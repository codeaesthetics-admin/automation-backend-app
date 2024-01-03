exports.options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Automation API",
            version: "1.0.0",
            description: "Here you will find all the required details about Automation RestFUL API services"
        },
        servers: [
            {
                url: "http://localhost:3001"
            },
            {
                url: "https://backend.automation.app"
            }
        ]
    },
    apis: ["../routes/*.js"]
}