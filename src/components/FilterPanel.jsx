import { Calendar, Clock } from 'lucide-react'

const FilterPanel = ({ filters, onFilterChange }) => {
  const handleDateRangeChange = (range) => {
    onFilterChange({
      ...filters,
      dateRange: range,
      startDate: '',
      endDate: ''
    })
  }

  const handleCustomDateChange = (field, value) => {
    onFilterChange({
      ...filters,
      dateRange: 'custom',
      [field]: value
    })
  }

  const dateRangeOptions = [
    { value: 'all', label: 'All Time', icon: Calendar },
    { value: 'today', label: 'Today', icon: Clock },
    { value: 'week', label: 'This Week', icon: Calendar },
    { value: 'month', label: 'This Month', icon: Calendar },
    { value: 'custom', label: 'Custom Range', icon: Calendar }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Date Range</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {dateRangeOptions.map((option) => {
            const IconComponent = option.icon
            return (
              <button
                key={option.value}
                onClick={() => handleDateRangeChange(option.value)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                  filters.dateRange === option.value
                    ? 'bg-navy-600 text-white border-navy-600'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{option.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Custom Date Range */}
      {filters.dateRange === 'custom' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => handleCustomDateChange('startDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => handleCustomDateChange('endDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterPanel
