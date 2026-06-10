/**
 * Stackly - Login & Sign Up form validation
 */
(function () {
  'use strict';

  function setFieldError(group, hasError) {
    if (!group) return;
    group.classList.toggle('has-error', hasError);
    const input = group.querySelector('input');
    if (input) input.classList.toggle('input-error', hasError);
  }

  function initLoginForm() {
    const form = document.getElementById('login-form');
    if (!form) return;

    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      const email = emailInput.value.trim();
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        setFieldError(emailInput.closest('.form-group'), true);
        valid = false;
      } else {
        setFieldError(emailInput.closest('.form-group'), false);
      }

      if (!passwordInput.value) {
        setFieldError(passwordInput.closest('.form-group'), true);
        valid = false;
      } else {
        setFieldError(passwordInput.closest('.form-group'), false);
      }

      if (valid) {
        window.location.href = 'dashboard.html';
      }
    });

    [emailInput, passwordInput].forEach(function (input) {
      input.addEventListener('input', function () {
        setFieldError(input.closest('.form-group'), false);
      });
    });
  }

  function initSignupForm() {
    const form = document.getElementById('signup-form');
    if (!form) return;

    const nameInput = document.getElementById('signup-name');
    const emailInput = document.getElementById('signup-email');
    const phoneInput = document.getElementById('signup-phone');
    const passwordInput = document.getElementById('signup-password');
    const confirmInput = document.getElementById('signup-confirm');
    const termsInput = document.getElementById('signup-terms');
    const termsError = document.getElementById('terms-error');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      if (!nameInput.value.trim()) {
        setFieldError(nameInput.closest('.form-group'), true);
        valid = false;
      } else {
        setFieldError(nameInput.closest('.form-group'), false);
      }

      const email = emailInput.value.trim();
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        setFieldError(emailInput.closest('.form-group'), true);
        valid = false;
      } else {
        setFieldError(emailInput.closest('.form-group'), false);
      }

      const phone = phoneInput.value.replace(/\D/g, '');
      if (phone.length < 10) {
        setFieldError(phoneInput.closest('.form-group'), true);
        valid = false;
      } else {
        setFieldError(phoneInput.closest('.form-group'), false);
      }

      if (passwordInput.value.length < 8) {
        setFieldError(passwordInput.closest('.form-group'), true);
        valid = false;
      } else {
        setFieldError(passwordInput.closest('.form-group'), false);
      }

      if (passwordInput.value !== confirmInput.value) {
        setFieldError(confirmInput.closest('.form-group'), true);
        valid = false;
      } else {
        setFieldError(confirmInput.closest('.form-group'), false);
      }

      if (!termsInput.checked) {
        termsError.style.display = 'block';
        valid = false;
      } else {
        termsError.style.display = 'none';
      }

      if (valid) {
        window.location.href = 'dashboard.html';
      }
    });

    [nameInput, emailInput, phoneInput, passwordInput, confirmInput].forEach(function (input) {
      input.addEventListener('input', function () {
        setFieldError(input.closest('.form-group'), false);
      });
    });

    termsInput.addEventListener('change', function () {
      if (termsInput.checked) termsError.style.display = 'none';
    });
  }

  function initSocialButtons() {
    document.querySelectorAll('.btn-social').forEach(function (btn) {
      btn.addEventListener('click', function () {
        window.location.href = '404.html';
      });
    });
  }

  function init() {
    initLoginForm();
    initSignupForm();
    initSocialButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
