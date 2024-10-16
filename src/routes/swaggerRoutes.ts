import { getSwagger } from '../controllers/swaggerController';

export const routes = [
  {
    path: '/docs',
    method: 'get',
    handler: getSwagger,
  },
];

export { getSwagger };