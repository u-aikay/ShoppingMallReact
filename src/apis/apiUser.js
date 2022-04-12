import axios from 'axios'
import baseURL from './baseUrl'

export class UserApi {
  constructor(path) {
    this.baseURL = baseURL + path
    this.api = axios.create({ baseURL: this.baseURL })
  }

  async getMethod() {
    const result = await this.api.get('/')
    return result.data
  }

  async postMethod(data) {
    const res = await this.api.post('/', data)
    return res.data
  }

  findOne(id, data) {
    let user = {}
    data.forEach((element) => {
      if (element.id === id) {
        user = element
      }
    })
    return user
  }
}
