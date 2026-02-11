import './PolicyControls.css'

function PolicyControls({ selectedScenario, onScenarioChange }) {
  const scenarios = ['Baseline', 'Moderate', 'Aggressive']

  return (
    <div className="policy-controls">
      <h2 className="controls-title">Policy Scenario Controls</h2>
      <div className="scenario-buttons">
        {scenarios.map(scenario => (
          <button
            key={scenario}
            className={`scenario-btn ${selectedScenario === scenario ? 'active' : ''}`}
            onClick={() => onScenarioChange(scenario)}
          >
            {scenario}
          </button>
        ))}
      </div>
      <div className="scenario-description">
        <p>
          {selectedScenario === 'Baseline' && 'Standard economic policy with moderate interventions'}
          {selectedScenario === 'Moderate' && 'Enhanced policy measures with targeted support'}
          {selectedScenario === 'Aggressive' && 'Comprehensive policy with maximum intervention'}
        </p>
      </div>
    </div>
  )
}

export default PolicyControls
