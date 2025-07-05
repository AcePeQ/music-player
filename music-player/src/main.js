"use sctrict";

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
    src: "forest-lullaby-110624",
    img: "/cover-2.jpg",
  },
];

let currentSongIndex = 0;
let audio = new Audio(songs[0].src);

function secondsToMs(duration) {
  duration = Number(duration);

  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor((duration % 3600) % 60);

  const songTime =
    minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart();
  return songTime;
}

function updateUI() {
  const currentSong = songs[currentSongIndex];

  const songImage = document.querySelector("#song_image");
  const authorCaption = document.querySelector("#song_author");
  const songNameCaption = document.querySelector("#song_name");
  const songTimeText = document.querySelector("#song_time");

  authorCaption.textContent = currentSong.author;
  songNameCaption.textContent = currentSong.title;

  songImage.setAttribute("src", currentSong.img);
  songImage.setAttribute(
    "alt",
    `poster of ${currentSong.author} song: ${currentSong.title}`
  );

  const songDuration = secondsToMs(audio.duration);
  songTimeText.textContent = songDuration;
}

function updateProgressBar() {}

audio.addEventListener("loadedmetadata", () => {
  console.log(audio);
  updateUI();
});
