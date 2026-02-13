import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * CursorTrail - An annoying cursor trail effect
 * Leaves a trail of colorful elements behind the cursor
 * Also includes a custom cursor that's hard to use
 */
function CursorTrail() {
  const [trail, setTrail] = useState([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [trailColors] = useState([
    '#FF0000', '#FF4400', '#FF8800', '#FFCC00', 
    '#FFFF00', '#CCFF00', '#88FF00', '#00FF00',
    '#00FF88', '#00FFCC', '#00FFFF', '#00CCFF',
    '#0088FF', '#0044FF', '#0000FF', '#4400FF',
    '#8800FF', '#CC00FF', '#FF00FF', '#FF00CC'
  ])
  const idCounter = useRef(0)
  
  // Handle mouse movement
  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY })
    
    // Add new trail element
    setTrail((prev) => {
      idCounter.current += 1
      const newTrail = [
        ...prev,
        {
          id: idCounter.current,
          x: e.clientX,
          y: e.clientY,
          color: trailColors[Math.floor(Math.random() * trailColors.length)],
          size: Math.random() * 20 + 10,
          rotation: Math.random() * 360
        }
      ]
      
      // Keep only the last 30 trail elements
      return newTrail.slice(-30)
    })
  }, [trailColors])
  
  // Remove old trail elements
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prev) => {
        if (prev.length === 0) return prev
        return prev.slice(1)
      })
    }, 50)
    
    return () => clearInterval(interval)
  }, [])
  
  // Add mouse move listener
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])
  
  return (
    <>
      {/* Custom cursor - a large, rotating crosshair */}
      <div 
        className="custom-cursor"
        style={{
          left: mousePos.x,
          top: mousePos.y
        }}
      >
        <div className="cursor-inner">+</div>
      </div>
      
      {/* Trail elements */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="cursor-trail-dot"
          style={{
            left: point.x,
            top: point.y,
            backgroundColor: point.color,
            width: point.size,
            height: point.size,
            transform: `translate(-50%, -50%) rotate(${point.rotation}deg)`,
            opacity: (index + 1) / trail.length,
            zIndex: 9999 - index
          }}
        />
      ))}
      
      {/* Random cursor messages */}
      <div 
        className="cursor-message"
        style={{
          left: mousePos.x + 30,
          top: mousePos.y - 20
        }}
      >
        {Math.random() > 0.95 ? 'CLICK ME!' : ''}
      </div>
    </>
  )
}

export default CursorTrail
