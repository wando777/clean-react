import { AxiosHttpClient } from '@/infra/axios'
import { faker } from '@faker-js/faker'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('AxiosHttpClient', () => {
  let url: string
  let statusCode: number
  let body: object
  let sut: AxiosHttpClient
  beforeAll(() => {
    url = faker.internet.url()
    statusCode = faker.internet.httpStatusCode()
    body = {
      any_body: faker.string.alpha()
    }
    mockedAxios.post.mockResolvedValue({ status: statusCode, data: body })
  })
  beforeEach(() => {
    jest.clearAllMocks()
    sut = new AxiosHttpClient()
  })
  it('should call axios with correct URL and body to call a post', async () => {
    await sut.post({ url, body })
    expect(mockedAxios.post).toHaveBeenCalledWith(url, body)
  })
  it('should returns the correct statusCode and body', async () => {
    const response = await sut.post({ url, body })
    expect(response).toEqual({ statusCode, body })
  })
})
