import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Filter, Search, AlertCircle } from 'lucide-react'
import { format, subWeeks, subMonths, startOfDay, endOfDay } from 'date-fns'
import { noticeAPI } from '../services/api'
import NoticeCard from '../components/NoticeCard'
import FilterPanel from '../components/FilterPanel'
import LoadingSpinner from '../components/LoadingSpinner'

const NoticesPage = () => {
  const { level } = useParams()
  const navigate = useNavigate()
  const [notices, setNotices] = useState([])
  const [filteredNotices, setFilteredNotices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    dateRange: 'all',
    startDate: '',
    endDate: ''
  })
  // Add API status state for debugging
  const [apiStatus, setApiStatus] = useState('checking')

  const levelTitles = {
    '1': '100 Level',
    '2': '200 Level', 
    '3': '300 Level',
    '4': '400 Level',
    '5': '500 Level',
    '6': 'Postgraduate Level'
  }

  // Map route levels to API level_id values
  const getLevelId = (level) => {
    const levelMap = {
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6
    }
    return levelMap[level] || parseInt(level)
  }

  // Test API connectivity
  const testApiConnection = async () => {
    try {
      const response = await noticeAPI.getAvailableLevels()
      setApiStatus('connected')
      console.log('API is accessible, available levels:', response)
    } catch (error) {
      setApiStatus('unavailable')
      console.log('API is not accessible:', error.message)
    }
  }

  const fetchNotices = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Fetch from API only - no mock data fallback
      const levelId = getLevelId(level)
      console.log('Fetching notices for level:', level, 'mapped to levelId:', levelId)
      console.log('API endpoint will be: /notice/notice/' + levelId + '/')
      
      const data = await noticeAPI.getNoticesByLevel(levelId)
      console.log('API response data:', data)
      console.log('API response type:', typeof data)
      console.log('Is array?', Array.isArray(data))
      
      if (data && data.length > 0) {
        console.log('First notice structure:', data[0])
        console.log('First notice keys:', Object.keys(data[0]))
      }
      
      const noticesArray = Array.isArray(data) ? data : []
      setNotices(noticesArray)
      // Also set filtered notices to show all notices initially
      setFilteredNotices(noticesArray)
      console.log('Set notices array with length:', noticesArray.length)
      console.log('Set filteredNotices array with length:', noticesArray.length)
      
    } catch (err) {
      console.error('Full error object:', err)
      setError(`Failed to connect to API server. Please ensure the server at http://192.168.0.9:4000 is running and accessible.`)
      console.error('Error fetching notices from API:', err)
      setNotices([]) // Empty array when API fails
      setFilteredNotices([]) // Also clear filtered notices
    } finally {
      setLoading(false)
    }
  }

  const fetchFilteredNotices = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // If using default filters, just apply client-side filtering
      if (filters.dateRange === 'all' && !searchTerm) {
        applyFilters()
        return
      }

      // Fetch filtered data from API only
      const levelId = getLevelId(level)
      const data = await noticeAPI.getNoticesWithFilters(levelId, filters)
      let filtered = Array.isArray(data) ? data : []
      
      // Apply search filter client-side if needed
      if (searchTerm) {
        filtered = filtered.filter(notice =>
          (notice.title || notice.name)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (notice.content || notice.description)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          notice.department?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }
      
      setFilteredNotices(filtered)
      
    } catch (err) {
      setError(`Failed to load filtered notices from API server. Please check your connection to http://192.168.0.9:4000`)
      console.error('Error fetching filtered notices from API:', err)
      setFilteredNotices([]) // Empty array when API fails
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...(notices || [])]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(notice =>
        (notice.title || notice.name)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (notice.content || notice.description)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.department?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply date filters
    const now = new Date()
    switch (filters.dateRange) {
      case 'today': {
        filtered = filtered.filter(notice => {
          const noticeDate = new Date(notice.date)
          return format(noticeDate, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd')
        })
        break
      }
      case 'week': {
        const weekAgo = subWeeks(now, 1)
        filtered = filtered.filter(notice => {
          const noticeDate = new Date(notice.date)
          return noticeDate >= weekAgo
        })
        break
      }
      case 'month': {
        const monthAgo = subMonths(now, 1)
        filtered = filtered.filter(notice => {
          const noticeDate = new Date(notice.date)
          return noticeDate >= monthAgo
        })
        break
      }
      case 'custom': {
        if (filters.startDate && filters.endDate) {
          const startDate = startOfDay(new Date(filters.startDate))
          const endDate = endOfDay(new Date(filters.endDate))
          filtered = filtered.filter(notice => {
            const noticeDate = new Date(notice.date)
            return noticeDate >= startDate && noticeDate <= endDate
          })
        }
        break
      }
    }

    setFilteredNotices(filtered)
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  useEffect(() => {
    testApiConnection()
  }, [])

  useEffect(() => {
    fetchNotices()
  }, [level])

  useEffect(() => {
    // Use API filtering when possible, strict API only
    if (filters.dateRange !== 'all' || searchTerm) {
      fetchFilteredNotices()
    } else {
      applyFilters()
    }
  }, [notices, searchTerm, filters])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-navy-600 hover:text-navy-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Levels</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-800">
                {levelTitles[level]} Notices
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-sm text-gray-500">
                {filteredNotices.length} notice{filteredNotices.length !== 1 ? 's' : ''}
              </div>
              {/* API Status Indicator */}
              <div className="flex items-center space-x-1 text-xs">
                <div className={`w-2 h-2 rounded-full ${
                  apiStatus === 'connected' ? 'bg-green-500' : 
                  apiStatus === 'unavailable' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></div>
                <span className="text-gray-400">
                  {apiStatus === 'connected' ? 'API Connected' : 
                   apiStatus === 'unavailable' ? 'API Required' : 'Connecting...'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search notices..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg border transition-colors ${
                showFilters
                  ? 'bg-navy-600 text-white border-navy-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
            </div>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-6 h-6 text-red-500" />
              <div>
                <h3 className="font-medium text-red-800">Error Loading Notices</h3>
                <p className="text-red-600">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Notices List */}
        {filteredNotices.length > 0 ? (
          <div className="space-y-6">
            {console.log('Rendering notices:', filteredNotices.length, filteredNotices)}
            {filteredNotices.map((notice, index) => {
              console.log(`Rendering notice ${index}:`, notice)
              return <NoticeCard key={notice.id || index} notice={notice} />
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">No Notices Found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {searchTerm || filters.dateRange !== 'all'
                ? 'No notices match your current search or filter criteria. Try adjusting your filters.'
                : error 
                  ? 'Please ensure your API server is running and accessible.'
                  : `There are currently no notices available for ${levelTitles[level]}.`}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default NoticesPage
