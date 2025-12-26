// Vanilla JavaScript - no jQuery needed
document.addEventListener('DOMContentLoaded', function() {
    const gotop = document.getElementById('gotop');
    
    // Add null check to prevent runtime errors
    if (!gotop) return;
    
    gotop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    let hideTimeout;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            // Clear any pending hide timeout
            if (hideTimeout) {
                clearTimeout(hideTimeout);
                hideTimeout = null;
            }
            gotop.style.opacity = '1';
        } else {
            gotop.style.opacity = '0';
        }
    });
});