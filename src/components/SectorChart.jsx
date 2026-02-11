import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function SectorChart({ data }) {
  const sectorData = data
    .filter(row => row.category === 'Sector')
    .map(row => ({
      sector: row.month, // Using month field for sector name
      impact: parseFloat(row.value)
    }))

  // Custom color for bars based on impact level
  const getColor = (value) => {
    if (value < 40) return '#ff6b6b'
    if (value < 50) return '#ffd93d'
    return '#51cf66'
  }

  return (
    <div>
      <h3 className="chart-title">Sector Impact Analysis</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={sectorData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="sector" />
          <YAxis label={{ value: 'Impact Score', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="impact" fill="#667eea" name="Impact Score">
            {sectorData.map((entry, index) => (
              <rect key={`cell-${index}`} fill={getColor(entry.impact)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div style={{ marginTop: '15px', fontSize: '0.9em', color: '#666', textAlign: 'center' }}>
        Impact scores indicate the policy effect on each sector (0-100 scale)
      </div>
    </div>
  )
}

export default SectorChart
