import axios from 'axios'

const instance = axios.create({
  baseURL: (() => {
    if (typeof window !== 'undefined') {
      return (
        window.location.protocol +
        '//' +
        window.location.hostname +
        ':8000/api/'
      )
    }
    return ''
  })(),
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer ' +
      (() => {
        if (
          typeof window !== 'undefined' &&
          window.localStorage.hasOwnProperty('access')
        ) {
          return window.localStorage.access
        }
        return '';
      })(),
  },
})

const hierarchy = {
  0: 'Student',
  1: 'Teacher',
  2: 'HOD',
  3: 'Vice-Chancellor',
}

class AxiosInstance {
  get_config(headers?: any) {
    return {
      'Content-Type': 'application/json',
      headers: {
        ...headers,
        Authorization: (() => {
          if (
            typeof window !== 'undefined' &&
            window.localStorage.hasOwnProperty('access')
          ) {
            return 'Bearer ' + window.localStorage.access
          }
          return ''
        })(),
      },
    }
  }
  async post(pathname: string, data: FormData, headers?: any) {
    await this.update_token()
    const config = this.get_config(headers)
    return await instance.post(pathname, data, config)
  }

  async login(username: string, password: string) {
    if (typeof window !== 'undefined') {
      const bodyFormData = new FormData()
      bodyFormData.append('college_id', username)
      bodyFormData.append('password', password)
      const request = await instance.post('token/', bodyFormData)
      window.localStorage.setItem('access', request.data.access)
      window.localStorage.setItem('refresh', request.data.refresh)
      const expiryTime = new Date().getTime()
      window.localStorage.setItem(
        'access_expiry',
        String(expiryTime + 5 * 1000)
      )
      const role = 0 // TODO role here
      window.localStorage.setItem('role', String(role))
      window.localStorage.setItem('role_name', hierarchy[role])
      window.localStorage.setItem(
        'refresh_expiry',
        String(expiryTime + 86400 * 1000)
      )
      return request
    }
  }

  async get(pathname: string, headers?: any) {
    await this.update_token()
    const config = this.get_config(headers)
    return await instance.get(pathname, config)
  }

  async update_token() {
    let status = false
    if (!this.__check_expiry()) {
      status = await this.__refresh_token()
      if (!status) {
        window.location.replace('/')
      }
    }
    return status
  }

  async __refresh_token() {
    if (typeof window !== 'undefined') {
      const expiryTime = window.localStorage.getItem('refresh_expiry')
      const token = window.localStorage.getItem('refresh')
      let currTime = new Date().getTime()
      if (
        expiryTime !== null &&
        token !== null &&
        parseInt(expiryTime) > currTime
      ) {
        const formdata = new FormData()
        formdata.append('refresh', token)
        const request = await instance.post('token/refresh/', formdata)
        if (request.status == 200) {
          currTime = new Date().getTime()
          const access = request.data.access
          window.localStorage.setItem('access', access)
          window.localStorage.setItem(
            'access_expiry',
            String(currTime + 5 * 1000)
          )

          if (access === null) {
            return false
          }
        } else {
          return false
        }
        return true
      }
    }
    return false
  }

  __check_expiry() {
    const expiryTime = window.localStorage.getItem('access_expiry')
    return expiryTime !== null && parseInt(expiryTime) >= new Date().getTime()
  }
}

export default AxiosInstance
