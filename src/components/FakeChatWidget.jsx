import { useState, useEffect } from 'react'

/**
 * FakeChatWidget - A chat support widget that never actually responds
 * Shows a typing indicator forever, making users think help is coming
 */
function FakeChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { type: 'system', text: 'Welcome to Support! An agent will be with you shortly...' }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [waitTime, setWaitTime] = useState(0)
  const [dots, setDots] = useState('')
  
  // Fake typing indicator animation
  useEffect(() => {
    if (!isTyping) return
    
    const interval = setInterval(() => {
      setDots((prev) => prev.length >= 3 ? '' : prev + '.')
    }, 500)
    
    return () => clearInterval(interval)
  }, [isTyping])
  
  // Wait time counter
  useEffect(() => {
    if (!isOpen) return
    
    const interval = setInterval(() => {
      setWaitTime((prev) => prev + 1)
    }, 1000)
    
    return () => clearInterval(interval)
  }, [isOpen])
  
  // Start fake typing after a short delay
  useEffect(() => {
    if (!isOpen) return
    
    const timeout = setTimeout(() => {
      setIsTyping(true)
    }, 2000)
    
    return () => clearTimeout(timeout)
  }, [isOpen])
  
  // Handle user message (but never actually respond)
  const handleSend = () => {
    if (!inputValue.trim()) return
    
    setMessages((prev) => [
      ...prev,
      { type: 'user', text: inputValue }
    ])
    setInputValue('')
    
    // Add a fake "agent is typing" message
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { type: 'system', text: 'Agent John is typing...' }
      ])
    }, 500)
    
    // But never actually respond!
    // The typing indicator just stays forever
  }
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${String(secs).padStart(2, '0')}`
  }
  
  return (
    <div className={`fake-chat-widget ${isOpen ? 'open' : ''}`}>
      {/* Chat toggle button */}
      {!isOpen && (
        <button 
          className="chat-toggle-button"
          onClick={() => setIsOpen(true)}
        >
          <span className="chat-icon">💬</span>
          <span className="chat-badge">1</span>
          <span className="chat-label">Need Help?</span>
        </button>
      )}
      
      {/* Chat window */}
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <span className="chat-status-dot"></span>
              <span className="chat-agent-name">Support Team</span>
            </div>
            <div className="chat-wait-time">
              Wait: {formatTime(waitTime)}
            </div>
            <button 
              className="chat-minimize"
              onClick={() => setIsOpen(false)}
            >
              −
            </button>
          </div>
          
          {/* Messages area */}
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`chat-message ${msg.type}`}
              >
                {msg.text}
              </div>
            ))}
            
            {/* Eternal typing indicator */}
            {isTyping && (
              <div className="chat-message agent typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                Agent is typing{dots}
              </div>
            )}
            
            {/* Fake "reconnecting" message that appears occasionally */}
            {waitTime > 30 && waitTime % 45 < 5 && (
              <div className="chat-message system reconnecting">
                ⚠️ Reconnecting to agent...
              </div>
            )}
          </div>
          
          {/* Input area */}
          <div className="chat-input-area">
            <input
              type="text"
              className="chat-input"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              className="chat-send-button"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
          
          {/* Fake queue position */}
          <div className="chat-queue-info">
            Queue position: {Math.max(1, Math.floor(waitTime / 10))} 
            {' '}(Est. wait: {Math.max(1, Math.floor(waitTime / 30))} min)
          </div>
        </div>
      )}
    </div>
  )
}

export default FakeChatWidget
