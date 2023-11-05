import { HttpPostClient } from 'data/protocols/http/http-post-client';
import { RemoteAuthentication } from './../../../../src/data/usecases/authentication/remote-authentication';

describe('RemoteAuthentication', () => {
  beforeAll(() => {
  })

  it('Should call HttpClient with correct URL', async () => {
    const url = 'any_url'
    const httpPostClient = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClient)
    await sut.auth()
    expect(httpPostClient.url).toBe(url)
  })
})

class HttpPostClientSpy implements HttpPostClient {
  url?: string
  post(url: string): Promise<void> {
    this.url = url
    return Promise.resolve()
  }
}