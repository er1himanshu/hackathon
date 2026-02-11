import './ComparisonTable.css'

function ComparisonTable({ data }) {
  const scenarios = ['Baseline', 'Moderate', 'Aggressive']
  const metrics = ['GDP Growth', 'Unemployment', 'Inflation']

  const getScenarioData = (scenario) => {
    const scenarioData = {}
    metrics.forEach(metric => {
      const row = data.find(
        d => d.category === 'Scenario' && d.metric === metric && d.scenario === scenario
      )
      scenarioData[metric] = row ? parseFloat(row.value) : 0
    })
    return scenarioData
  }

  const getBestValue = (metric) => {
    const values = scenarios.map(scenario => {
      const row = data.find(
        d => d.category === 'Scenario' && d.metric === metric && d.scenario === scenario
      )
      return row ? parseFloat(row.value) : 0
    })
    
    // For GDP Growth, higher is better. For Unemployment and Inflation, lower is better
    if (metric === 'GDP Growth') {
      return Math.max(...values)
    }
    return Math.min(...values)
  }

  const isBestValue = (metric, value) => {
    return value === getBestValue(metric)
  }

  return (
    <div>
      <h3 className="chart-title">Scenario Comparison</h3>
      <div className="table-container">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Metric</th>
              {scenarios.map(scenario => (
                <th key={scenario}>{scenario}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metrics.map(metric => (
              <tr key={metric}>
                <td className="metric-name">{metric}</td>
                {scenarios.map(scenario => {
                  const value = getScenarioData(scenario)[metric]
                  const isBest = isBestValue(metric, value)
                  return (
                    <td 
                      key={scenario} 
                      className={isBest ? 'best-value' : ''}
                    >
                      {value.toFixed(1)}%
                      {isBest && <span className="best-badge">★</span>}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-legend">
        <span className="legend-item">
          <span className="legend-star">★</span> Best value for each metric
        </span>
      </div>
    </div>
  )
}

export default ComparisonTable
