import './SentimentGauge.css'

function SentimentGauge({ data }) {
  const sentimentData = data.find(row => row.category === 'Sentiment' && row.metric === 'Public Support')
  const value = sentimentData ? parseFloat(sentimentData.value) : 0

  // Calculate the rotation for the needle (0-100 maps to -90 to 90 degrees)
  const rotation = ((value / 100) * 180) - 90

  // Determine color based on value
  const getColor = () => {
    if (value < 40) return '#ff6b6b'
    if (value < 70) return '#ffd93d'
    return '#51cf66'
  }

  return (
    <div>
      <h3 className="chart-title">Public Sentiment</h3>
      <div className="gauge-container">
        <div className="gauge">
          <div className="gauge-background">
            <div className="gauge-section red"></div>
            <div className="gauge-section yellow"></div>
            <div className="gauge-section green"></div>
          </div>
          <div 
            className="gauge-needle" 
            style={{ transform: `rotate(${rotation}deg)` }}
          ></div>
          <div className="gauge-center"></div>
        </div>
        <div className="gauge-value" style={{ color: getColor() }}>
          <span className="value-number">{value}%</span>
          <span className="value-label">Support</span>
        </div>
        <div className="gauge-labels">
          <span className="label-left">Low</span>
          <span className="label-right">High</span>
        </div>
      </div>
    </div>
  )
}

export default SentimentGauge
