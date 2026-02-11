import './RiskCard.css'

function RiskCard({ data }) {
  const riskLevel = data.find(row => row.category === 'Risk' && row.metric === 'Level')?.value || 'Unknown'
  const riskScore = data.find(row => row.category === 'Risk' && row.metric === 'Score')?.value || '0'

  const getRiskColor = () => {
    if (riskLevel === 'Low') return '#51cf66'
    if (riskLevel === 'Medium') return '#ffd93d'
    return '#ff6b6b'
  }

  const getRiskIcon = () => {
    if (riskLevel === 'Low') return '✓'
    if (riskLevel === 'Medium') return '⚠'
    return '✗'
  }

  return (
    <div>
      <h3 className="chart-title">Risk Assessment</h3>
      <div className="risk-card-content">
        <div className="risk-icon" style={{ backgroundColor: getRiskColor() }}>
          {getRiskIcon()}
        </div>
        <div className="risk-details">
          <div className="risk-level" style={{ color: getRiskColor() }}>
            {riskLevel}
          </div>
          <div className="risk-score">
            Risk Score: <strong>{riskScore}</strong>
          </div>
        </div>
        <div className="risk-indicators">
          <div className="indicator">
            <span className="indicator-label">Economic Impact</span>
            <div className="indicator-bar">
              <div 
                className="indicator-fill" 
                style={{ 
                  width: `${(parseFloat(riskScore) / 10) * 100}%`,
                  backgroundColor: getRiskColor() 
                }}
              ></div>
            </div>
          </div>
          <div className="indicator">
            <span className="indicator-label">Policy Effectiveness</span>
            <div className="indicator-bar">
              <div 
                className="indicator-fill" 
                style={{ 
                  width: `${100 - (parseFloat(riskScore) / 10) * 100}%`,
                  backgroundColor: '#51cf66' 
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RiskCard
