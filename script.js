const hamburger = document.querySelector('.header__hamburger'),
  openHamburger = hamburger.querySelector('.header__hamburger-open'),
  closeHamburger = hamburger.querySelector('.header__hamburger-close'),
  mobileMenu = document.querySelector('.header__mobile'),
  mobileMenuLinks = mobileMenu.querySelectorAll('.header__mobile-link');

const toggleMenu = (action) => {
  if (action == 'open') {
    mobileMenu.classList.add('header__mobile-active');
    openHamburger.classList.add('d-none');
    closeHamburger.classList.remove('d-none');
  } else {
    mobileMenu.classList.remove('header__mobile-active');
    openHamburger.classList.remove('d-none');
    closeHamburger.classList.add('d-none');
  }
};

hamburger.addEventListener('click', () => {
  mobileMenu.classList.contains('header__mobile-active') ? toggleMenu() : toggleMenu('open');
});

mobileMenuLinks.forEach((item) => {
  item.addEventListener('click', () => {
    toggleMenu();
  });
});
