import { useState, useEffect } from 'react'

// DEV TOOLS HINT
console.log('%c🎂 AGE SCROLLER HINT: You need to select a WHOLE NUMBER (no decimals!) to proceed. Good luck!', 'color: #FF00FF; font-size: 14px; background: #000; padding: 4px;')

function AgeScroller() {
  const [age, setAge] = useState(25)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [attempts, setAttempts] = useState(0)

  const handleChange = (e) => {
    const value = parseFloat(e.target.value)
    setAge(value)
    setSuccess(false)
    setError('')
  }

  const validateAge = () => {
    setAttempts(prev => prev + 1)
    
    // Check if age is a whole number
    const isWholeNumber = age % 1 === 0
    
    if (isWholeNumber) {
      setSuccess(true)
      setError('')
    } else {
      setSuccess(false)
      setError(`Are you sure you aren't ${age.toFixed(4)} years old?`)
    }
  }

  const resetAge = () => {
    // Reset to a random whole number for convenience
    const randomWhole = Math.floor(Math.random() * 120)
    setAge(randomWhole)
    setError('')
    setSuccess(false)
  }

  return (
    <div className="age-scroller-container">
      <h3 className="age-title">Select Your Age (Must be EXACTLY a whole number)</h3>
      
      <div className="age-display">
        <span className="age-value">Current Value: {Number.isInteger(age) ? age : age.toFixed(4)}</span>
      </div>
      
      <div className="slider-container">
        <input
          type="range"
          min="0"
          max="120"
          step="1"
          value={age}
          onChange={handleChange}
          className="age-slider"
        />
        <div className="slider-labels">
          <span>0</span>
          <span>30</span>
          <span>60</span>
          <span>90</span>
          <span>120</span>
        </div>
      </div>
      
      <div className="age-controls">
        <button 
          onClick={validateAge}
          className="validate-button"
        >
          Confirm Age
        </button>
        <button 
          onClick={resetAge}
          className="reset-button"
        >
          Reset (Random)
        </button>
      </div>
      
      {error && (
        <div className="age-error">
          ❌ {error}
        </div>
      )}
      
      {success && (
        <div className="age-success">
          ✅ Age verified: {Math.round(age)} years old! (After only {attempts} attempts!)
        </div>
      )}
      
      <div className="attempts-counter">
        Validation attempts: {attempts}
      </div>
    </div>
  )
}

export default AgeScroller
