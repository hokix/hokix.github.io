// Vanilla JavaScript - no jQuery needed
document.addEventListener('DOMContentLoaded', function() {
    const gotop = document.getElementById('gotop');
    
    gotop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    gotop.style.display = 'none';
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            gotop.style.display = 'block';
            gotop.style.opacity = '1';
        } else {
            gotop.style.opacity = '0';
            setTimeout(() => { if (window.scrollY <= 300) gotop.style.display = 'none'; }, 200);
        }
    });
});