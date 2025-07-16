const songs = ['song1.mp3', 'song2.mp3', 'song3.mp3'];
const songTitles = ['Sapphire', 'Beautiful', 'Gulabi Aakhein'];
const covers = ['cover1.jpg', 'cover2.jpg', 'cover3.jpg'];
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

let currentSong = 0;
let isShuffle = false;
let shuffledOrder = [...Array(songs.length).keys()];

const audio = document.getElementById('audio');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const shuffleBtn = document.getElementById('shuffle');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const themeBtn = document.getElementById('themeBtn');
const body = document.body;

function loadSong(index) {
    const songIndex = isShuffle ? shuffledOrder[index] : index;
    title.innerText = songTitles[songIndex];
    audio.src = `songs/${songs[songIndex]}`;
    cover.src = `songs/${covers[songIndex]}` || 'songs/cover.jpg';;
}

function playSong() {
    audio.play();
    playBtn.innerText = '⏸️';
}

function pauseSong() {
    audio.pause();
    playBtn.innerText = '▶️';
}

function togglePlay() {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
}

function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    playSong();
}

function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    playSong();
}

function updateProgress() {
    const { duration, currentTime } = audio;

    if (!isNaN(duration)) {
        const percent = (currentTime / duration) * 100;
        progress.style.width = `${percent}%`;

        currentTimeEl.innerText = formatTime(currentTime);
        durationEl.innerText = formatTime(duration);
    }
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

audio.addEventListener('loadedmetadata', () => {
    durationEl.innerText = formatTime(audio.duration);
});

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function toggleTheme() {
    body.classList.toggle('light-theme');
    body.classList.toggle('dark-theme');
    themeBtn.innerText = body.classList.contains('light-theme') ? '☀️' : '🌙';
}

function toggleShuffle() {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active', isShuffle);
    if (isShuffle) {
        shuffledOrder = [...Array(songs.length).keys()].sort(() => Math.random() - 0.5);
        currentSong = 0;
    } else {
        currentSong = 0;
    }
    loadSong(currentSong);
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);
themeBtn.addEventListener('click', toggleTheme);
shuffleBtn.addEventListener('click', toggleShuffle);

loadSong(currentSong);
