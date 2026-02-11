import { useState, useEffect } from 'react'
import Papa from 'papaparse'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts'
import './App.css'

function App() {
  const [scenario, setScenario] = useState('baseline')
  const [inflationData, setInflationData] = useState([])
  const [sentimentData, setSentimentData] = useState([])
  const [riskData, setRiskData] = useState([])
  const [sectorData, setSectorData] = useState([])
  const [comparisonData, setComparisonData] = useState([])

  useEffect(() => {
    loadCSVData('/data/inflation-projection.csv', setInflationData)
    loadCSVData('/data/sentiment.csv', setSentimentData)
    loadCSVData('/data/risk-assessment.csv', setRiskData)
    loadCSVData('/data/sector-impact.csv', setSectorData)
    loadCSVData('/data/comparison.csv', setComparisonData)
  }, [])

  const loadCSVData = (file, setter) => {
    Papa.parse(file, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        setter(results.data)
      }
    })
  }

  const currentSentiment = sentimentData.find(s => s.scenario === scenario) || {}
  const currentRisk = riskData.find(r => r.scenario === scenario) || {}

  const getSentimentColor = (score) => {
    if (score >= 60) return '#10b981'
    if (score >= 40) return '#f59e0b'
    return '#ef4444'
  }

  const getRiskColor = (level) => {
    if (level === 'Low') return '#10b981'
    if (level === 'Medium') return '#f59e0b'
    return '#ef4444'
  }

  return (
    <div className="dashboard">
      <header className="header">
        <div className="header-content">
          <h1 className="title">AI Policy Impact Simulator</h1>
          <p className="subtitle">Analyze Economic & Social Impact of Policy Decisions</p>
        </div>
      </header>

      <div className="container">
        <div className="controls">
          <div className="control-group">
            <label>Policy Scenario:</label>
            <select value={scenario} onChange={(e) => setScenario(e.target.value)} className="select">
              <option value="baseline">Baseline (Current Policy)</option>
              <option value="aggressive">Aggressive AI Regulation</option>
              <option value="moderate">Moderate AI Oversight</option>
            </select>
          </div>
        </div>

        <div className="grid">
          <div className="card chart-card">
            <h3 className="card-title">Inflation Projection (2024-2030)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={inflationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" stroke="#6b7280" />
                <YAxis stroke="#6b7280" label={{ value: 'Inflation Rate (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="baseline" stroke="#10b981" strokeWidth={2} name="Baseline" />
                <Line type="monotone" dataKey="aggressive" stroke="#ef4444" strokeWidth={2} name="Aggressive" />
                <Line type="monotone" dataKey="moderate" stroke="#f59e0b" strokeWidth={2} name="Moderate" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="card sentiment-card">
            <h3 className="card-title">Public Sentiment</h3>
            <div className="gauge-container">
              <div className="gauge">
                <svg viewBox="0 0 200 120" className="gauge-svg">
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="20"
                  />
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke={getSentimentColor(currentSentiment.score)}
                    strokeWidth="20"
                    strokeDasharray={`${(currentSentiment.score || 0) * 2.51} 251`}
                  />
                  <text x="100" y="85" textAnchor="middle" className="gauge-text">
                    {currentSentiment.score || 0}
                  </text>
                  <text x="100" y="105" textAnchor="middle" className="gauge-label">
                    {currentSentiment.label || 'N/A'}
                  </text>
                </svg>
              </div>
            </div>
          </div>

          <div className="card risk-card">
            <h3 className="card-title">Risk Assessment</h3>
            <div className="risk-content">
              <div className="risk-level" style={{ backgroundColor: getRiskColor(currentRisk.level) }}>
                {currentRisk.level || 'N/A'}
              </div>
              <div className="risk-details">
                <div className="risk-item">
                  <span className="risk-label">Probability:</span>
                  <span className="risk-value">{currentRisk.probability || 0}%</span>
                </div>
                <div className="risk-description">
                  {currentRisk.impact || 'No data available'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid">
          <div className="card chart-card-wide">
            <h3 className="card-title">Sector Impact Analysis (% Change)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sectorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="sector" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Bar dataKey="baseline" fill="#10b981" name="Baseline" />
                <Bar dataKey="aggressive" fill="#ef4444" name="Aggressive" />
                <Bar dataKey="moderate" fill="#f59e0b" name="Moderate" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card table-card">
          <h3 className="card-title">Scenario Comparison</h3>
          <div className="table-container">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Baseline</th>
                  <th>Aggressive</th>
                  <th>Moderate</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index}>
                    <td className="metric-name">{row.metric}</td>
                    <td>{row.baseline}</td>
                    <td>{row.aggressive}</td>
                    <td>{row.moderate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
