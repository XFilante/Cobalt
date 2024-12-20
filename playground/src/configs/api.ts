import { Arcessere } from '@filante/arcessere';
import { routes } from './routes';

export const api = new Arcessere({
  base: new URL("https://676507b752b2a7619f5e23c4.mockapi.io"),
  routes,
});
