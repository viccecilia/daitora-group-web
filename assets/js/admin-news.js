'use strict';

document.querySelectorAll('[data-confirm-delete]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    if (!window.confirm('このニュースを削除しますか？')) event.preventDefault();
  });
});
