import { AccountModel } from "../models"

type AuthenticationParams = {
  email: string,
  password: string
}

export interface Authentication {
  auth(authParams: AuthenticationParams): Promise<AccountModel>
}
