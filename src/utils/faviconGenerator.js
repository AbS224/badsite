/**
 * Favicon Generator - Creates a permanent "1" notification badge
 * This makes users think they have an unread notification FOREVER
 */

/**
 * Generates a favicon with a notification badge using canvas
 * @param {number} size - The size of the favicon (default 32x32)
 * @returns {string} - Data URL of the generated favicon
 */
export function generateNotificationFavicon(size = 32) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  // Background - bright red to stand out
  ctx.fillStyle = '#FF0000';
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.fill();
  
  // Add a slight gradient for depth
  const gradient = ctx.createRadialGradient(
    size / 2 - 3, size / 2 - 3, 0,
    size / 2, size / 2, size / 2
  );
  gradient.addColorStop(0, '#FF4444');
  gradient.addColorStop(1, '#CC0000');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 1, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw the "1" in white
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold ${size * 0.7}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('1', size / 2, size / 2 + 1);
  
  // Add a subtle border
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 0.5, 0, Math.PI * 2);
  ctx.stroke();
  
  return canvas.toDataURL('image/png');
}

/**
 * Generates a favicon with a notification badge using SVG
 * @returns {string} - Data URL of the SVG favicon
 */
export function generateNotificationFaviconSVG() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <defs>
        <radialGradient id="bg" cx="40%" cy="40%" r="60%">
          <stop offset="0%" style="stop-color:#FF4444"/>
          <stop offset="100%" style="stop-color:#CC0000"/>
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="15" fill="url(#bg)" stroke="#FFFFFF" stroke-width="1"/>
      <text x="16" y="22" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#FFFFFF" text-anchor="middle">1</text>
    </svg>
  `;
  
  return 'data:image/svg+xml,' + encodeURIComponent(svg.trim());
}

/**
 * Applies the notification favicon to the page
 * Uses both canvas and SVG methods for maximum browser compatibility
 */
export function applyNotificationFavicon() {
  // Remove any existing favicon
  const existingFavicon = document.querySelector('link[rel="icon"]');
  if (existingFavicon) {
    existingFavicon.remove();
  }
  
  // Create new favicon link
  const favicon = document.createElement('link');
  favicon.rel = 'icon';
  favicon.type = 'image/svg+xml';
  
  // Try SVG first (better quality), fall back to canvas
  try {
    favicon.href = generateNotificationFaviconSVG();
  } catch (e) {
    favicon.href = generateNotificationFavicon(32);
    favicon.type = 'image/png';
  }
  
  document.head.appendChild(favicon);
  
  // Also set as apple-touch-icon for iOS
  const appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]');
  if (appleTouchIcon) {
    appleTouchIcon.remove();
  }
  
  const appleIcon = document.createElement('link');
  appleIcon.rel = 'apple-touch-icon';
  appleIcon.href = generateNotificationFavicon(180);
  document.head.appendChild(appleIcon);
  
  // Update the page title to include a notification indicator
  const originalTitle = document.title;
  document.title = '(1) ' + originalTitle;
  
  // Keep the "(1)" in the title even if it changes
  let titleObserver = new MutationObserver(() => {
    if (!document.title.startsWith('(1)')) {
      document.title = '(1) ' + document.title.replace(/^\(\d+\)\s*/, '');
    }
  });
  
  const titleElement = document.querySelector('title');
  if (titleElement) {
    titleObserver.observe(titleElement, { childList: true, characterData: true, subtree: true });
  }
  
  return favicon;
}

/**
 * Creates a blinking favicon effect for extra annoyance
 * The favicon alternates between red and a slightly different red
 */
export function startBlinkingFavicon() {
  let isBright = true;
  
  setInterval(() => {
    const favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    
    // Alternate between bright and slightly dimmer red
    const bgColor = isBright ? '#FF0000' : '#DD0000';
    
    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.arc(16, 16, 15, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 22px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('1', 16, 17);
    
    favicon.href = canvas.toDataURL('image/png');
    favicon.type = 'image/png';
    
    isBright = !isBright;
  }, 500); // Blink every 500ms
}

/**
 * Initialize all favicon chaos
 */
export function initFaviconChaos() {
  applyNotificationFavicon();
  startBlinkingFavicon();
}
