'use strict';
'use esversion: 8';

const hamburger = document.querySelector('.header__hamburger'),
  openHamburger = hamburger.querySelector('.header__hamburger-open'),
  closeHamburger = hamburger.querySelector('.header__hamburger-close'),
  mobileMenu = document.querySelector('.header__menu'),
  mobileMenuLink = mobileMenu.querySelectorAll('.header__menu-link');

const toggleMenu = (action) => {
  if (action == 'open') {
    mobileMenu.classList.add('header__menu-active');
    openHamburger.classList.add('d-none');
    closeHamburger.classList.remove('d-none');
  } else {
    mobileMenu.classList.remove('header__menu-active');
    openHamburger.classList.remove('d-none');
    closeHamburger.classList.add('d-none');
  }
};

hamburger.addEventListener('click', () => {
  mobileMenu.classList.contains('header__menu-active')
    ? toggleMenu()
    : toggleMenu('open');
});

mobileMenuLink.forEach((link) => {
  link.addEventListener('click', toggleMenu);
});

const themeSwither = document.querySelector('.theme__switch-slider'),
  themeChecker = document.querySelector('.theme__switch-toggle');

const setTheme = (themeName) => {
  localStorage.setItem('theme', themeName);
  document.documentElement.className = themeName;
  themeName === 'theme-dark'
    ? themeChecker.setAttribute('checked', 'checked')
    : themeChecker.removeAttribute('checked');
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

themeSwither.addEventListener('click', toggleTheme);

function validateInput(e, field, messageContainer) {
  const MINLEN = 2;
  const MAXLEN = 90;

  const messages = {
    startWith: 'This field should start with a letter',
    minSymbols: `This field should be min ${MINLEN} symbols long`,
    maxSymbols: `This field should be max ${MAXLEN} symbols long`,
    required: 'This field is required',
  };

  function isLetter(str) {
    return /^[A-Za-zА-Яа-я]+$/.test(str);
  }
  function clearError(errorContainer) {
    errorContainer.textContent = '';
  }

  if (field.value.length === 0) {
    clearError(messageContainer);
  } else if (!isLetter(field.value[0])) {
    messageContainer.textContent = messages.startWith;
  } else if (field.value.length < MINLEN) {
    messageContainer.textContent = messages.minSymbols;
  } else if (field.value.length > MAXLEN) {
    messageContainer.textContent = messages.maxSymbols;
  } else {
    clearError(messageContainer);
  }
}

const inputs = document.querySelectorAll('form input, form textarea');

inputs.forEach((inputElement) => {
  const spanToShowMessage = document.createElement('span');
  spanToShowMessage.classList.add('contact__form-error-message');
  inputElement.parentNode.insertBefore(
    spanToShowMessage,
    inputElement.nextSibling
  );

  inputElement.addEventListener('input', (e) => {
    validateInput(e, inputElement, spanToShowMessage);
  });
});

async function submitForm(event) {
  event.preventDefault();
  try {
    const response = await fetch(event.target.action, {
      method: 'POST',
      body: new FormData(event.target),
    });

    if (!response.ok) throw `Server Error: ${response.status}`;

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw 'Type error: not JSON';
    }

    const json = await response.json();
    if (json.result === 'success') {
      alert(json.info);
      document
        .querySelectorAll('#form input, #form textarea')
        .forEach((inputField) => (inputField.value = ''));
    } else {
      console.log(json);
      throw json.info;
    }
  } catch (error) {
    alert(error);
  }
}

console.log(String.raw`
 _     _   _    _______   _     _   ______   ______   ______    
| |   | | | |  |__   __| | |   | | |  ____| |  __  | |  ____|   
| |___| | | |     | |    | |___| | | |__    | |__| | | |__      
|  ___  | | |     | |    |  ___  | |  __|   |  ____| |  __|     
| |   | | | |     | |    | |   | | | |____  | | \ \  | |____    
|_|   |_| |_|     |_|    |_|   |_| |______| |_|  \_\ |______|   
                                                               `);
