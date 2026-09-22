// Elite Dubai Real Estate — High-End Scroll & Interactive Effects

document.addEventListener('DOMContentLoaded', () => {
    console.log('Elite Dubai Real Estate animations & interactions ready');

    // 1. Scroll Progress Bar & Header Shrink & Back-to-Top Button Visibility
    const scrollProgress = document.getElementById('scroll-progress');
    const header = document.getElementById('header');
    const btnBackToTop = document.getElementById('btn-back-to-top');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        // Progress bar width update
        if (scrollProgress) {
            scrollProgress.style.width = `${scrollPercent}%`;
        }

        // Header glass shrink
        if (scrollTop > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (scrollTop > 400) {
            btnBackToTop.classList.add('visible');
        } else {
            btnBackToTop.classList.remove('visible');
        }
    });

    if (btnBackToTop) {
        btnBackToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 2. IntersectionObserver for Reveal Animations on Scroll
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: unobserve after reveal
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Stats Number Count-Up Animation
    let statsAnimated = false;
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                animateStatsNumbers();
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    function animateStatsNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const targetVal = parseFloat(stat.getAttribute('data-target'));
            let currentVal = 0;
            const duration = 2000;
            const stepTime = 30;
            const steps = duration / stepTime;
            const increment = targetVal / steps;

            const timer = setInterval(() => {
                currentVal += increment;
                if (currentVal >= targetVal) {
                    currentVal = targetVal;
                    clearInterval(timer);
                }

                if (stat.textContent.includes('$')) {
                    stat.textContent = `$${currentVal.toFixed(1)}B+`;
                } else if (stat.textContent.includes('Yrs')) {
                    stat.textContent = `${Math.floor(currentVal)} Yrs`;
                } else {
                    stat.textContent = `${Math.floor(currentVal)}%`;
                }
            }, stepTime);
        });
    }

    // 4. 3D Tilt Effect on Property Cards
    const propertyCards = document.querySelectorAll('.property-card');
    propertyCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    // 5. Category Filter Functionality
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            propertyCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.classList.add('is-visible');
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 6. Hero Search Bar Linkage
    const btnSearch = document.getElementById('btn-search');
    if (btnSearch) {
        btnSearch.addEventListener('click', () => {
            const typeSelect = document.getElementById('filter-type').value;
            const propertiesSection = document.getElementById('properties');
            
            propertiesSection.scrollIntoView({ behavior: 'smooth' });

            if (typeSelect !== 'all') {
                const targetTab = document.querySelector(`.filter-btn[data-category="${typeSelect}"]`);
                if (targetTab) targetTab.click();
            } else {
                const allTab = document.querySelector('.filter-btn[data-category="all"]');
                if (allTab) allTab.click();
            }
        });
    }

    // 7. Navbar Active Highlight on Scroll
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let fromTop = window.scrollY + 180;

        navLinks.forEach(link => {
            let section = document.querySelector(link.hash);
            if (section) {
                if (
                    section.offsetTop <= fromTop &&
                    section.offsetTop + section.offsetHeight > fromTop
                ) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });
});
