import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import NoticesPage from './pages/NoticesPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/notices/:level" element={<NoticesPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
