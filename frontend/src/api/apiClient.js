import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      console.error('Network error:', error.message)
    }
    return Promise.reject(error)
  }
)

export default apiClient
