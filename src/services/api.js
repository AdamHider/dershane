import axios from 'axios'

const baseURL = 'http://localhost:777/';

const ApiService = {
  init () {
    axios.defaults.baseURL = baseURL
  },

  setHeader () {
    const token = getJWTFromStorage()
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Token ${token}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  },
  setResource (context, method) {
    return `${baseURL}index.php?option=com_dershane&scope=${context}&method=${method}&format=raw`;
  },
  get (resource, slug = '') {
    return axios
      .get(`${resource}/${slug}`)
      .catch((error) => {
        throw new Error(`[RWV] ApiService ${error}`)
      })
  },

  post (context, method, params) {
    const resource = this.setResource(context, method);
    return axios.post(resource, params)
  },

  update (context, method, slug, params) {
    const resource = this.setResource(context, method);
    return axios.put(`${resource}/${slug}`, params)
  },

  put (resource, params) {
    return axios
      .put(`${resource}`, params)
  },

  delete (resource) {
    return axios
      .delete(resource)
      .catch((error) => {
        throw new Error(`[RWV] ApiService ${error}`)
      })
  }
}

export default ApiService

export const Api = {
    courses: {
        getList (params) {
            return ApiService.post('category', 'getList', params)
        }
    },
    lessons: {
        getList (params) {
            return ApiService.post('lessons', 'getList', params)
        }
    }
}
