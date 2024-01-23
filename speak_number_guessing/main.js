;(() => {
  const message = {
    win: 'Congrats! You have guessed the number!',
    invalid: 'That is not a valid number',
    outOfRange: 'Number must be between 1 and 100',
    lower: 'GO LOWER',
    higher: 'GO HIGHER'
  }
  const msgDOM = document.querySelector('#msg');

  const randomNum = getRandomNumber();

  const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  // TODO: getRandomNumber
  function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  // TODO: writeMsg
  function writeMsg(target, msg) {
    target.innerHTML = `<div class="fz-1">You said:</div>
    <span class="guess">${msg}</span>`;
  }

  // TODO: checkNumber
  function checkNumber(msg) {
    const range = document.createRange();
    const num = +msg;

    if (isNaN(num)) {
      const fragment = range.createContextualFragment(`<div class="fz-1 mb-4">${message.invalid}</div>`);
      msgDOM.appendChild(fragment);
      return;
    }

    if (num > 100 || num < 1) {
      const fragment = range.createContextualFragment(`<div class="fz-1 mb-4">${message.outOfRange}</div>`);
      msgDOM.appendChild(fragment);
      return;
    }

    if (num < randomNum) {
      const fragment = range.createContextualFragment(`<div class="fz-1 mb-4">${message.higher}</div>`);
      msgDOM.appendChild(fragment);
      return;
    } else if (num > randomNum) {
      const fragment = range.createContextualFragment(`<div class="fz-1 mb-4">${message.lower}</div>`);
      msgDOM.appendChild(fragment);
      return;
    } else {
      document.body.innerHTML = `<p class="fz-2 mb-4">${message.win}</p><p class="fz-1 mb-8">It was ${randomNum}</p><button class="play-again" type="button">Play Again</button>`;
    }
  }

  // TODO: onUserSpeak
  function onUserSpeak(e) {
    console.log(e.results[0][0].transcript);
    const userSpeech = e.results[0][0].transcript;
    writeMsg(msgDOM, userSpeech);
    checkNumber(userSpeech);
  }

  function onPlayAgainBtnClick(e) {
    const el = e.target;

    if (el.nodeName !== 'BUTTON') return;

    window.location.reload();
  }

  function bindEvent() {
    recognition.addEventListener('result', onUserSpeak);
    recognition.addEventListener('end', () => recognition.start());

    document.body.addEventListener('click', onPlayAgainBtnClick);
  }

  function init() {
    bindEvent();
    recognition.start();

  }

  init();
})()
