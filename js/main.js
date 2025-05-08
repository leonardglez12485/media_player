//--Lista de Reproduccion 

const songList = [{
        title: "El de la Cornetica",
        file: "el_de_la_cornetica.mp3",
        cover: "1.png"
    },
    {
        title: "Broken",
        file: "broken.mp3",
        cover: "2.jpeg"
    },
]

//Cancion actual
let actualSong = null;

//Captar elementos del DOM para JS
const songs = document.getElementById("songs");
const aud = document.getElementById("audio");
const cov = document.getElementById("cover");
const titulo = document.getElementById("title");
const prev = document.getElementById("prev");
const play = document.getElementById("play");
const next = document.getElementById("next");
const progress = document.getElementById("progress");
const progressbar = document.getElementById("progress-bar");
progressbar.addEventListener("click", setProgress);

//Escuchar click en los controles
play.addEventListener("click", () => {
    if (aud.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

//Escuchar el elemento AUDIO
aud.addEventListener("timeupdate", updateProgressBar);

prev.addEventListener("click", () => prevSong());
next.addEventListener("click", () => nextSong());

//Cargar canciones y mostrar el listado
function loadSongs() {
    songList.forEach((song, index) => {

        //Crear li
        const li = document.createElement("li");

        //Crear a
        const link = document.createElement("a");

        //Refrescar a
        link.textContent = song.title;
        link.href = "#";

        //Escuchar Clicks
        link.addEventListener("click", () => ldSong(index));

        //Añadir a li
        li.appendChild(link)

        //Añadir li a ul
        songs.appendChild(li)

    })
}

//Cargar Cancion clickeada
function ldSong(songIndex) {
    if (actualSong != songIndex) {
        actualSong = songIndex
        aud.src = "./audio/" + songList[songIndex].file;
        changeCover(songIndex);
        changeTitle(songIndex);
        aud.play();
        playSong();
        chageActiveClass();

    }
}


//Actualizar controles
function updateControls() {
    if (aud.paused) {
        play.classList.remove("fa-pause")
        play.classList.add("fa-play")
    } else {
        play.classList.remove("fa-play")
        play.classList.add("fa-pause")
    }
}

//Reproducir
function playSong() {
    if (actualSong != null) {
        aud.play();
        updateControls();
    }
}

//Pausar
function pauseSong() {

    aud.pause();
    updateControls();
}

//Anterior Cancion 
function prevSong() {
    if (actualSong > 0) {
        ldSong(actualSong - 1)
    } else {
        ldSong(songList.length - 1);
    }

}

//Siguiente cancion 
function nextSong() {
    if (actualSong < songList.length - 1) {
        ldSong(actualSong + 1)
    } else {
        ldSong(0);
    }

}

//Cambiar la clase activa 
function chageActiveClass() {
    const link = document.querySelectorAll("a");
    songList.forEach((song, index) => {
        link[index].classList.remove("active");
    })
    link[actualSong].classList.add("active");


}

//Cambiar el cover al reproducir la cancion
function changeCover(songIndex) {
    cov.src = "./img/" + songList[songIndex].cover;
}

//Cambiar el titulo de la cancion al reproducirla 
function changeTitle(songIndex) {
    titulo.innerText = songList[songIndex].title;
}

//Actualizar barra de Progreso 
function updateProgressBar(event) {
    const { duration, currentTime } = event.srcElement
    const percent = (currentTime / duration) * 100;
    progress.style.width = percent + "%"
}


//Hacer Barra de Progreso Clicable
function setProgress(event) {
    const totalWhidt = this.offsetWidth;
    const progressWhidt = event.offsetX;
    const current = (progressWhidt / totalWhidt) * aud.duration;
    aud.currentTime = current;

}

//Lanzar siguente cancion cuando termina la q esta reproduciendo 
aud.addEventListener("ended", () => nextSong());


//Inicio del Programa 
loadSongs();