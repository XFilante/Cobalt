import { register } from '@filante/skema'

type User = {
  id: number
  email: string
  name: string
  birthday: string
}

export const routes = {
  API_V1_PRIVATE_AUTH_SESSION: register<{
    input: User,
    output: User
  }>({
    form: false,
    path: '/api/v1/user/update',
    method: 'PUT',
  }),
};
