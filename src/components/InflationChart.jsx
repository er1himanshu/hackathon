import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function InflationChart({ data, selectedScenario }) {
  // Filter inflation data for the selected scenario
  const inflationData = data
    .filter(row => row.category === 'Inflation' && row.scenario === selectedScenario)
    .map(row => ({
      month: row.month,
      rate: parseFloat(row.value)
    }))

  // Get all scenarios for comparison
  const scenarios = ['Baseline', 'Moderate', 'Aggressive']
  const comparisonData = scenarios.map(scenario => {
    const scenarioData = data
      .filter(row => row.category === 'Inflation' && row.scenario === scenario)
      .map(row => ({
        month: row.month,
        rate: parseFloat(row.value)
      }))
    return { scenario, data: scenarioData }
  })

  // Combine data for all scenarios
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const chartData = months.map(month => {
    const point = { month }
    comparisonData.forEach(({ scenario, data }) => {
      const dataPoint = data.find(d => d.month === month)
      if (dataPoint) {
        point[scenario] = dataPoint.rate
      }
    })
    return point
  })

  return (
    <div>
      <h3 className="chart-title">Inflation Projection</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis label={{ value: 'Inflation Rate (%)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="Baseline" 
            stroke="#8884d8" 
            strokeWidth={selectedScenario === 'Baseline' ? 3 : 1}
            opacity={selectedScenario === 'Baseline' ? 1 : 0.3}
          />
          <Line 
            type="monotone" 
            dataKey="Moderate" 
            stroke="#82ca9d" 
            strokeWidth={selectedScenario === 'Moderate' ? 3 : 1}
            opacity={selectedScenario === 'Moderate' ? 1 : 0.3}
          />
          <Line 
            type="monotone" 
            dataKey="Aggressive" 
            stroke="#ffc658" 
            strokeWidth={selectedScenario === 'Aggressive' ? 3 : 1}
            opacity={selectedScenario === 'Aggressive' ? 1 : 0.3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default InflationChart
