import { useState } from 'react'

// Different newsletter "offers" to torment users
const POPUP_OFFERS = [
  {
    title: "📧 BREAKING NEWS ALERT!",
    message: "Get notified every time someone sneezes within 50 miles of you!",
    placeholder: "your.email@regret.com",
  },
  {
    title: "🔔 PUSH NOTIFICATIONS!",
    message: "Allow us to interrupt your sleep with useless updates at 3 AM!",
    placeholder: "sleep.is@overrated.com",
  },
  {
    title: "📰 WEEKLY SPAM DIGEST!",
    message: "Receive 47 emails per week about products you'll never buy!",
    placeholder: "inbox.zero@impossible.com",
  },
  {
    title: "🎁 EXCLUSIVE OFFERS!",
    message: "Be the first to know about deals that expired yesterday!",
    placeholder: "too.slow@missedit.com",
  },
  {
    title: "📱 SMS UPDATES!",
    message: "We'll text you every thought that crosses our mind!",
    placeholder: "your.phone@doomed.com",
  },
  {
    title: "🐦 BIRD WATCHING TIPS!",
    message: "Daily facts about pigeons whether you want them or not!",
    placeholder: "bird.up@pigeon.com",
  },
  {
    title: "🌙 DREAM ANALYSIS!",
    message: "We'll interpret your dreams and sell the data to advertisers!",
    placeholder: "subconscious@forsale.com",
  },
  {
    title: "🧠 MIND READING SERVICE!",
    message: "Subscribe and we'll guess what you're thinking (poorly)!",
    placeholder: "thoughts.stolen@privacy.com",
  },
]

function NewsletterPopup({ popupNumber, onClose }) {
  const [email, setEmail] = useState('')
  const [showThankYou, setShowThankYou] = useState(false)
  
  // Get the offer for this popup number
  const offer = POPUP_OFFERS[popupNumber % POPUP_OFFERS.length]
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // The email input doesn't actually work - just show a fake thank you
    setShowThankYou(true)
    // Then close after making them think it worked
    setTimeout(() => {
      onClose()
    }, 2000)
  }
  
  const handleShamefulNo = () => {
    // They clicked the shameful button - close but judge them
    onClose()
  }

  if (showThankYou) {
    return (
      <div className="newsletter-popup">
        <div className="popup-content">
          <h2 className="popup-title">🎉 THANK YOU! 🎉</h2>
          <p className="popup-message">
            Your email has been added to our database!
            <br />
            <small>(Just kidding, nothing actually works here)</small>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="newsletter-popup">
      {/* INVISIBLE 1x1 pixel close button - nearly impossible to find! */}
      <div 
        className="invisible-close-button"
        onClick={onClose}
        title=""
        aria-label="close"
      />
      
      <div className="popup-content">
        <h2 className="popup-title">{offer.title}</h2>
        <p className="popup-message">{offer.message}</p>
        
        <form onSubmit={handleSubmit} className="popup-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={offer.placeholder}
            className="popup-email-input"
            required
          />
          <button type="submit" className="popup-submit-button">
            YES! SIGN ME UP!
          </button>
        </form>
        
        <div className="popup-buttons">
          {/* The shameful "No" button */}
          <button 
            className="popup-shame-button"
            onClick={handleShamefulNo}
          >
            I hate kittens and deserve a miserable life
          </button>
        </div>
        
        <p className="popup-counter">
          Popup {popupNumber + 1} of many, many more...
        </p>
      </div>
    </div>
  )
}

export default NewsletterPopup
