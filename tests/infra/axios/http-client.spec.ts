import { HttpPostParams } from "@/data/protocols/http"
import axios from 'axios'
import { faker } from "@faker-js/faker"

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('AxiosHttpClient', () => {
  let url: string
  let body: object
  let sut: AxiosHttpClient
  beforeAll(() => {
    url = faker.internet.url()
    body = {
      any_body: faker.string.alpha()
    }
  })
  beforeEach(() => {
    jest.clearAllMocks()
    sut = new AxiosHttpClient()
  })
  it('should call axios with correct URL and body to call a post', async () => {
    await sut.post({ url, body })
    expect(mockedAxios.post).toHaveBeenCalledWith(url, body)
  })
})

export class AxiosHttpClient {
  async post(postParams: HttpPostParams<any>): Promise<void> {
    await axios.post(postParams.url, postParams.body)
  }
}