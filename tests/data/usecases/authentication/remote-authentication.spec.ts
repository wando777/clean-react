import { RemoteAuthentication } from './../../../../src/data/usecases/authentication/remote-authentication';
import { HttpPostClientSpy } from '../mocks/mock-http-client';

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

