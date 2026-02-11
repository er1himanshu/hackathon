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
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/data.csv')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load data file')
        }
        return response.text()
      })
      .then(csv => {
        Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            // Only fail if there are critical errors, not minor field mismatches
            const criticalErrors = results.errors.filter(e => e.type === 'Delimiter' || e.code === 'UndetectableDelimiter')
            if (criticalErrors.length > 0) {
              console.error('CSV parsing errors:', criticalErrors)
              setError('Failed to parse data file')
            } else {
              setData(results.data)
            }
          },
          error: (error) => {
            console.error('CSV parsing error:', error)
            setError('Failed to parse data file')
          }
        })
      })
      .catch(err => {
        console.error('Error loading data:', err)
        setError('Failed to load dashboard data')
      })
  }, [])

  if (error) {
    return <div className="error">Error: {error}</div>
  }

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
