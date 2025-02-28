const PORT = process.env.PORT || 3000;

export const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Bizit Global web portal API',
            version: '1.0.0',
            description: '',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: 'Local server',
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};