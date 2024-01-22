;(() => {
  const music = ['energy', 'inspire', 'smallguitar'];

  let musicIndex = 0;

  // TODO: loadSong
  function loadSong(song) {
    const audio = document.querySelector('audio');
    const cover = document.querySelector('.img-cover');
    const title = document.querySelector('.music-title');

    audio.setAttribute('src', `music/${song}.mp3`);
    cover.setAttribute('src', `images/${song}.jpg`);
    title.textContent = song;
  }

  // TODO: playSong
  function playSong() {
    const audio = document.querySelector('audio');
    const playBtn = document.querySelector('#play-btn');
    const container = document.querySelector('.music-container');

    container.classList.add('play');
    audio.play();
    playBtn.children[0].className = 'fas fa-pause';
  }

  // TODO: pauseSong
  function pauseSong() {
    const audio = document.querySelector('audio');
    const playBtn = document.querySelector('#play-btn');
    const container = document.querySelector('.music-container');

    container.classList.remove('play');
    audio.pause();
    playBtn.children[0].className = 'fas fa-play';
  }

  // TODO: nextSong
  function nextSong() {
    musicIndex++;

    if (musicIndex > music.length - 1) {
      musicIndex = 0;
    }

    loadSong(music[musicIndex]);
    playSong();
  }

  // TODO: prevSong
  function prevSong() {
    musicIndex--;

    if (musicIndex < 0) {
      musicIndex = music.length - 1;
    }

    loadSong(music[musicIndex]);
    playSong();
  }

  // TODO: onProgressUpdate
  function onProgressUpdate() {
    const progress = document.querySelector('.progress');
    const audio = document.querySelector('audio');
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const percentage = (currentTime / duration) * 100;

    progress.style.width = `${percentage}%`;
  }

  // TODO: onProgressChange
  function onProgressChange(e) {
    const audio = document.querySelector('audio');
    const width = document.querySelector('.progress-container').clientWidth;
    const duration = audio.duration;
    const offset = e.offsetX;
    console.log(offset, width, duration);
    const percentage = (offset / width) * duration;
    audio.currentTime = percentage;
  }

  function onNavigationClick(e) {
    const el = e.target;
    if (el.nodeName !== 'I') return;

    switch (el.classList[1]) {
      case "fa-backward":
        prevSong();
        break;
      case "fa-forward":
        nextSong();
        break;
      case "fa-play":
        playSong();
        break;
      case "fa-pause":
        pauseSong();
        break;
      default:
        break;
    }
  }

  // TODO: onMusicEnd
  function onMusicEnd() {
    nextSong();
  }

  function bindEvent() {
    const navigation = document.querySelector('.navigation');

    navigation.addEventListener('click', onNavigationClick);

    const audio = document.querySelector('audio');

    audio.addEventListener('timeupdate', onProgressUpdate);
    audio.addEventListener('ended', onMusicEnd);

    const container = document.querySelector('.progress-container');

    container.addEventListener('click', onProgressChange);
  }

  function init() {
    bindEvent();

    loadSong(music[musicIndex]);
  }

  init()
})()
