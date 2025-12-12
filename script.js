document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const links = document.querySelectorAll('a, .gallery-item');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');
        });
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
        });
    });

    // Scroll Reveal
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => observer.observe(el));

    // Glitch Text Randomizer for Hero Subtitle
    const subtitle = document.querySelector('.subtitle');
    const originalText = subtitle.innerHTML;
    const glitchChars = '!@#$%^&*()<>?/';
    
    // Simple glitch effect on click
    subtitle.addEventListener('click', () => {
        let iterations = 0;
        const interval = setInterval(() => {
            subtitle.innerText = subtitle.innerText.split('')
                .map((letter, index) => {
                    if(index < iterations) {
                        return originalText[index]; // Note: this logic is simple, won't work perfectly with innerHTML tags.
                    }
                    return glitchChars[Math.floor(Math.random() * 26)]
                })
                .join('');
            
            if(iterations >= originalText.length){ 
                clearInterval(interval);
                subtitle.innerHTML = originalText;
            }
            
            iterations += 1/3;
        }, 30);
    });
});
