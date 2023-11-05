import { AuthenticationParams } from './../../../../src/domain/usecases/authentication';
import { RemoteAuthentication } from './../../../../src/data/usecases/authentication/remote-authentication'
import { HttpPostClientSpy } from '../mocks/mock-http-client'
import { faker } from '@faker-js/faker'

describe('RemoteAuthentication', () => {
  let sut: RemoteAuthentication
  let url: string
  let httpPostClient: HttpPostClientSpy
  let fakeParams: AuthenticationParams
  beforeAll(() => {
    url = faker.internet.url()
    httpPostClient = new HttpPostClientSpy()
    fakeParams = {
      email: faker.internet.email(),
      password: faker.internet.password()
    }
  })
  beforeEach(() => {
    jest.clearAllMocks()
    sut = new RemoteAuthentication(url, httpPostClient)
  })
  it('Should call HttpClient with correct URL', async () => {
    await sut.auth(fakeParams)
    expect(httpPostClient.url).toBe(url)
  })
  it('Should call HttpClient with correct body', async () => {
    await sut.auth(fakeParams)
    expect(httpPostClient.body).toEqual(fakeParams)
  })
})
