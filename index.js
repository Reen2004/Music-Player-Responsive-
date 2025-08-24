const songs = [
  {
    title: "Kiss And Tell - Itzy",
    file: "song1.mp3",
    img: "img/itzy.jpeg"
  },
  {
    title: "Snow At The Beach - Taylor Swift\nft. Lana Del Ray",
    file: "song2.mp3",
    img: "img/taylor.jpeg"
  },
  {
    title: "Style - Taylor Swift",
    file: "song3.mp3",
    img: "img/style.jpeg"
  },
  {
    title: "Blue - Yung Kai",
    file: "song4.mp3",
    img: "img/yung.jpeg"
  },
  {
    title: "Jump - Blackpink",
    file: "song5.mp3",
    img: "img/bp.jpeg"
  }
];


let currentIndex = 0;
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const songTitle = document.getElementById("song-title");

const progressContainer = document.querySelector(".progress-container");
const progress = document.getElementById("progress");


function loadSong(index) {
  audio.src = songs[index].file;
  songTitle.textContent = songs[index].title; 
}

playBtn.addEventListener("click", () => {
  audio.play();
  playBtn.style.display = "none";
  pauseBtn.style.display = "inline";
});

pauseBtn.addEventListener("click", () => {
  audio.pause();
  pauseBtn.style.display = "none";
  playBtn.style.display = "inline";
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  audio.play();
  playBtn.style.display = "none";
  pauseBtn.style.display = "inline";
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
  audio.play();
  playBtn.style.display = "none";
  pauseBtn.style.display = "inline";
});

document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    e.preventDefault();

    if (audio.paused) {
      audio.play();
      playBtn.style.display = "none";
      pauseBtn.style.display = "inline";
      
    } else {
      audio.pause();
      playBtn.style.display = "inline";
      pauseBtn.style.display = "none";
    }
  
  } else if (e.code === "ArrowRight") {
    nextBtn.click();
  
  } else if (e.code === "ArrowLeft") {
    prevBtn.click();
  }
});



audio.addEventListener("timeupdate", updateProgress);

function updateProgress() {
  const duration = audio.duration;
  const currentTime = audio.currentTime;

  const percent = (currentTime / duration) * 100;

  progress.style.width = percent + "%";

  document.getElementById("current-time").textContent = formatTime(currentTime);
  document.getElementById("duration").textContent = formatTime(duration);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);       
  const secs = Math.floor(seconds % 60);       

  
  if (secs < 10) {
    return mins + ":0" + secs;
  } else {
    return mins + ":" + secs;
  }
}

audio.addEventListener("loadedmetadata", function() {
  document.getElementById("duration").textContent = formatTime(audio.duration);
});

audio.addEventListener("ended", function() {
  nextBtn.click(); 
});


progressContainer.addEventListener("click", setProgress);

function setProgress(e) {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

function loadSong(index) {
  audio.src = "music/" + songs[index].file;
  songTitle.textContent = songs[index].title;
  document.getElementById("album-art").src = songs[index].img;
}


loadSong(currentIndex);