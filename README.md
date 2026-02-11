# Policy Impact Dashboard

A comprehensive React-based dashboard for economic policy analysis and forecasting, featuring interactive charts, sentiment analysis, and scenario comparisons.

## 🎯 Features

- **Policy Scenario Controls**: Switch between Baseline, Moderate, and Aggressive policy scenarios
- **Inflation Projection Chart**: Interactive line chart showing inflation projections across different scenarios
- **Public Sentiment Gauge**: Visual gauge displaying public support levels
- **Risk Assessment Card**: Real-time risk level indicator with economic impact metrics
- **Sector Impact Analysis**: Bar chart showing policy effects across different economic sectors
- **Scenario Comparison Table**: Detailed comparison of GDP growth, unemployment, and inflation metrics

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

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

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📊 Data Structure

The dashboard uses a CSV file (`public/data.csv`) to drive all visualizations. The CSV contains:

- **Inflation projections**: Monthly inflation rates for three scenarios (12 months × 3 scenarios)
- **Public sentiment**: Overall support percentage
- **Risk assessment**: Risk level and score metrics
- **Sector impacts**: Impact scores for Technology, Healthcare, Finance, Manufacturing, and Retail
- **Scenario comparisons**: GDP Growth, Unemployment, and Inflation metrics for each scenario

### CSV Format

```csv
category,metric,value,month,scenario
Inflation,Rate,2.5,Jan,Baseline
Sentiment,Public Support,68,,,
Risk,Level,Medium,,,
Sector,Impact,45,,Technology
Scenario,GDP Growth,2.8,,Baseline
```

## 🛠️ Technology Stack

- **React 18**: UI library
- **Vite**: Build tool and dev server
- **Recharts**: Charting library for data visualization
- **PapaParse**: CSV parsing library
- **CSS3**: Custom styling

## 📁 Project Structure

```
hackathon/
├── public/
│   └── data.csv          # Dashboard data
├── src/
│   ├── components/       # React components
│   │   ├── PolicyControls.jsx
│   │   ├── InflationChart.jsx
│   │   ├── SentimentGauge.jsx
│   │   ├── RiskCard.jsx
│   │   ├── SectorChart.jsx
│   │   └── ComparisonTable.jsx
│   ├── App.jsx           # Main application component
│   ├── App.css           # Application styles
│   ├── index.css         # Global styles
│   └── main.jsx          # Application entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Customization

### Updating Data

Edit `public/data.csv` to update the dashboard data. The application will automatically reload with the new data.

### Styling

- Global styles: `src/index.css`
- Component styles: Individual CSS files in `src/components/`
- Main layout: `src/App.css`

### Adding New Scenarios

1. Add data for the new scenario in `public/data.csv`
2. Update the `scenarios` array in `src/components/PolicyControls.jsx`
3. Add description text for the new scenario

## 📸 Screenshot

![Policy Impact Dashboard](https://github.com/user-attachments/assets/981cffe8-db71-4757-9070-71fe7e4131b4)

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

**er1himanshu**

---

Built with ❤️ using React and Vite
