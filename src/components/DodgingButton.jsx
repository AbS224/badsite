import { useState, useRef, useEffect } from 'react'

function DodgingButton() {
  const [position, setPosition] = useState({ x: 100, y: 100 })
  const [failCount, setFailCount] = useState(0)
  const [successMessage, setSuccessMessage] = useState('')
  const buttonRef = useRef(null)
  const isMoving = useRef(false)

  const getRandomPosition = () => {
    const buttonWidth = 150
    const buttonHeight = 50
    const padding = 20
    
    // Calculate safe bounds within viewport
    const maxX = window.innerWidth - buttonWidth - padding
    const maxY = window.innerHeight - buttonHeight - padding
    
    return {
      x: Math.max(padding, Math.random() * maxX),
      y: Math.max(padding, Math.random() * maxY)
    }
  }

  const handleMouseMove = (e) => {
    if (!buttonRef.current || isMoving.current) return
    
    const button = buttonRef.current
    const rect = button.getBoundingClientRect()
    
    // Calculate center of the button
    const buttonCenterX = rect.left + rect.width / 2
    const buttonCenterY = rect.top + rect.height / 2
    
    // Calculate distance from cursor to button center
    const distance = Math.sqrt(
      Math.pow(e.clientX - buttonCenterX, 2) + 
      Math.pow(e.clientY - buttonCenterY, 2)
    )
    
    // If cursor is within 20px of button edge (approximately), dodge!
    const dodgeDistance = Math.max(rect.width, rect.height) / 2 + 20
    
    if (distance < dodgeDistance) {
      isMoving.current = true
      setFailCount(prev => prev + 1)
      setPosition(getRandomPosition())
      
      // Small delay to prevent instant re-triggering
      setTimeout(() => {
        isMoving.current = false
      }, 50)
    }
  }

  const handleClick = () => {
    setSuccessMessage('🎉 IMPOSSIBLE! You actually clicked it! 🎉')
    setFailCount(0)
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="dodging-button-container">
      <div className="fail-counter">
        <ChaoticText as="p">Failed attempts: {failCount}</ChaoticText>
      </div>
      
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
      
      <button
        ref={buttonRef}
        className="dodging-button"
        onClick={handleClick}
        style={{
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: 1000,
          transition: 'none' // Instant movement for maximum frustration
        }}
      >
        Register Now!
      </button>
    </div>
  )
}

// Simple inline chaotic text for this component
function ChaoticText({ as: Component = 'span', children }) {
  return (
    <Component style={{ display: 'inline-block' }}>
      {children}
    </Component>
  )
}

export default DodgingButton
