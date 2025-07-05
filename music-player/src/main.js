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
let audio = new Audio(songs[0].src);

const buttonPlayPause = document.getElementById("button_play");
const buttonPlayPauseImage = document.getElementById("playPauseImage");
const songCurrentTimeText = document.querySelector("#song_time_current");

const progressBar = document.getElementById("song_progress_bar");

buttonPlayPause.addEventListener("click", playPause);
audio.addEventListener("timeupdate", updateProgressBar);

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

function updateUI() {
  const currentSong = songs[currentSongIndex];

  document.querySelector("#song_author").textContent = currentSong.author;
  document.querySelector("#song_name").textContent = currentSong.title;

  const songImage = document.querySelector("#song_image");
  songImage.setAttribute("src", currentSong.img);
  songImage.setAttribute(
    "alt",
    `poster of ${currentSong.author} song: ${currentSong.title}`
  );

  document.querySelector("#song_time").textContent = secondsToMs(
    audio.duration
  );
  songCurrentTimeText.textContent = secondsToMs(audio.currentTime);

  progressBar.setAttribute("max", audio.duration);
  progressBar.setAttribute("value", 0);
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

async function playPause() {
  const isAudioPaused = audio.paused;

  if (!isAudioPaused) {
    audio.pause();
    buttonPlayPauseImage.setAttribute("src", "/Play_fill.svg");

    return;
  }

  await audio.play();
  buttonPlayPauseImage.setAttribute("src", "/Pause_fill.svg");
}

audio.addEventListener("loadedmetadata", () => {
  updateUI();
});
