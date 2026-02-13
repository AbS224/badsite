import { useState, useEffect, useCallback } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ChaoticText from './components/ChaoticText'
import DodgingButton from './components/DodgingButton'
import AgeScroller from './components/AgeScroller'
import NewsletterPopup from './components/NewsletterPopup'
import InfiniteLoader from './components/InfiniteLoader'
import MacMiniButton from './components/MacMiniButton'
import FakeChatWidget from './components/FakeChatWidget'
import CursorTrail from './components/CursorTrail'
import AudioChaos from './components/AudioChaos'
import { initFaviconChaos } from './utils/faviconGenerator'

function App() {
  const [count, setCount] = useState(0)
  
  // DEV TOOLS HINTS - Debugging helpers for developers
  console.log('%c🔍 DEV HINT: This is a chaos website - nothing works as expected!', 'color: #FF0000; font-size: 16px; font-weight: bold;')
  console.log('%c💡 HINT: Check console for more clues about each component...', 'color: #00FF00; font-size: 12px;')
  console.log('%c🎯 HINT: The age scroller is somewhere on this page. Keep scrolling! (But good luck - scroll is inverted!)', 'color: #FFFF00; font-size: 12px; background: #000; padding: 4px;')
  console.log('%c🖱️ HINT: Try clicking things. Especially that button that says "count is X"', 'color: #00FFFF; font-size: 12px; font-weight: bold;')
  
  // PSYCHOLOGICAL WARFARE STATE
  const [showLoader, setShowLoader] = useState(true) // Start with loader
  const [popupQueue, setPopupQueue] = useState([]) // Active popups
  const [popupCounter, setPopupCounter] = useState(0) // Track total popups shown
  const [dismissedPopups, setDismissedPopups] = useState(0) // Track dismissed popups
  
  // Random interval for popup spawning (5-15 seconds)
  const getRandomInterval = useCallback(() => {
    return Math.floor(Math.random() * 10000) + 5000 // 5-15 seconds
  }, [])
  
  // Spawn newsletter popups at random intervals
  useEffect(() => {
    // Don't start popups until loader is dismissed
    if (showLoader) return
    
    const spawnPopup = () => {
      setPopupQueue((prev) => {
        // Limit to 3 popups on screen at once for "usability"
        if (prev.length >= 3) return prev
        return [...prev, { id: Date.now(), number: popupCounter }]
      })
      setPopupCounter((prev) => prev + 1)
    }
    
    // Initial popup after 3 seconds
    const initialTimeout = setTimeout(() => {
      spawnPopup()
    }, 3000)
    
    // Then spawn at random intervals
    let intervalId
    const scheduleNext = () => {
      intervalId = setTimeout(() => {
        spawnPopup()
        scheduleNext()
      }, getRandomInterval())
    }
    
    // Start the random interval after initial popup
    const startInterval = setTimeout(() => {
      scheduleNext()
    }, 3000)
    
    return () => {
      clearTimeout(initialTimeout)
      clearTimeout(startInterval)
      clearTimeout(intervalId)
    }
  }, [showLoader, popupCounter, getRandomInterval])
  
  // Close a specific popup
  const closePopup = useCallback((popupId) => {
    setPopupQueue((prev) => prev.filter((p) => p.id !== popupId))
    setDismissedPopups((prev) => prev + 1)
  }, [])
  
  // Dismiss the infinite loader (but make it hard)
  const dismissLoader = useCallback(() => {
    setShowLoader(false)
  }, [])
  
  // SCROLLJACKING: Invert scroll direction and reduce speed by 10x
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault()
      
      // Invert direction and multiply by 0.1 (user scrolls 10x more)
      const invertedDelta = -e.deltaY * 0.1
      
      window.scrollBy({
        top: invertedDelta,
        behavior: 'auto' // Instant, no smooth scrolling
      })
    }
    
    window.addEventListener('wheel', handleWheel, { passive: false })
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [])
  
  // PHASE 5: Initialize favicon chaos on mount
  useEffect(() => {
    initFaviconChaos()
  }, [])

  return (
    <div className="chaos-container">
      {/* PHASE 4: PSYCHOLOGICAL WARFARE */}
      
      {/* The Infinite Loader - Never actually loads */}
      {showLoader && (
        <InfiniteLoader onComplete={dismissLoader} />
      )}
      
      {/* Newsletter Popups - Confirmshaming at its finest */}
      {popupQueue.map((popup, index) => (
        <div 
          key={popup.id} 
          className="popup-wrapper"
          style={{ 
            zIndex: 1000 + index,
            transform: `translate(${index * 20}px, ${index * 20}px)` 
          }}
        >
          <NewsletterPopup 
            popupNumber={popup.number}
            onClose={() => closePopup(popup.id)}
          />
        </div>
      ))}
      
      {/* Popup counter - Show how many they've dismissed */}
      {dismissedPopups > 0 && !showLoader && (
        <div className="popup-dismiss-counter">
          Popups dismissed: {dismissedPopups} 🎉
        </div>
      )}
      
      {/* Navigation overlap element 1 - Floating annoying banner */}
      <div className="overlap-element overlap-1">
        <ChaoticText as="h3">⚠️ WARNING: THIS WEBSITE IS INTENTIONALLY TERRIBLE ⚠️</ChaoticText>
      </div>

      {/* Navigation overlap element 2 - Random floating box */}
      <div className="overlap-element overlap-2">
        <ChaoticText as="p">CLICK ME!!!</ChaoticText>
      </div>

      {/* Navigation overlap element 3 - Spinning logo in the way */}
      <div className="overlap-element overlap-3">
        <img src={reactLogo} className="spinning-logo" alt="Spinning React logo" />
      </div>

      {/* Main content - positioned absolutely for maximum confusion */}
      <div className="main-content">
        <div className="logo-container">
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        
        <ChaoticText as="h1">Vite + React</ChaoticText>
        
        <div className="card">
          <button onClick={() => { setCount((count) => count + 1); console.log('%c👆 CLICK DETECTED! Count is now: ' + (count + 1), 'color: #00FF00; font-size: 20px; font-weight: bold;') }}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>

      {/* Floating annoying elements */}
      <div className="floating-chaos floating-1">
        <ChaoticText as="h2">BUY NOW!!!</ChaoticText>
      </div>
      
      <div className="floating-chaos floating-2">
        <ChaoticText as="h4">FREE IPOD!!!</ChaoticText>
      </div>

      <div className="floating-chaos floating-3">
        <ChaoticText as="p">You are the 1,000,000th visitor!</ChaoticText>
      </div>

      {/* Marquee-style scrolling text */}
      <div className="scroll-banner">
        <ChaoticText>
          ★★★ WELCOME TO THE WORST WEBSITE EVER ★★★ THIS IS AN ART PROJECT CRITIQUING MODERN WEB DESIGN ★★★ ALL BAD CHOICES ARE INTENTIONAL ★★★
        </ChaoticText>
      </div>

      {/* PHASE 3: INFURIATING INTERACTIONS */}
      
      {/* The Dodging Submit Button - Try to click it! */}
      <DodgingButton />
      
      {/* The Age Scroller - Impossible precision required */}
      <div className="interaction-section">
        <AgeScroller />
      </div>
      
      {/* Extra space to demonstrate scrolljacking */}
      <div className="scroll-test-area">
        <ChaoticText as="h2">📜 SCROLL TEST AREA 📜</ChaoticText>
        <p>Try scrolling... notice anything infuriating?</p>
        <p>(Scroll direction is INVERTED and 10x SLOWER)</p>
        <div className="scroll-indicator">
          <span>↓ Scroll down to go up ↑</span>
        </div>
      </div>
      
      {/* PHASE 5: FINAL POLISH - THE WINNING TOUCHES */}
      
      {/* Cursor Trail - Annoying custom cursor with trail */}
      <CursorTrail />
      
      {/* Mac Mini Bait Button - Opens 10 tabs when clicked */}
      <MacMiniButton />
      
      {/* Audio Chaos - Psychological audio warfare */}
      <AudioChaos />
      
      {/* Fake Chat Widget - Never responds */}
      <FakeChatWidget />
      
      {/* Floating prize emoji for extra chaos */}
      <div className="floating-prize">🎁</div>
    </div>
  )
}

export default App
