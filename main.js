// Проверка поддержки reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Регистрация ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ========== СТРАНИЦА 2 - АНИМАЦИЯ ПОЯВЛЕНИЯ КОНВЕРТА ==========
function animateEnvelope() {
    const envelopeOpen = document.querySelector('.envelope-open');
    const ticketBg = document.querySelector('.card.ticket-bg');
    
    if (!envelopeOpen) return;

    // Начальное состояние конверта
    gsap.set(envelopeOpen, {
        opacity: 0,
        y: 40,
        filter: 'blur(6px)'
    });

    // Начальное состояние фона билета (такая же анимация, как у конверта)
    if (ticketBg) {
        gsap.set(ticketBg, {
            opacity: 0,
            y: 40,
            filter: 'blur(6px)'
        });
    }

    if (prefersReducedMotion) {
        gsap.set(envelopeOpen, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)'
        });
        if (ticketBg) {
            gsap.set(ticketBg, {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)'
            });
        }
        return;
    }

    // Анимация появления конверта (как на первой странице)
    gsap.to(envelopeOpen, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        delay: 0.4,
        ease: 'power2.out'
    });

    // Анимация появления фона билета (такая же, как у конверта)
    if (ticketBg) {
        gsap.to(ticketBg, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
            delay: 0.55,
            ease: 'power2.out'
        });
    }
}

// ========== СТРАНИЦА 2 - АНИМАЦИЯ ВЫЕЗДА КАРТОЧЕК ==========
function animateCards() {
    const cards = document.querySelectorAll('.card');
    if (cards.length === 0) return;
    
    const isMobile = window.innerWidth <= 768;
    const yOffset = isMobile ? -80 : -120;

    // Начальное состояние карточек (исключаем фон билета, он анимируется отдельно)
    const cardsWithoutBg = Array.from(cards).filter(card => !card.classList.contains('ticket-bg'));
    gsap.set(cardsWithoutBg, {
        opacity: 0,
        y: 60,
        filter: 'blur(10px)',
        scale: 0.98
    });

    // Установка начального поворота: правое фото по часовой, левое против
    gsap.set('.card.photo1', { rotation: 7 });
    gsap.set('.card.photo2', { rotation: -6 });
    gsap.set('.card.ticket', { rotation: -3 });

    if (prefersReducedMotion) {
        gsap.set(cardsWithoutBg, {
            opacity: 1,
            y: yOffset,
            filter: 'blur(0px)',
            scale: 1,
            rotation: 0
        });
        return;
    }

    // Анимация выезда карточек с эффектом overshoot (только фото и билет с текстом, без фона билета)
    gsap.to(cardsWithoutBg, {
        opacity: 1,
        y: yOffset,
        filter: 'blur(0px)',
        scale: 1,
        rotation: 0,
        duration: 1.2,
        stagger: 0.18,
        ease: 'back.out(1.35)', // overshoot эффект: -135 → -120
        delay: 0.65 // Небольшая задержка для плавности перехода
    });
}

// ========== СТРАНИЦА 2 - АНИМАЦИЯ ЦВЕТОВ (ПОСЛЕ ФОТО И БИЛЕТА) ==========
function animateFlowers() {
    const flowers = document.querySelector('.hero-flowers');
    const flowers2 = document.querySelector('.hero-flowers-2');
    const flowersBg = document.querySelector('.hero-flowers-bg');
    const allFlowers = [flowers, flowers2].filter(Boolean);

    if (!flowersBg && allFlowers.length === 0) return;

    const cardsDelay = 0.3 + 1.0 + 0.15;

    // Цветы 1 и 2
    if (allFlowers.length > 0) {
        gsap.set(allFlowers, { opacity: 0, y: 25, filter: 'blur(6px)' });
        if (!prefersReducedMotion) {
            gsap.to(allFlowers, {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.65,
                ease: 'power2.out',
                delay: cardsDelay
            });
        } else {
            gsap.set(allFlowers, { opacity: 1, y: 0, filter: 'blur(0px)' });
        }
    }

    // Цветы 3 (фон): та же анимация, с сохранением центрирования left: 50% + xPercent: -50
    if (flowersBg) {
        gsap.set(flowersBg, {
            opacity: 0,
            y: 25,
            filter: 'blur(6px)',
            left: '50%',
            xPercent: -50
        });
        if (!prefersReducedMotion) {
            gsap.to(flowersBg, {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.65,
                ease: 'power2.out',
                delay: cardsDelay,
                left: '50%',
                xPercent: -50
            });
        } else {
            gsap.set(flowersBg, { opacity: 1, y: 0, filter: 'blur(0px)' });
        }
    }
}

// ========== SCROLL АНИМАЦИИ ==========
function initScrollAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-fade');

    scrollElements.forEach((element) => {
        if (prefersReducedMotion) {
            gsap.set(element, { opacity: 1, y: 0 });
            return;
        }

        gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'top 50%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Анимация расписания по очереди
    const scheduleItems = document.querySelectorAll('.schedule-item');
    scheduleItems.forEach((item, index) => {
        if (prefersReducedMotion) {
            gsap.set(item, { opacity: 1, y: 0 });
            return;
        }

        gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            delay: 0.4 + index * 0.35
        });
    });

    // Начальное состояние расписания
    gsap.set(scheduleItems, {
        opacity: 0,
        y: 30
    });

    // Поочерёдное появление расписания 1, 2, 3 и шаров — только когда секция в зоне видимости
    const scheduleStack = document.querySelector('.schedule-stack');
    if (scheduleStack) {
        if (prefersReducedMotion) {
            scheduleStack.classList.add('animate-in');
        } else {
            ScrollTrigger.create({
                trigger: '.schedule-section',
                start: 'top 82%',
                onEnter: () => scheduleStack.classList.add('animate-in')
            });
        }
    }

    const paletteRow = document.querySelector('.dresscode-palette-row');
    if (paletteRow) {
        if (prefersReducedMotion) {
            paletteRow.classList.add('animate-in');
        } else {
            ScrollTrigger.create({
                trigger: '.dresscode-section',
                start: 'top 82%',
                onEnter: () => paletteRow.classList.add('animate-in')
            });
        }
    }
}

// ========== ТАЙМЕР ОБРАТНОГО ОТСЧЕТА (FlipDown) ==========
function initCountdown() {
    const flipdownEl = document.getElementById('flipdown');
    if (!flipdownEl || typeof FlipDown === 'undefined') return;

    const target = new Date(CONFIG.weddingDate);
    const unixSeconds = Math.floor(target.getTime() / 1000);

    new FlipDown(unixSeconds, 'flipdown', {
        theme: 'light',
        headings: ['дней', 'часов', 'минут', 'секунд'],
    }).start();
}

// ========== КНОПКА КАРТЫ ==========
function initMapButton() {
    const mapButton = document.getElementById('mapButton');
    if (mapButton && CONFIG.mapUrl) {
        mapButton.addEventListener('click', () => {
            window.open(CONFIG.mapUrl, '_blank');
        });
    }
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener('DOMContentLoaded', () => {
    // Запуск анимации появления конверта при загрузке страницы
    animateEnvelope();
    
    // Запуск анимации карточек после небольшой задержки
    setTimeout(() => {
        animateCards();
    }, 300);
    
    // Цветы появляются последними, после фото и билета
    animateFlowers();
    
    // Инициализация остальных функций
    initScrollAnimations();
    initCountdown();
    initMapButton();
});

// Обработка изменения размера окна
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});
