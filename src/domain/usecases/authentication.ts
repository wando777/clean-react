import { AccountModel } from '../models'

export type AuthenticationParams = {
  email: string
  password: string
}

export interface Authentication {
  auth(authParams: AuthenticationParams): Promise<AccountModel>
}
