//Mobile navigation
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

//Theme switcher
const themeSwither = document.querySelectorAll('.theme__switch-slider'),
  themeChecker = document.querySelectorAll('.theme__switch-toggle');

const setTheme = (themeName) => {
  localStorage.setItem('theme', themeName);
  document.documentElement.className = themeName;
  if (themeName == 'theme-dark') {
    themeChecker.forEach((el) => {
      el.setAttribute('checked', 'checked');
    });
  } else {
    themeChecker.forEach((el) => {
      el.removeAttribute('checked');
    });
  }
};

const toggleTheme = () => {
  if (localStorage.getItem('theme') === 'theme-dark') {
    setTheme('theme-light');
  } else {
    setTheme('theme-dark');
  }
};

(function () {
  if (localStorage.getItem('theme') === 'theme-dark') {
    setTheme('theme-dark');
  } else {
    setTheme('theme-light');
  }
})();

['click', 'touchend'].forEach((ev) => {
  themeSwither.forEach((el) => {
    el.addEventListener(ev, toggleTheme);
  });
});
