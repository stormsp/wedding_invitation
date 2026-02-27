// Проверка поддержки reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ========== СТРАНИЦА 1 - АНИМАЦИЯ ЗАГРУЗКИ ==========
document.addEventListener('DOMContentLoaded', () => {
    const titleImage = document.querySelector('.title-image');
    const envelope = document.getElementById('envelope');
    const seal = document.querySelector('.seal');
    const decorIV = document.querySelector('.decor-iv-overlay');
    const hint = document.getElementById('hint');
    const envelopeContainer = document.querySelector('.envelope-container');

    // Начальное состояние заголовка (fade-in с blur, без движения)
    if (titleImage) {
        gsap.set(titleImage, {
            opacity: 0,
            filter: 'blur(6px)'
        });
    }

    // Начальное состояние конверта и печатки
    gsap.set([envelope, seal], {
        opacity: 0,
        y: 40,
        filter: 'blur(6px)'
    });
    
    if (decorIV) {
        gsap.set(decorIV, {
            opacity: 0,
            y: 40,
            filter: 'blur(6px)'
        });
    }

    // Начальное состояние подсказки
    gsap.set(hint, {
        opacity: 0
    });

    // Анимация появления конверта, печатки и декоративного элемента вместе
    if (!prefersReducedMotion) {
        // Анимация появления заголовка (fade-in с blur, без движения)
        if (titleImage) {
            gsap.to(titleImage, {
                opacity: 1,
                filter: 'blur(0px)',
                duration: 1,
                ease: 'power2.out'
            });
        }

        // Анимация конверта и печатки вместе
        gsap.to([envelope, seal], {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power2.out',
            onComplete: () => {
                // Убираем inline transform от GSAP, чтобы применились стили из CSS
                if (seal) {
                    gsap.set(seal, { clearProps: 'transform' });
                    seal.classList.add('seal-rotating');
                }
            }
        });
        
        // Анимация декоративного элемента ИВ одновременно с конвертом (без задержки)
        if (decorIV) {
            gsap.to(decorIV, {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 1,
                ease: 'power2.out',
                delay: 0 // Без задержки - одновременно
            });
        }

        // Анимация появления подсказки с задержкой
        gsap.to(hint, {
            opacity: 1,
            duration: 0.6,
            delay: 0.4,
            ease: 'power2.out'
        });
    } else {
        if (titleImage) {
            gsap.set(titleImage, { opacity: 1, filter: 'blur(0px)' });
        }
        gsap.set([envelope, seal, decorIV, hint], {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)'
        });
        if (seal) {
            gsap.set(seal, { clearProps: 'transform' });
        }
    }

    // Обработчик клика на конверт
    let isClicked = false;
    envelopeContainer.addEventListener('click', () => {
        if (isClicked) return;
        isClicked = true;

        // Мгновенный переход на основную страницу
        window.location.href = 'main.html';
    });
});

