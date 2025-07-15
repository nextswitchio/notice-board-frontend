# University Notice Board Frontend

A modern, responsive React application for university students to view notices and announcements based on their academic level.

## Features

- **Level-based Notice System**: Separate notice boards for different academic levels (100-500 Level, Postgraduate)
- **Advanced Filtering**: Filter notices by date range, day, week, month, or custom date range
- **Search Functionality**: Search through notices by title, content, or department
- **Responsive Design**: Modern, mobile-friendly interface with navy blue theme
- **Real-time Updates**: Connect to backend API for live notice updates

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd NoticeBoard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

## API Configuration

The application is configured to connect to the backend API at `http://192.168.0.9:4000/`. 

### Expected API Endpoints

- `GET /notices/level/{level}` - Get notices for a specific academic level
- `GET /notices/filter?level={level}&dateRange={range}` - Get filtered notices
- `GET /notices` - Get all notices

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── NoticeCard.jsx   # Individual notice display
│   ├── FilterPanel.jsx  # Date filtering component
│   └── LoadingSpinner.jsx
├── pages/              # Main page components
│   ├── LandingPage.jsx # Level selection page
│   └── NoticesPage.jsx # Notice listing page
├── services/           # API and external services
│   └── api.js          # API configuration and calls
├── App.jsx             # Main app component
├── main.jsx            # Application entry point
└── index.css           # Global styles
```

## Academic Levels

The application supports the following academic levels:

- **100 Level**: First year students
- **200 Level**: Second year students  
- **300 Level**: Third year students
- **400 Level**: Fourth year students
- **500 Level**: Fifth year students
- **Postgraduate Level**: Masters & PhD students

## Filtering Options

- **All Time**: Show all notices
- **Today**: Show notices from today only
- **This Week**: Show notices from the past week
- **This Month**: Show notices from the past month
- **Custom Range**: Select specific start and end dates

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Styling

The application uses Tailwind CSS with a custom navy blue color palette. The main theme colors are:

- Primary: Navy blue (#1e3a8a, #1e40af, #3b82f6)
- Backgrounds: Light gray (#f9fafb, #f3f4f6)
- Text: Dark gray (#1f2937, #374151)

## Mock Data

If the API is not available, the application will automatically fall back to mock data to demonstrate functionality. This includes sample notices for each academic level with various priorities and departments.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
# notice-board-frontend
