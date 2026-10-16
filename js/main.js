(function () {
  'use strict';

  /* Ano do rodapé */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* Destaca no menu a seção visível */
  var links = document.querySelectorAll('nav a[href^="#"]');
  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && byId[e.target.id]) {
          links.forEach(function (a) { a.classList.remove('on'); });
          byId[e.target.id].classList.add('on');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) io.observe(s);
    });
  }

  /* Copiar e-mail com confirmação */
  var btn = document.getElementById('copy');
  var status = document.getElementById('status');
  var email = 'fluan030@gmail.com';
  btn.addEventListener('click', function () {
    var done = function (msg) {
      status.textContent = msg;
      setTimeout(function () { status.textContent = ''; }, 3000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(
        function () { done('E-mail copiado.'); },
        function () { done('Não foi possível copiar. Use: ' + email); }
      );
    } else {
      done('Copie manualmente: ' + email);
    }
  });
})();
