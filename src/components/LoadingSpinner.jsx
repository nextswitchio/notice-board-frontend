import { Loader2 } from 'lucide-react'

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-navy-600 animate-spin mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-800 mb-2">Loading Notices</h3>
        <p className="text-gray-600">Please wait while we fetch the latest notices...</p>
      </div>
    </div>
  )
}

export default LoadingSpinner
