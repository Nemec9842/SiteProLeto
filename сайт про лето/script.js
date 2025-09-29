// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Навигация по разделам
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Функция для переключения активного раздела
    function setActiveSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        const activeSection = document.getElementById(sectionId);
        if (activeSection) {
            activeSection.classList.add('active');
        }
        
        // Обновление URL без перезагрузки страницы
        history.pushState(null, null, `#${sectionId}`);
    }
    
    // Обработчики для навигационных ссылок
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            setActiveSection(targetId);
            
            // Прокрутка к верху страницы при смене раздела
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
    
    // Обработка хеша в URL при загрузке страницы
    function handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            setActiveSection(hash);
        } else {
            setActiveSection('main');
        }
    }
    
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Вызов при первоначальной загрузке
    
    // Аудиоплеер
    const audio = document.getElementById('summerAudio');
    const playBtn = document.getElementById('playBtn');
    let isPlaying = false;
    
    playBtn.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            playBtn.innerHTML = '▶️';
        } else {
            audio.play();
            playBtn.innerHTML = '⏸️';
        }
        isPlaying = !isPlaying;
    });
    
    // Плавная прокрутка для всех внутренних ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Добавление эффекта параллакса для фона
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.section-image');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
});