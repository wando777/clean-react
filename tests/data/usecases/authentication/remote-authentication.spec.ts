import { RemoteAuthentication } from './../../../../src/data/usecases/authentication/remote-authentication'
import { HttpPostClientSpy } from '../mocks/mock-http-client'

describe('RemoteAuthentication', () => {
  let sut: RemoteAuthentication
  let url: string
  let httpPostClient: HttpPostClientSpy
  beforeAll(() => {
    url = 'any_url'
    httpPostClient = new HttpPostClientSpy()
  })
  beforeEach(() => {
    jest.clearAllMocks()
    sut = new RemoteAuthentication(url, httpPostClient)
  })
  it('Should call HttpClient with correct URL', async () => {
    await sut.auth()
    expect(httpPostClient.url).toBe(url)
  })
})
