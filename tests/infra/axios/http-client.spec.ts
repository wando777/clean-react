import { HttpPostParams } from "@/data/protocols/http"
import axios from 'axios'
import { faker } from "@faker-js/faker"

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('AxiosHttpClient', () => {
  it('should call axios with correct URL', async () => {
    const url = faker.internet.url()
    const sut = new AxiosHttpClient()
    await sut.post({ url })
    expect(mockedAxios).toHaveBeenCalledWith(url)
  })
})

export class AxiosHttpClient {
  async post(postParams: HttpPostParams<any>): Promise<void> {
    await axios(postParams.url)
  }
}