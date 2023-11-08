import { HttpPostClient, HttpPostParams, HttpResponse } from "@/data/protocols/http"
import axios from "axios"

//This is the design pattern called Adapter. With this implementation, 
//I can set which types I expected using interfaces and adapts this to axios
export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post(postParams: HttpPostParams<any>): Promise<HttpResponse<any>> {
    const response = await axios.post(postParams.url, postParams.body)
    return {
      statusCode: response.status,
      body: response.data
    }
  }
}