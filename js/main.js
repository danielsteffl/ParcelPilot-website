const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileToggle && mobileMenu) {
    const closeMobileMenu = () => {
        mobileMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.setAttribute('aria-label', 'Open menu');
    };

    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const isExpanded = mobileMenu.classList.contains('active');
        mobileToggle.setAttribute('aria-expanded', String(isExpanded));
        mobileToggle.setAttribute('aria-label', isExpanded ? 'Close menu' : 'Open menu');
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) closeMobileMenu();
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMobileMenu);
    });
}