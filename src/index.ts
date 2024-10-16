import { APIGatewayProxyHandler } from 'aws-lambda';
import { routes } from './routes/characterRoutes';

export const handler: APIGatewayProxyHandler = async (event) => {
  const route = routes.find(
    (r) => r.path === event.resource && r.method === event.httpMethod.toLowerCase()
  );

  if (route) {
    return route.handler(event);
  }

  return {
    statusCode: 404,
    body: JSON.stringify({ message: 'Ruta no encontrada' }),
  };
};