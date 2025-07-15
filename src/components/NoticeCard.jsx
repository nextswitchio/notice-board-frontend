import { Clock, MapPin, Tag, AlertTriangle, Info, CheckCircle } from 'lucide-react'
import { format } from 'date-fns'

const NoticeCard = ({ notice }) => {
  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'high':
        return {
          color: 'text-red-600',
          bg: 'bg-red-50',
          border: 'border-red-200',
          icon: AlertTriangle
        }
      case 'medium':
        return {
          color: 'text-yellow-600',
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          icon: Info
        }
      case 'low':
        return {
          color: 'text-green-600',
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: CheckCircle
        }
      default:
        return {
          color: 'text-gray-600',
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          icon: Info
        }
    }
  }

  // Helper function to safely format date
  const formatNoticeDate = (dateValue) => {
    try {
      if (!dateValue) return 'Date not available'
      
      // Handle different date formats from API
      let date
      if (typeof dateValue === 'string') {
        // Try parsing the string as a date
        date = new Date(dateValue)
      } else if (dateValue instanceof Date) {
        date = dateValue
      } else {
        return 'Invalid date format'
      }
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'Invalid date'
      }
      
      return format(date, 'MMM dd, yyyy • h:mm a')
    } catch (error) {
      console.error('Date formatting error:', error, 'Date value:', dateValue)
      return 'Date unavailable'
    }
  }

  const priorityConfig = getPriorityConfig(notice.priority || 'medium')
  const PriorityIcon = priorityConfig.icon

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 leading-tight">
              {notice.title || notice.name}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{formatNoticeDate(notice.date || notice.date_created || notice.created_at || notice.timestamp)}</span>
              </div>
              {(notice.department || notice.level) && (
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{notice.department || `Level ${notice.level}`}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Priority Badge */}
          <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${priorityConfig.bg} ${priorityConfig.border} border`}>
            <PriorityIcon className={`w-4 h-4 ${priorityConfig.color}`} />
            <span className={`text-sm font-medium ${priorityConfig.color} capitalize`}>
              {notice.priority || 'Normal'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="mb-4">
          <p className="text-gray-600 leading-relaxed">
            {notice.content || notice.description}
          </p>
        </div>

        {/* Tags */}
        {notice.tags && notice.tags.length > 0 && (
          <div className="flex items-center space-x-2 pt-4 border-t border-gray-100">
            <Tag className="w-4 h-4 text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {notice.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-navy-50 text-navy-600 text-xs font-medium rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NoticeCard
