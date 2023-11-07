import { InvalidCredentialsError } from '@/domain/errors';
import { HttpStatusCode, HttpPostClient } from '@/data/protocols/http';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) { }
  async auth(params: { email: string, password: string }): Promise<void> {
    const response = await this.httpPostClient.post({ url: this.url, body: params })
    if (response.statusCode === HttpStatusCode.unauthorized) {
      throw new InvalidCredentialsError()
    }
    return await Promise.resolve()
  }
}