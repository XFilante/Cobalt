import { register } from '@filante/skema';

export type User = {
  id: string;
  email: string;
  name: string;
  birthday: string;
  createdAt: string;
};

export const routes = {
  API_V1_USER_LIST: register<{
    input: undefined;
    output: User[];
  }>({
    form: false,
    path: '/api/v1/users',
    method: 'GET',
  }),

  API_V1_USER_SHOW: register<{
    input: {
      params: {
        id: string;
      };
    };
    output: User;
  }>({
    form: false,
    path: '/api/v1/users/{{ id }}',
    method: 'GET',
  }),

  API_V1_USER_CREATE: register<{
    input: {
      email: string;
      name: string;
      birthday: string;
    };
    output: User;
  }>({
    form: false,
    path: '/api/v1/users',
    method: 'POST',
  }),
  API_V1_USER_UPDATE: register<{
    input: {
      params: {
        id: string;
      };

      email: string;
      name: string;
      birthday: string;
    };
    output: User;
  }>({
    form: false,
    path: '/api/v1/users/{{ id }}',
    method: 'PUT',
  }),

  API_V1_USER_DELETE: register<{
    input: {
      params: {
        id: string;
      };
    };
    output: User;
  }>({
    form: false,
    path: '/api/v1/users/{{ id }}',
    method: 'DELETE',
  }),
};
