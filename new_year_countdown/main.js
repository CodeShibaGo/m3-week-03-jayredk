;(() => {
  const days = document.querySelector('#days');
  const hours = document.querySelector('#hours');
  const minutes = document.querySelector('#minutes');
  const seconds = document.querySelector('#seconds');
  const year = document.querySelector('.year')

  function showCountdown() {
    const loading = document.querySelector('#loading');
    const countdown = document.querySelector('#countdown');

    setTimeout(() => {
      loading.remove();
      countdown.style.display = 'flex';

    }, 1000);
  }

  function updateTime() {
    const currentYear = new Date().getFullYear();
    const newYear = new Date(currentYear + 1, 0, 1);

    year.textContent = newYear.getFullYear();

    const currentTime = Date.now();
    const timeDiff = newYear - currentTime;

    const day = Math.floor(timeDiff / 1000 / 60 / 60 / 24);
    const hour = Math.floor(timeDiff / 1000 / 60 / 60) % 24;
    const minute = Math.floor(timeDiff / 1000 / 60) % 60;
    const second = Math.floor(timeDiff / 1000) % 60;
    
    days.textContent = day >= 10 ? day : `0${day}`;
    hours.textContent = hour >= 10 ? hour : `0${hour}`;
    minutes.textContent = minute >= 10 ? minute : `0${minute}`;
    seconds.textContent = second >= 10 ? second : `0${second}`;
  }

  function init() {
    showCountdown();

    setInterval(updateTime, 1000);
  }

  init();
})()