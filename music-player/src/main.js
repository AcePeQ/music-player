"use strict";

const songs = [
  {
    title: "Lost in the City Lights",
    author: "Cosmo Sheldrake",
    src: "/lost-in-city-lights-145038.mp3",
    img: "/cover-1.jpg",
  },
  {
    title: "Forest Lullaby",
    author: "Lesfm",
    src: "forest-lullaby-110624.mp3",
    img: "/cover-2.jpg",
  },
];

let currentSongIndex = 0;
let audio = new Audio();

const buttonPlayPause = document.getElementById("button_play");
const buttonPlayPauseImage = document.getElementById("playPauseImage");
const songCurrentTimeText = document.querySelector("#song_time_current");
const progressBar = document.getElementById("song_progress_bar");

document
  .getElementById("button_prev")
  .addEventListener("click", () => handleChangeSong(-1));
document
  .getElementById("button_next")
  .addEventListener("click", () => handleChangeSong(1));

buttonPlayPause.addEventListener("click", playPause);
progressBar.addEventListener("click", handleProgressBarClick);

function secondsToMs(duration) {
  duration = Number(duration);

  if (duration === 0) return "00:00";

  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor((duration % 3600) % 60);

  const songTime =
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");
  return songTime;
}

function handleChangeSong(changeNumber) {
  if (changeNumber === -1 && currentSongIndex === 0) return;
  if (changeNumber === 1 && currentSongIndex === songs.length - 1) return;

  if (!audio.paused) audio.pause();

  currentSongIndex += changeNumber;

  loadSong();
}

function handleProgressBarClick(e) {
  const x = e.pageX - this.offsetLeft;
  const clickedValue = (x * this.max) / this.offsetWidth;

  audio.currentTime = clickedValue;
}

function updateProgressBar() {
  if (audio.ended) {
    progressBar.setAttribute("value", 0);
    songCurrentTimeText.textContent = secondsToMs(0);
    buttonPlayPauseImage.setAttribute("src", "/Play_fill.svg");
    return;
  }

  progressBar.setAttribute("value", audio.currentTime);
  songCurrentTimeText.textContent = secondsToMs(audio.currentTime);
}

function updateUI() {
  const currentSong = songs[currentSongIndex];
  audio.src = currentSong.src;

  document.querySelector("#song_author").textContent = currentSong.author;
  document.querySelector("#song_name").textContent = currentSong.title;

  const songImage = document.querySelector("#song_image");
  songImage.setAttribute("src", currentSong.img);
  songImage.setAttribute(
    "alt",
    `poster of ${currentSong.author} song: ${currentSong.title}`
  );
  buttonPlayPauseImage.setAttribute("src", "/Play_fill.svg");
}

function onLoadedAudioData() {
  document.querySelector("#song_time").textContent = secondsToMs(
    audio.duration
  );
  songCurrentTimeText.textContent = secondsToMs(audio.currentTime);

  progressBar.setAttribute("max", audio.duration);
  progressBar.setAttribute("value", 0);

  audio.addEventListener("timeupdate", updateProgressBar);
}

function loadSong() {
  updateUI();
  audio.addEventListener("loadeddata", onLoadedAudioData);
}

async function playPause() {
  if (!audio.paused) {
    audio.pause();
    buttonPlayPauseImage.setAttribute("src", "/Play_fill.svg");

    return;
  }

  await audio.play();
  buttonPlayPauseImage.setAttribute("src", "/Pause_fill.svg");
}

loadSong();
