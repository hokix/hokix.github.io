// Vanilla JavaScript - no jQuery needed
document.addEventListener('DOMContentLoaded', function() {
    const gotop = document.getElementById('gotop');
    
    // Add null check to prevent runtime errors
    if (!gotop) return;
    
    gotop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            gotop.classList.add('visible');
        } else {
            gotop.classList.remove('visible');
        }
    });
});