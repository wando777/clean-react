import { Authentication, AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'

export class AuthenticationSpy implements Authentication {
  params!: AuthenticationParams
  callsCount = 0
  async auth(_params: AuthenticationParams): Promise<AccountModel> {
    this.params = _params
    this.callsCount++
    return Promise.resolve({ accessToken: 'any_accessToken' })
  }
}
