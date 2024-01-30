const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
class SwaggerConfig {
    getSwaggerOptions() {
        const swaggerOptions = {
            swaggerDefinition: {
                openapi: '3.0.0',
                info: {
                    version: '1.0.0',
                    title: 'RedevStore',
                    description: 'Customer API information',
                    contact: {
                        name: 'Olya'
                    },
                    servers: ["http://localhost:3000"]
                },
                components: {
                    securitySchemes: {
                        cookieAuth: {
                            type: 'apiKey',
                            in: 'cookie',
                            name: 'connect.sid'
                        }
                    }
                }

            },
            apis: ['./src/routes/*.js']
        }
        return swaggerOptions
    }
    initSwaggerDoc(app) {
        const swaggerOptions = this.getSwaggerOptions()
        const swaggerDocs = swaggerJSDoc(swaggerOptions)
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
        return swaggerDocs
    }
}

module.exports = new SwaggerConfig()