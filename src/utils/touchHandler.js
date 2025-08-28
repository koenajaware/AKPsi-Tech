// Mobile touch handler utility
export const handleTouchStart = (callback) => {
  let touchStartY = 0;
  let touchEndY = 0;

  const onTouchStart = (e) => {
    touchStartY = e.touches[0].clientY;
  };

  const onTouchEnd = (e) => {
    touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > 50) {
      callback(diff > 0 ? 'up' : 'down');
    }
  };

  return { onTouchStart, onTouchEnd };
};

// Prevent zoom on double tap
export const preventZoom = (element) => {
  let lastTouchEnd = 0;
  
  element.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
};

// Add touch feedback to buttons
export const addTouchFeedback = (element) => {
  element.addEventListener('touchstart', () => {
    element.style.opacity = '0.7';
  });
  
  element.addEventListener('touchend', () => {
    element.style.opacity = '1';
  });
}; 