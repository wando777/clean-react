import { AuthenticationParams } from '@/domain/usecases'
import { RemoteAuthentication } from '@/data/usecases/authentication';
import { HttpPostClientSpy } from '../mocks/mock-http-client'
import { InvalidCredentialsError } from '@/domain/errors';
import { faker } from '@faker-js/faker'
import { HttpStatusCode } from '@/data/protocols/http';

describe('RemoteAuthentication', () => {
  let sut: RemoteAuthentication
  let url: string
  let httpPostClientSpy: HttpPostClientSpy
  let fakeParams: AuthenticationParams
  beforeAll(() => {
    url = faker.internet.url()
    httpPostClientSpy = new HttpPostClientSpy()
    fakeParams = {
      email: faker.internet.email(),
      password: faker.internet.password()
    }
  })
  beforeEach(() => {
    jest.clearAllMocks()
    sut = new RemoteAuthentication(url, httpPostClientSpy)
  })
  it('Should call HttpClient with correct URL', async () => {
    await sut.auth(fakeParams)
    expect(httpPostClientSpy.url).toBe(url)
  })
  it('Should call HttpClient with correct body', async () => {
    await sut.auth(fakeParams)
    expect(httpPostClientSpy.body).toEqual(fakeParams)
  })
  it('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.auth(fakeParams)
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
})
