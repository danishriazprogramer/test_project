import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { config } from 'dotenv'
config()

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "BMG Talent API Documentation",
            version: "1.0.0",
        },

        // servers: [
        //   {
        //     url: `${process.env.SWAGGER_STAGE_URL}/api`,
        //   },
        // ],
        // add authentication options
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'apiKey',
                    name: 'Authorization',
                    scheme: 'bearer',
                    in: 'header',
                },
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ["./src/routes/*.js"],
};

const spec = swaggerJSDoc(options);

const swaggerServe = swaggerUi.serve;
const swaggerSetup = swaggerUi.setup(spec);
export { swaggerServe, swaggerSetup };
