// Set the target date: September 1, 2025, 7:00 AM
const targetDate = new Date('September 1, 2025 07:00:00').getTime();

// Elements
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

// Animation function
function animateValue(element, newValue) {
    if (!element || !element.parentNode) return;
    
    const currentValue = element.textContent.padStart(2, '0');
    if (currentValue === newValue) return;
    
    // Simple update without complex animation to avoid DOM issues
    element.style.transition = 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out';
    element.style.transform = 'scale(1.1)';
    
    setTimeout(() => {
        element.textContent = newValue;
        element.style.transform = 'scale(1)';
    }, 150);
}

// Update countdown
function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update the elements with animation
    animateValue(daysElement, days.toString().padStart(2, '0'));
    animateValue(hoursElement, hours.toString().padStart(2, '0'));
    animateValue(minutesElement, minutes.toString().padStart(2, '0'));
    animateValue(secondsElement, seconds.toString().padStart(2, '0'));
    
    // Check if countdown is over
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.querySelector('.countdown').innerHTML = '<div class="time-up">The time has come!</div>';
    }
}

// Initial call
updateCountdown();

// Update every second
const countdownInterval = setInterval(updateCountdown, 1000);

// Handle window resize for better mobile experience
window.addEventListener('resize', () => {
    // Force reflow to ensure smooth animations
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        document.body.style.overflow = '';
    }, 0);
});
