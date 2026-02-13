import { useState, useEffect } from 'react'

// Taunting messages that rotate during loading
const LOADING_MESSAGES = [
  "Defragmenting user patience...",
  "Uploading your browser history to the dark web...",
  "Calculating your disappointment level...",
  "Downloading more RAM...",
  "Contacting your ex...",
  "Reticulating splines...",
  "Generating more loading messages...",
  "Consulting the oracle...",
  "Dividing by zero... carefully...",
  "Bribing the hamsters that run the server...",
  "Extracting your deepest regrets...",
  "Loading loading screen...",
  "Pretending to work...",
  "Asking ChatGPT what to load...",
  "Negotiating with time itself...",
  "Spinning up the anxiety engine...",
  "Compiling your poor life choices...",
  "Initializing infinite loop...",
  "Deleting your browser history... just kidding, we saved it...",
  "Loading the loading bar loader...",
]

// Easter egg messages that appear rarely
const EASTER_EGG_MESSAGES = [
  "Wait, you're still here? 😮",
  "Fun fact: You've wasted 30 seconds of your life.",
  "Have you tried turning it off and on again?",
  "Error 404: Patience not found.",
  "Just give up already... please?",
]

function InfiniteLoader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)
  const [skipAttempts, setSkipAttempts] = useState(0)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [easterEggMessage, setEasterEggMessage] = useState('')
  
  // Progress bar that resets at 99%
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        // Reset to 0 when hitting 99%
        if (prev >= 99) {
          // Show easter egg message occasionally
          if (Math.random() < 0.3) {
            setShowEasterEgg(true)
            setEasterEggMessage(
              EASTER_EGG_MESSAGES[Math.floor(Math.random() * EASTER_EGG_MESSAGES.length)]
            )
            setTimeout(() => setShowEasterEgg(false), 3000)
          }
          return 0
        }
        // Slow down as we get closer to 99% for extra frustration
        const increment = prev > 90 ? 0.5 : prev > 70 ? 1 : 2
        return Math.min(prev + increment, 99)
      })
    }, 100)
    
    return () => clearInterval(progressInterval)
  }, [])
  
  // Rotate through taunting messages
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length)
    }, 2000)
    
    return () => clearInterval(messageInterval)
  }, [])
  
  // Skip button that makes things worse
  const handleSkip = () => {
    setSkipAttempts((prev) => prev + 1)
    
    // Different behaviors based on skip attempts
    if (skipAttempts === 0) {
      // First skip: reset progress
      setProgress(0)
    } else if (skipAttempts === 1) {
      // Second skip: slow down even more
      setProgress(0)
    } else if (skipAttempts === 2) {
      // Third skip: show fake error
      setShowEasterEgg(true)
      setEasterEggMessage("ERROR: Skip button not found. Please try again.")
    } else if (skipAttempts >= 3) {
      // Fourth+ skip: just mock them
      const mockMessages = [
        "Nice try. Still loading.",
        "You thought that would work?",
        "Skip? What skip?",
        "The skip button is a lie.",
        "Loading intensified.",
        "You're persistent. We'll give you that.",
      ]
      setShowEasterEgg(true)
      setEasterEggMessage(mockMessages[Math.floor(Math.random() * mockMessages.length)])
    }
    
    setTimeout(() => setShowEasterEgg(false), 2000)
  }
  
  // The "close" button that appears after many skip attempts
  const handleFakeClose = () => {
    setShowEasterEgg(true)
    setEasterEggMessage("PSYCH! There's no escape!")
    setTimeout(() => setShowEasterEgg(false), 2000)
  }
  
  // After 6 skip attempts, show a "mercy" button that actually works
  const handleMercyClose = () => {
    setShowEasterEgg(true)
    setEasterEggMessage("Fine... you win. This time.")
    setTimeout(() => {
      onComplete?.()
    }, 1500)
  }

  return (
    <div className="infinite-loader-overlay">
      <div className="infinite-loader-content">
        {/* Spinning loader graphic */}
        <div className="loader-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        
        {/* Main loading message */}
        <h2 className="loader-title">LOADING...</h2>
        <p className="loader-message">
          {LOADING_MESSAGES[messageIndex]}
        </p>
        
        {/* Easter egg message */}
        {showEasterEgg && (
          <p className="loader-easter-egg">
            {easterEggMessage}
          </p>
        )}
        
        {/* Progress bar */}
        <div className="loader-progress-container">
          <div 
            className="loader-progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="loader-percentage">{Math.floor(progress)}%</p>
        
        {/* Skip button */}
        <button className="loader-skip-button" onClick={handleSkip}>
          {skipAttempts === 0 
            ? "Skip" 
            : skipAttempts === 1 
            ? "Skip (Slower)" 
            : skipAttempts === 2 
            ? "Skip (Broken)" 
            : "Skip (Useless)"}
        </button>
        
        {/* Fake close button that appears after 5 skip attempts */}
        {skipAttempts >= 5 && (
          <button className="loader-fake-close" onClick={handleFakeClose}>
            ✕ Close
          </button>
        )}
        
        {/* Skip attempt counter */}
        {skipAttempts > 0 && (
          <p className="loader-skip-counter">
            Skip attempts: {skipAttempts} (Keep trying, it might work... eventually)
          </p>
        )}
        
        {/* Hidden message that shows after many attempts */}
        {skipAttempts >= 10 && (
          <p className="loader-secret-message">
            🏆 Achievement Unlocked: "Denial" - You've clicked skip 10 times!
          </p>
        )}
        
        {/* Mercy button - appears after 6 attempts and actually works */}
        {skipAttempts >= 6 && (
          <button className="loader-mercy-button" onClick={handleMercyClose}>
            😇 Fine, let me in already...
          </button>
        )}
        
        {/* Super secret message at 20 attempts */}
        {skipAttempts >= 20 && (
          <p className="loader-super-secret">
            🤖 You are a true champion of patience. Or stubbornness.
          </p>
        )}
      </div>
    </div>
  )
}

export default InfiniteLoader
