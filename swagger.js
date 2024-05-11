import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = (PORT) => ({
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API documentation for Mapsense Assessment',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    in: 'header',
                    name: 'Authorization',
                    description: 'Bearer Token',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: 'Development server',
            },
            {
                url: 'https://location-service-zv1e.onrender.com',
                description: 'live link server'
             },

        ],
    },
    apis: ['./routes/*.js'], // Path to the API routes files
})

const specs = (PORT) => (swaggerJSDoc(options(PORT)));

export default function setupSwagger(app, PORT) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs(PORT)));
}