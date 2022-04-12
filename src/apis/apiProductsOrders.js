import axios from 'axios'
import baseURL from './baseUrl'

export class ProductApi {
  constructor(path) {
    this.baseURL = baseURL + path
    this.api = axios.create({ baseURL: this.baseURL })
  }

  async getMethod() {
    const result = await this.api.get('/')
    return result.data
  }

  async postMethod(data) {
    console.log(baseURL, data)
    const res = await this.api.post('/', data)
    return res.data
  }

  getTotalOrders(data) {
    const arr = []
    data.forEach((element) => {
      arr[element.key] = element.sum
    })
    const total = arr[data.length - 1]
    return total
  }
}
