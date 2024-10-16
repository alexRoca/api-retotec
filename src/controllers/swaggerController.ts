import { APIGatewayProxyHandler } from 'aws-lambda';
import { SwaggerService } from '../services/swaggerService';

const swaggerService = new SwaggerService();

export const getSwagger: APIGatewayProxyHandler = async (event) => {
  try {
    const yamlContent = swaggerService.getSwaggerDocumentation();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/x-yaml',
      },
      body: yamlContent,
    };
  } catch (error) {
    console.error('Error serving Swagger documentation:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al servir la documentación' }),
    };
  }
};
