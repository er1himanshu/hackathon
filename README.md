# AI Policy Impact Simulator

A React-based dashboard that simulates and visualizes the economic and social impacts of various AI policy decisions. Built for college hackathon demonstrations.

## Features

- **Interactive Policy Scenarios**: Switch between Baseline, Aggressive AI Regulation, and Moderate AI Oversight scenarios
- **Inflation Projection Chart**: Line chart showing projected inflation rates from 2024-2030
- **Public Sentiment Gauge**: Visual gauge displaying public sentiment scores
- **Risk Assessment Card**: Dynamic risk level display with probability metrics
- **Sector Impact Analysis**: Bar chart comparing impacts across Technology, Healthcare, Manufacturing, Finance, Agriculture, and Energy sectors
- **Scenario Comparison Table**: Comprehensive comparison of key metrics across all scenarios
- **CSV-Backed Data**: All data loaded from CSV files for easy customization

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Recharts** - Chart library for data visualization
- **PapaParse** - CSV parsing library

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/er1himanshu/hackathon.git
cd hackathon
```

2. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Production Build

Build the application for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Linting

Run ESLint to check code quality:
```bash
npm run lint
```

## Data Files

CSV data files are located in `/public/data/`:
- `inflation-projection.csv` - Inflation rates by year and scenario
- `sentiment.csv` - Public sentiment scores
- `risk-assessment.csv` - Risk levels and probabilities
- `sector-impact.csv` - Impact percentages by sector
- `comparison.csv` - Comparative metrics across scenarios

## Project Structure

```
hackathon/
├── public/
│   └── data/           # CSV data files
├── src/
│   ├── App.jsx         # Main dashboard component
│   ├── App.css         # Dashboard styles
│   ├── main.jsx        # Application entry point
│   └── index.css       # Global styles
├── package.json
└── vite.config.js
```

## Customization

To customize the data displayed in the dashboard:
1. Edit the CSV files in `/public/data/`
2. Maintain the existing CSV structure (column names and data types)
3. The dashboard will automatically load and display the new data

## Demo Ready

This application is fully demo-ready for hackathon presentations with:
- Professional UI design
- Smooth interactions
- Responsive layout
- Clear data visualization
- Multiple scenarios to demonstrate

## License

MIT
