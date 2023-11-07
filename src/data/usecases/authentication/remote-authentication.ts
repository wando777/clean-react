import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { HttpStatusCode, HttpPostClient } from '@/data/protocols/http'
import { AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AuthenticationParams,
      AccountModel
    >
  ) {}
  async auth(params: { email: string; password: string }): Promise<void> {
    const response = await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    if (response.statusCode === HttpStatusCode.unauthorized) {
      throw new InvalidCredentialsError()
    } else if (response.statusCode !== HttpStatusCode.ok) {
      throw new UnexpectedError()
    }
    return await Promise.resolve()
  }
}
