import axios from 'axios'

const API_BASE_URL = 'http://192.168.0.9:4000'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // Increased timeout for remote server
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add response interceptor to handle errors better
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - Please check if the API server is running')
    }
    if (error.code === 'ERR_NETWORK') {
      throw new Error('Network error - Cannot reach the API server')
    }
    if (error.response?.status === 404) {
      throw new Error('API endpoint not found - Please check the server configuration')
    }
    if (error.response?.status >= 500) {
      throw new Error('Server error - Please try again later')
    }
    throw error
  }
)

export const noticeAPI = {
  // Get notices by level
  getNoticesByLevel: async (level_id) => {
    try {
      const response = await api.get(`/notice/notice/${level_id}/`)
      return response.data
    } catch (error) {
      console.error('Error fetching notices by level:', error)
      throw error
    }
  },

  // Get notices with filters
  getNoticesWithFilters: async (level_id, filters = {}) => {
    try {
      const params = new URLSearchParams()
      
      // Determine which endpoint to use based on filter type
      let endpoint = '/filter/'
      
      // Handle date range filters
      if (filters.dateRange === 'custom' && filters.startDate && filters.endDate) {
        // Use filter endpoint for date range filtering
        params.append('start_date', filters.startDate)
        params.append('end_date', filters.endDate)
        params.append('level_id', level_id)
        endpoint = '/filter/'
      } else if (filters.dateRange === 'today') {
        // Use filter endpoint for day filtering
        params.append('filter_type', 'day')
        params.append('level_id', level_id)
        endpoint = '/filter/'
      } else if (filters.dateRange === 'week') {
        // Use filter endpoint for week filtering
        params.append('filter_type', 'week')
        params.append('level_id', level_id)
        endpoint = '/filter/'
      } else if (filters.dateRange === 'month') {
        // Use filter endpoint for month filtering
        params.append('filter_type', 'month')
        params.append('level_id', level_id)
        endpoint = '/filter/'
      } else {
        // Use filter endpoint for level_id only
        params.append('level_id', level_id)
        endpoint = '/filter/'
      }
      
      const response = await api.get(`${endpoint}?${params.toString()}`)
      console.log(`Filter API call: ${endpoint}?${params.toString()}`)
      return response.data
    } catch (error) {
      console.error('Error fetching filtered notices:', error)
      throw error
    }
  },

  // Get all notices
//   getAllNotices: async () => {
//     try {
//       const response = await api.get('/notice/notice/')
//       return response.data
//     } catch (error) {
//       console.error('Error fetching all notices:', error)
//       throw error
//     }
//   },

  // Get list of available levels
  getAvailableLevels: async () => {
    try {
      const response = await api.get('/list-level/')
      return response.data
    } catch (error) {
      console.error('Error fetching available levels:', error)
      throw error
    }
  }
}

export default api
