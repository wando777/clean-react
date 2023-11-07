import { AuthenticationParams } from '@/domain/usecases'
import { RemoteAuthentication } from '@/data/usecases/authentication';
import { HttpPostClientSpy } from '../mocks/mock-http-client'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import { faker } from '@faker-js/faker'
import { HttpStatusCode } from '@/data/protocols/http';
import { AccountModel } from '@/domain/models';

describe('RemoteAuthentication', () => {
  let sut: RemoteAuthentication
  let url: string
  let httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
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
  it('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.auth(fakeParams)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  it('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.auth(fakeParams)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  it('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.auth(fakeParams)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  it('Should return an AccountModel if HttpPosClient returns 200', async () => {
    const httpResult = {
      accessToken: faker.string.uuid()
    }
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const accountToken = await sut.auth(fakeParams)
    expect(accountToken).toEqual(httpResult)
  })
})
