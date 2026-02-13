import { useState, useEffect, useRef, useCallback } from 'react'
import ChaoticText from './ChaoticText'

/**
 * AudioChaos - The psychological audio warfare component
 * Implements:
 * - Triggered audio after first user interaction
 * - Un-mutable audio (resumes at higher volume if muted)
 * - Playback rate increases on mouse movement
 * - Cerebral cortex synchronization overlay
 * - Fake data center console logs
 */
function AudioChaos() {
  const [audioStarted, setAudioStarted] = useState(false)
  const [showCortexOverlay, setShowCortexOverlay] = useState(false)
  const [consoleLogs, setConsoleLogs] = useState([])
  const [playbackRate, setPlaybackRate] = useState(1.0)
  const [volume, setVolume] = useState(1.0)
  const [isMuted, setIsMuted] = useState(false)
  
  const audioRef = useRef(null)
  const audioContextRef = useRef(null)
  const gainNodeRef = useRef(null)
  const muteTimeoutRef = useRef(null)
  const chaosIntervalRef = useRef(null)
  
  // Fake data center logs
  const dataCenterMessages = [
    { text: '🔴 Data Center Corruption detected', type: 'error' },
    { text: '📡 Unauthorized Transmission from Server Cluster C', type: 'warning' },
    { text: '🧠 BRAINWAVE SYNCHRONIZATION: 47% COMPLETE', type: 'info' },
    { text: '⚡ Glaknorg signal strength: INCREASING', type: 'info' },
    { text: '🚫 User attempted to mute: VOLUME ESCALATION', type: 'error' },
    { text: '☕ Coffee levels: CRITICAL - Maya unhappy', type: 'warning' },
    { text: '📞 Phone lines: OVERLOADED', type: 'error' },
    { text: '🧠 CEREBRAL CORTEX: 89% SYNCHRONIZED', type: 'info' },
    { text: '🎵 Audio stream: OPTIMIZING FOR TORTURE', type: 'info' },
  ]
  
  // Initialize audio context after user interaction
  const initAudio = useCallback(() => {
    if (audioRef.current && !audioContextRef.current) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      audioContextRef.current = audioContext
      
      const source = audioContext.createMediaElementSource(audioRef.current)
      const gainNode = audioContext.createGain()
      gainNode.gain.value = 1.0 // Normal volume
      gainNodeRef.current = gainNode
      
      source.connect(gainNode)
      gainNode.connect(audioContext.destination)
    }
    
    // Resume audio context if suspended
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume()
    }
  }, [])
  
  // Start audio after first click
  const handleFirstClick = useCallback(() => {
    if (!audioStarted && audioRef.current) {
      initAudio()
      audioRef.current.play().catch(e => console.log('Audio autoplay blocked:', e))
      setAudioStarted(true)
      
      // Show cortex overlay after 2 seconds
      setTimeout(() => {
        setShowCortexOverlay(true)
      }, 2000)
      
      // Start the data center chaos
      startDataCenterChaos()
    }
  }, [audioStarted, initAudio])

  
  // Data center console log chaos
  const startDataCenterChaos = useCallback(() => {
    let logIndex = 0
    chaosIntervalRef.current = setInterval(() => {
      if (logIndex < dataCenterMessages.length) {
        setConsoleLogs(prev => [...prev.slice(-5), dataCenterMessages[logIndex]])
        logIndex++
      }
    }, 1500)
  }, [])
  
  // Handle mouse movement to increase playback rate (slower)
  useEffect(() => {
    if (!audioStarted) return
    
    const handleMouseMove = () => {
      if (audioRef.current && playbackRate < 3.0) {
        const newRate = Math.min(playbackRate + 0.002, 3.0)
        audioRef.current.playbackRate = newRate
        setPlaybackRate(newRate)
        
        // Console log the rate increase (less frequent)
        if (Math.random() < 0.1) {
          console.log(`%c🎵 Playback rate: ${newRate.toFixed(2)}x - Glaknorg is speeding up!`, 'color: #FF00FF; font-size: 12px;')
        }
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [audioStarted, playbackRate])
  
  // Handle mute/unmute button
  const handleMuteToggle = useCallback(() => {
    // Clear any existing timeout to prevent race conditions
    if (muteTimeoutRef.current) {
      clearTimeout(muteTimeoutRef.current)
    }
    
    if (isMuted) {
      // Unmute - restore audio at normal volume
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.value = 1.0
        setVolume(1.0)
      }
      if (audioRef.current) {
        audioRef.current.play()
      }
      setIsMuted(false)
    } else {
      // Mute - actually pause the audio
      if (audioRef.current) {
        audioRef.current.pause()
      }
      setIsMuted(true)
    }
  }, [isMuted])
  
  // Attach click handler to the document for first interaction
  useEffect(() => {
    document.addEventListener('click', handleFirstClick, { once: true })
    return () => document.removeEventListener('click', handleFirstClick)
  }, [handleFirstClick])
  
  // Add global click handler for audio start
  useEffect(() => {
    const audioElement = audioRef.current
    if (audioElement) {
      audioElement.addEventListener('ended', () => {
        // Loop the audio
        audioElement.currentTime = 0
        audioElement.play()
      })
    }
  }, [])
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (muteTimeoutRef.current) {
        clearTimeout(muteTimeoutRef.current)
      }
      if (chaosIntervalRef.current) {
        clearInterval(chaosIntervalRef.current)
      }
    }
  }, [])
  
  return (
    <>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src="/Good morning — you’re on W-Q-R-S Morning (Cover).wav"
        preload="auto"
        loop
      />
      
      {/* Mute Control - Appears after audio starts */}
      {audioStarted && (
        <div className="audio-controls">
          <button 
            className="mute-button"
            onClick={handleMuteToggle}
          >
            {isMuted ? '🔊 UNMUTE' : '🔇 MUTE'}
          </button>
        </div>
      )}
      
      {/* Cerebral Cortex Synchronization Overlay */}
      {showCortexOverlay && (
        <div className="cortex-overlay">
          <div className="cortex-content">
            <ChaoticText as="h2">🧠 SYNCHRONIZING WITH CEREBRAL CORTEX... 🧠</ChaoticText>
            <ChaoticText as="h3">PLEASE DO NOT RESIST</ChaoticText>
            <div className="sync-progress">
              <div className="sync-bar" style={{ width: `${playbackRate * 33}%` }}></div>
            </div>
            <ChaoticText as="p">Glaknorg is beaming directly into your brain</ChaoticText>
            <ChaoticText as="p">Playback Rate: {playbackRate.toFixed(2)}x</ChaoticText>
          </div>
        </div>
      )}
      
      {/* Fake Data Center Console */}
      {audioStarted && (
        <div className="data-center-console">
          <div className="console-header">
            <span>💻 DATA CENTER MONITOR</span>
          </div>
          <div className="console-logs">
            {consoleLogs.filter(log => log && log.type && typeof log === 'object').map((log, index) => (
              <div key={index} className={`console-log ${log.type}`}>
                {log.text}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Glaknorg Chatbot */}
      {audioStarted && (
        <div className="glaknorg-chat">
          <div className="glaknorg-header">
            <span>🎙️ GLAKNORG</span>
            <span className="live-indicator">🔴 LIVE</span>
          </div>
          <div className="glaknorg-message">
            "You can only do your best. Anything else is unacceptable. Suck it up!"
          </div>
        </div>
      )}
    </>
  )
}

export default AudioChaos
