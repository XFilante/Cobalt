import { routes } from './routes';
import { api } from './api';
import { logger } from './logger';
import { QueryClient } from '@tanstack/react-query';
import { Cobalt } from '@filante/cobalt';

export const cobalt = new Cobalt<typeof routes, 'id'>({
  api,
  routes,
  logger,
  query: new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
      },
    },
  }),
});
