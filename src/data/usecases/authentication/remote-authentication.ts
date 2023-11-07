import { HttpPostClient } from '@/data/protocols/http/http-post-client'

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) { }
  async auth(params: { email: string, password: string }): Promise<void> {
    await this.httpPostClient.post({ url: this.url, body: params })
    return await Promise.resolve()
  }
}
