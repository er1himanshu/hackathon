import { useState, useEffect } from 'react'
import Papa from 'papaparse'
import './App.css'
import PolicyControls from './components/PolicyControls'
import InflationChart from './components/InflationChart'
import SentimentGauge from './components/SentimentGauge'
import RiskCard from './components/RiskCard'
import SectorChart from './components/SectorChart'
import ComparisonTable from './components/ComparisonTable'

function App() {
  const [data, setData] = useState(null)
  const [selectedScenario, setSelectedScenario] = useState('Baseline')

  useEffect(() => {
    fetch('/data.csv')
      .then(response => response.text())
      .then(csv => {
        Papa.parse(csv, {
          header: true,
          complete: (results) => {
            setData(results.data)
          }
        })
      })
  }, [])

  if (!data) {
    return <div className="loading">Loading dashboard...</div>
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Policy Impact Dashboard</h1>
        <p>Economic Analysis & Forecasting</p>
      </header>

      <PolicyControls 
        selectedScenario={selectedScenario}
        onScenarioChange={setSelectedScenario}
      />

      <div className="dashboard-grid">
        <div className="chart-section full-width">
          <InflationChart data={data} selectedScenario={selectedScenario} />
        </div>

        <div className="chart-section">
          <SentimentGauge data={data} />
        </div>

        <div className="chart-section">
          <RiskCard data={data} />
        </div>

        <div className="chart-section full-width">
          <SectorChart data={data} />
        </div>

        <div className="chart-section full-width">
          <ComparisonTable data={data} />
        </div>
      </div>
    </div>
  )
}

export default App
