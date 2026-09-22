// Elite Dubai Real Estate Interactive Functions

document.addEventListener('DOMContentLoaded', () => {
    console.log('Elite Dubai Real Estate application initialized');

    // 1. Category Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const propertyCards = document.querySelectorAll('.property-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');

            // Update active state of buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter cards
            propertyCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 2. Search Bar Action
    const btnSearch = document.getElementById('btn-search');
    if (btnSearch) {
        btnSearch.addEventListener('click', () => {
            const typeSelect = document.getElementById('filter-type').value;
            const propertiesSection = document.getElementById('properties');
            
            // Scroll smoothly to properties section
            propertiesSection.scrollIntoView({ behavior: 'smooth' });

            // Activate corresponding tab if matching
            if (typeSelect !== 'all') {
                const targetTab = document.querySelector(`.filter-btn[data-category="${typeSelect}"]`);
                if (targetTab) {
                    targetTab.click();
                }
            } else {
                const allTab = document.querySelector('.filter-btn[data-category="all"]');
                if (allTab) allTab.click();
            }
        });
    }

    // 3. Navbar scroll highlight
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let fromTop = window.scrollY + 150;

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
