import { Authentication, AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'

export class AuthenticationSpy implements Authentication {
  params!: AuthenticationParams
  async auth(_params: AuthenticationParams): Promise<AccountModel> {
    this.params = _params
    return Promise.resolve({ accessToken: '' })
  }
}