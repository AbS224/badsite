import { useState, useEffect } from 'react'
import ChaoticText from './ChaoticText'

/**
 * MacMiniButton - The ultimate bait button
 * A giant, flashing "CLAIM YOUR FREE MAC MINI" button
 * When clicked, opens 10 tabs of the same website (recursion nightmare)
 */
function MacMiniButton() {
  const [isHovered, setIsHovered] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [showWarning, setShowWarning] = useState(false)
  
  // Flashing effect using CSS animation state
  const [flashState, setFlashState] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setFlashState((prev) => (prev + 1) % 4)
    }, 200) // Flash every 200ms
    
    return () => clearInterval(interval)
  }, [])
  
  // The chaos function - opens 10 tabs
  const handleClick = () => {
    setClickCount((prev) => prev + 1)
    
    // Show a fake "Congratulations!" alert first
    alert('🎉 CONGRATULATIONS! 🎉\n\nYou are our 1,000,000th visitor!\n\nYour FREE Mac Mini is being prepared...\n\n(Click OK to claim your prize!)')
    
    // Then unleash the tab chaos
    // Open 10 tabs of the same website
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        try {
          window.open(window.location.href, '_blank')
        } catch (e) {
          // Browser might block popups
          console.log('Popup blocked (good for you!)')
        }
      }, i * 100) // Stagger them slightly for maximum chaos
    }
    
    // Show warning after the damage is done
    setShowWarning(true)
    setTimeout(() => setShowWarning(false), 5000)
  }
  
  // Flash colors for the button
  const flashColors = ['#FF0000', '#FFFF00', '#00FF00', '#FF00FF']
  const currentColor = flashColors[flashState]
  
  return (
    <div className="mac-mini-container">
      {/* The main bait button */}
      <button
        className={`mac-mini-button ${isHovered ? 'hovered' : ''}`}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          backgroundColor: currentColor,
          borderColor: flashColors[(flashState + 2) % 4],
        }}
      >
        <div className="mac-mini-content">
          {/* Apple-like logo (but not really) */}
          <div className="mac-mini-logo">
            🍎
          </div>
          
          <ChaoticText as="span" className="mac-mini-title">
            🎁 CLAIM YOUR FREE MAC MINI! 🎁
          </ChaoticText>
          
          <div className="mac-mini-subtitle">
            (A $699 VALUE!)
          </div>
          
          <div className="mac-mini-urgency">
            ⏰ OFFER EXPIRES IN: {Math.floor(Math.random() * 5) + 1}:{String(Math.floor(Math.random() * 60)).padStart(2, '0')}
          </div>
        </div>
        
        {/* Animated border */}
        <div className="mac-mini-border-animation"></div>
      </button>
      
      {/* Click counter */}
      {clickCount > 0 && (
        <div className="mac-mini-counter">
          Times clicked: {clickCount} 😱
        </div>
      )}
      
      {/* Post-click warning */}
      {showWarning && (
        <div className="mac-mini-warning">
          ⚠️ TOO BAD! There was no Mac Mini! ⚠️
          <br />
          Enjoy your 10 new tabs! 🎉
        </div>
      )}
      
      {/* Fake "limited time" badge */}
      <div className="mac-mini-badge">
        LIMITED TIME!
      </div>
      
      {/* Fake trust badges */}
      <div className="mac-mini-trust">
        <span>✓ Verified</span>
        <span>✓ Secure</span>
        <span>✓ 100% Real</span>
      </div>
    </div>
  )
}

export default MacMiniButton
