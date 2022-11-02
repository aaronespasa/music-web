const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const errorMessageContainer = document.getElementById("error-message-container");
const errorMessage = document.getElementById("error-message");
const signUpForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const navbarLinks = document.getElementById("navbar-links-container")
const selectImageInput = document.getElementById("input-file");
const selectImageButton = document.getElementById("select-image-button")
const profileName = document.getElementById("profile-title");
const profileData = document.getElementById("profile-body");
const profileOptions = document.getElementById("profile-options-container");

let now_playing = document.getElementsByClassName(".now-playing");
let track_art = document.getElementsByClassName(".track-art");
let track_name = document.getElementsByClassName(".track-name");
let track_artist = document.getElementsByClassName(".track-artist");
 
let playpause_btn = document.getElementsByClassName(".playpause-track");
let next_btn = document.getElementsByClassName(".next-track");
let prev_btn = document.getElementsByClassName(".prev-track");


// Specify globally used values
let isPlaying = false;
let updateTimer;
let iterator = 0; 

let curr_track = document.createElement('audio');

const USERNAME_MIN_LENGTH = 5;
const PASSWORD_MIN_LENGTH = 8;
const song_num = 14; // 0..14

const PLAYLISTS = ["Rock", "Pop", "Hip Hop"]

const TRACKS = [
    {
        "playlist": "Rock",
        "title": "Rise and Fall",
        "artist": "The Offspring",
        "cover": "song-cover.jpg",
        "audio": "./audios/song.mp3"
    },
    {
        "playlist": "Rock",
        "title": "Under My Thumb",
        "artist": "The Rolling Stones",
        "cover": "under-my-thumb.jpeg",
        "audio": "./audios/song.mp3"
    },
    {
        "playlist": "Rock",
        "title": "Sweet Child O'Mine",
        "artist": "Guns N'Roses",
        "cover": "sweet-child-o-mine.jpeg",
        "audio": "./audios/song.mp3"
    },
    {
        "playlist": "Rock",
        "title": "Highway To Hell",
        "artist": "AC/DC",
        "cover": "highway-to-hell.jpeg",
        "audio": "./audios/song.mp3"
    },
    {
        "playlist": "Rock",
        "title": "Seven Nation Army",
        "artist": "The White Stripes",
        "cover": "seven-nation-army.jpeg",
        "audio": "./audios/song.mp3"
    },
    {
        "playlist": "Pop",
        "title": "Dynamite",
        "artist": "Taio Cruz",
        "cover": "dynamite.jpeg",
        "audio": "./audios/song.mp3"
    },
    {
        "playlist": "Pop",
        "title": "Titanium",
        "artist": "David Guetta",
        "cover": "titanium.webp",
        "audio": "./audios/song.mp3"
    },
    {
        "playlist": "Pop",
        "title": "Believer",
        "artist": "Imagine Dragons",
        "cover": "believer.jpeg",
        "audio": "./audios/song.mp3"
    },
    {
        "playlist": "Pop",
        "title": "Pompeii",
        "artist": "Bastille",
        "cover": "pompeii.jpeg",
        "audio": "./audios/song.mp3"
    },
    {
        "playlist": "Pop",
        "title": "God's Plan",
        "artist": "Drake",
        "cover": "gods-plan.jpeg",
        "audio": "./audios/song.mp3"
    },
    {
        "playlist": "Hip Hop",
        "title": "Still D.R.E.",
        "artist": "Dr. Dre, Snoop Dogg",
        "cover": "still-dre.jpeg",
        "audio": "./audios/song.mp3"
    },
    {
        "playlist": "Hip Hop",
        "title": "In Da Club",
        "artist": "50 Cent",
        "cover": "in-da-club.jpeg",
        "audio": "./audios/song.mp3"
    },
    {
        "playlist": "Hip Hop",
        "title": "Without Me",
        "artist": "Eminem",
        "cover": "without-me.jpeg",
        "audio": "./audios/song.mp3"
    },
    {
        "playlist": "Hip Hop",
        "title": "Candy Shop",
        "artist": "50 Cent, Oliva",
        "cover": "candy-shop.jpeg",
        "audio": "./audios/song.mp3"
    },
    {
        "playlist": "Hip Hop",
        "title": "P.I.M.P.",
        "artist": "50 Cent, Snoop Dogg",
        "cover": "pimp.jpeg",
        "audio": "./audios/song.mp3"
    }
]

const goToHome = () => window.location.href = "index.html";
const goToProfileOptions = () => window.location.href = "profileOptions.html";
const goToLists = () => window.location.href = "mylists.html";
const goToAccount = () => window.location.href = "account.html";
const goToProfile = () => window.location.href = "profile.html";

const modalFunction = () => {
    const modal = document.getElementById("logoutModal");
    modal.style.display = "flex";
}

const closeLogoutModal = () => {
    const modal = document.getElementById("logoutModal");
    modal.style.display = "none";
}

function toggleMenuLinks() {
    navbarProfileOptions = document.getElementById("navbar-profile-options");
    maxProfileHeight = navbarProfileOptions.style.maxHeight;
    // if navProfileOptions maxHeight style is 0, then set it to auto else set it to 0
    navbarProfileOptions.style.maxHeight = (maxProfileHeight === "0px" || maxProfileHeight === "") ? "200px" : "0px";
}

const createErrorMessage = (message) => {
    errorMessageContainer.style.display = "block";
    errorMessageContainer.style.opacity = "100";
    
    // create a text node
    const textParagraph = document.createElement("p");
    const textNode = document.createTextNode(message);
    textParagraph.appendChild(textNode);
    textParagraph.className = "error-message";

    // append the text node to the error message
    if (!errorMessageContainer.hasChildNodes()) {
        errorMessageContainer.appendChild(textParagraph);
    }

    setTimeout(() => {
        errorMessageContainer.style.transitionDuration = "0.5s";
        errorMessageContainer.style.opacity = "0";

        setTimeout(() => {
            errorMessageContainer.style.display = "none";
            errorMessageContainer.removeChild(errorMessageContainer.childNodes[0]);
        }, 500);
    }, 2200);
}

const validateUsername = (username) => {
    if (username.length < USERNAME_MIN_LENGTH) {
        createErrorMessage(`El usuario debe tener al menos ${USERNAME_MIN_LENGTH} caracteres`)
        return false;
    }
    return true;
}

const validatePassword = (password) => {
    if (password.length < PASSWORD_MIN_LENGTH) {
        createErrorMessage(`La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres`)
        return false;
    }
    return true;
}

// create async function to get the user image
const saveUserInLocalStorage = async user => {
    const useImageInput = document.getElementById("input-file");
    if (useImageInput.files.length > 0) {
        const userImageFile = useImageInput.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(userImageFile);

        // wait until the reader is ready
        await new Promise((resolve, reject) => {
            reader.onload = resolve;
        });

        // check that reader.result is a string
        if (typeof reader.result === "string") {
            user.image = reader.result;
        }
    }

    // save user to the localstorage
    localStorage.setItem("user", JSON.stringify(user));
}

const modifyProfile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const birthdate = document.getElementById("birthdate").value;

    console.log(username)

    if (validateUsername(username)) {
        user.username = username;
        user.email = email;
        user.birthdate = birthdate;

        localStorage.setItem("user", JSON.stringify(user));
    }
}

const signUp = async (event) => {
    event.preventDefault();

    const username = usernameInput.value;
    const email = document.getElementById("email").value;
    const password = passwordInput.value;
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const birthdate = document.getElementById("birthdate").value;

    if (validateUsername(username) && validatePassword(password)) {
        let user = {
            "username": username,
            "email": email,
            "password": password,
            "name": name,
            "surname": surname,
            "birthdate": birthdate
        }

        await saveUserInLocalStorage(user);

        // redirect to the login page
        window.location.href = "login.html";
    }
}

const login = (event) => {
    event.preventDefault();

    // get user from the localstorage
    const user = JSON.parse(localStorage.getItem("user"));
    const username = usernameInput.value;
    const password = passwordInput.value;

    if (user.username === username && user.password === password) {
        // redirect to the home page
        localStorage.setItem("isAuthenticated", true);
        window.location.href = "index.html";
    } else {
        createErrorMessage("El usuario o la contraseña son incorrectos");
    }
}


const logout = () => {
    localStorage.setItem("isAuthenticated", false);
    window.location.href = "index.html";
}

function searchSong() {
    const searchbarInput = document.getElementById("searchbar");
    const searchValue = searchbar.value.toLowerCase();

    let searchResultsList = document.getElementById("searchbar-results");
    searchResultsList.innerHTML = "";

    if (searchValue != "") {
        TRACKS.forEach(track => {
            const trackName = track.title.toLowerCase();
            const trackArtist = track.artist.toLowerCase();
            if (trackName.includes(searchValue)) {
                console.log(trackName);
                const searchResult = document.createElement("li");
                searchResult.className = "searchbar-result";
                searchResult.innerHTML = `
                    <button class="searchbar-button play-button" onclick="playSong('${iterator}')">
                        <img src="./images/play.svg" alt="play-button">
                    </button>
                    <p>${track.title}</p>
                    <button class="searchbar-button like-button" onclick="likeSong(this)">
                        <img src="./images/heart.svg" alt="like-button">
                    </button>
                `;
                searchResultsList.appendChild(searchResult);
            }
        });
    }
}

const setNavbarLinks = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    // isAuthenticated default value
    if (isAuthenticated === null) {
        localStorage.setItem("isAuthenticated", false);
    }
    
    // Esto hay que crearlo como la imagen del usuario y si se le da click, que te muestre las siguientes opciones
    if (isAuthenticated === "true") {
        // Cuando se inicia sesión, en el navbar solo aparece la imagen del usuario
        const user = JSON.parse(localStorage.getItem("user"));
        const userImage = user.image === undefined ? "./images/profile-icon.svg" : user.image;
        navbarLinks.style.flexDirection = "column";
        const navbarProfileLinks = `
            <div class="searchbar-profile-container">
                <div class="searchbar-container">
                    <input id="searchbar" onkeyup="searchSong()" class="searchbar" type="text" placeholder="Buscar">
                    <ul id="searchbar-results" class="searchbar-results"></ul>
                </div>
                <div class="navbar-profile">
                    <img src=${userImage} class="navbar-profile-image" onclick="toggleMenuLinks()">
                </div>
                <div class="navbar-profile-options" id="navbar-profile-options">
                    <div class="navbar-profile-option">
                        <a class="navbar-profile-option-link" onclick="goToAccount()">
                            <p class="navbar-profile-option-text">Cuenta</p>
                        </a>
                    </div>
                    <div class="navbar-profile-option">
                        <a href="#settings" class="navbar-profile-option-link" onclick="goToProfile()">
                            <p class="navbar-profile-option-text">Perfil</p>
                        </a>
                    </div>
                    <div class="navbar-profile-option">
                        <a href="#logout" class="navbar-profile-option-link" onclick="modalFunction()">
                            <p class="navbar-profile-option-text">Cerrar Sesión</p>
                        </a>
                    </div>
                </div>
            </div>
        `;
        navbarLinks.innerHTML = navbarProfileLinks;
    } else {
        navbarLinks.innerHTML = `
            <button onclick="location.href='signup.html'" class="sign-log-in-button sign-in-button">
                Registrarse
            </button>
            <button onclick="location.href='login.html'" class="sign-log-in-button">
                Iniciar Sesión
            </button>`;
    }

    // ! si se ha iniciado sesión, se borra el pie de página y se agranda el resto de la página
    if (isAuthenticated === "true") {
        // El valor de la variable "--content-height-without-footer", pasa a 100vh
        document.documentElement.style.setProperty("--content-height-without-footer", "100vh");
        // El valor de la variable "--footer-height", pasa a 0
        document.documentElement.style.setProperty("--footer-height", "0");
        const footer = document.getElementsByClassName("cta-container");
        const footerText = document.getElementsByClassName("cta-text");
        footer[0].style.display = "none";
        footerText[0].style.display = "none";
    }

    // ! Añadimos la pagína del perfil del usuario
    if (isAuthenticated === "true" && window.location.href.includes("profile.html")) {
        const user = JSON.parse(localStorage.getItem("user"));
        const name = user.name, surname = user.surname;
        
        profileName.innerHTML = `
        <h2 class="profile-name">
            Perfil de ${name} ${surname}
        </h2>`;

        // set the profile data
        const username = user.username, email = user.email, birthdate = user.birthdate;
        const userImage = user.image === undefined ? "./images/profile-icon.svg" : user.image;
        profileData.innerHTML = `
        <div class="profile-data">
            <img src="${userImage}" class="profile-image" alt="profile-image">
        </div>
        <div class="profile-data">
            <p class="profile-data-title">Nombre de usuario</p>
            <p class="profile-data-info">@${username}</p>
            <p class="profile-data-title">Correo electrónico</p>
            <p class="profile-data-info">${email}</p>
            <p class="profile-data-title">Fecha de nacimiento</p>
            <p class="profile-data-info">${birthdate}</p>
        </div>
        <hr>
        <div class="profile-extra">
            <p id="profile-extra-title">Artistas más escuchados</p>
            <div class="profile-extra-artists" id="profile-extra-artists">
                <div class="artist-profile">
                    <img src="images/pimp.jpeg" alt="artist1" class="artist-img">
                    <p class="artist-name">Pimp Flaco</p>
                </div>
                <div class="artist-profile">
                    <img src="images/pimp.jpeg" alt="artist1" class="artist-img">
                    <p class="artist-name">Pimp Flaco</p>
                </div>
                <div class="artist-profile">
                    <img src="images/pimp.jpeg" alt="artist1" class="artist-img">
                    <p class="artist-name">Pimp Flaco</p>
                </div>
            </div>
            <p id="profile-extra-title">Canciones más escuchadas</p>
            <div class="profile-extra-artists" id="profile-extra-artists">
                <div class="artist-profile">
                    <img src="images/pimp.jpeg" alt="artist1" class="artist-img">
                    <p class="artist-name">Pimp Flaco</p>
                </div>
                <div class="artist-profile">
                    <img src="images/pimp.jpeg" alt="artist1" class="artist-img">
                    <p class="artist-name">Pimp Flaco</p>
                </div>
                <div class="artist-profile">
                    <img src="images/pimp.jpeg" alt="artist1" class="artist-img">
                    <p class="artist-name">Pimp Flaco</p>
                </div>
            </div>
            <p id="profile-extra-title">Canciones favoritas</p>
            <div class="profile-extra-liked-songs" id="profile-extra-liked-songs">
                <div class="artist-profile">
                    <img src="images/pimp.jpeg" alt="artist1" class="artist-img">
                    <p class="artist-name">Pimp Flaco</p>
                </div>
                <div class="artist-profile">
                    <img src="images/pimp.jpeg" alt="artist1" class="artist-img">
                    <p class="artist-name">Pimp Flaco</p>
                </div>
                <div class="artist-profile">
                    <img src="images/pimp.jpeg" alt="artist1" class="artist-img">
                    <p class="artist-name">Pimp Flaco</p>
                </div>
                <div class="artist-profile">
                    <img src="images/pimp.jpeg" alt="artist1" class="artist-img">
                    <p class="artist-name">Pimp Flaco</p>
                </div>
                <div class="artist-profile">
                    <img src="images/pimp.jpeg" alt="artist1" class="artist-img">
                    <p class="artist-name">Pimp Flaco</p>
                </div>
                <div class="artist-profile">
                    <img src="images/pimp.jpeg" alt="artist1" class="artist-img">
                    <p class="artist-name">Pimp Flaco</p>
                </div>
            </div>
            <p id="profile-extra-title">Canciones del usuario</p>
            <div class="profile-extra-artists" id="profile-extra-artists">
                <div class="artist-profile">
                    <img src="images/pimp.jpeg" alt="artist1" class="artist-img">
                    <p class="artist-name">Pimp Flaco</p>
                </div>
                <div class="artist-profile">
                    <img src="images/pimp.jpeg" alt="artist1" class="artist-img">
                    <p class="artist-name">Pimp Flaco</p>
                </div>
                <div class="artist-profile">
                    <img src="images/pimp.jpeg" alt="artist1" class="artist-img">
                    <p class="artist-name">Pimp Flaco</p>
                </div>
            </div>
            <p id="profile-extra-title">Seguidores</p>
            <div class="profile-extra-artists" id="profile-extra-artists">
                <div class="artist-profile">
                    <img src="images/pimp.jpeg" alt="artist1" class="artist-img">
                    <p class="artist-name">Pimp Flaco</p>
                </div>
                <div class="artist-profile">
                    <img src="images/pimp.jpeg" alt="artist1" class="artist-img">
                    <p class="artist-name">Pimp Flaco</p>
                </div>
                <div class="artist-profile">
                    <img src="images/pimp.jpeg" alt="artist1" class="artist-img">
                    <p class="artist-name">Pimp Flaco</p>
                </div>
            </div>
        </div>`;}
    

    // ! Añadimos la página de la cuenta
    if (isAuthenticated === "true" && window.location.href.includes("account.html")) {
        const user = JSON.parse(localStorage.getItem("user"));
        const name = user.name, surname = user.surname;
        
        profileName.innerHTML = `
        <h2 class="profile-name">
            Cuenta de ${name} ${surname}
        </h2>`;

        // set the profile data
        const username = user.username, email = user.email, birthdate = user.birthdate;
        const userImage = user.image === undefined ? "./images/profile-icon.svg" : user.image;

        // create form element to edit the profile
        const form = document.createElement("form");
        form.classList.add("profile-data");
        form.setAttribute("method", "POST");
        // add id to the form
        form.setAttribute("id", "edit-profile-form");
        form.innerHTML = `
            <p class="profile-data-title">Nombre de usuario</p>
            <input class="profile-data-info" type="text" name="username" id="username" placeholder="Nombre de usuario" value="${username}">
            <p class="profile-data-title">Correo electrónico</p>
            <input class="profile-data-info" type="email" name="email" id="email" placeholder="Correo electrónico" value="${email}">
            <p class="profile-data-title">Fecha de nacimiento</p>
            <input class="profile-data-info" type="date" name="birthdate" id="birthdate" value="${birthdate}">

            <button type="submit" class="sign-log-in-button">
                Guardar Cambios
            </button>
        `;

        profileData.innerHTML = `
        <div class="profile-data">
            <img src="${userImage}" class="profile-image" alt="profile-image">
        </div>
        `;

        profileData.appendChild(form);
    }

    if (document.documentElement.style.getPropertyValue("--music-player-original-height") === "6vh") {
        const musicPlayer = document.getElementById("music-player");
        musicPlayer.innerHTML = `
            <p class="music-player-title">No hay canciones en la cola</p>
        `;
    }
}
        
if (signUpForm !== null) {
    signUpForm.addEventListener("submit", (event) => signUp(event));
    selectImageButton.addEventListener("click", () => selectImageInput.click());

    // musicCard.addEventListener("click", () => {
    //     const musicName = musicCard.getAttribute("songName")
    //     const musics = localStorage.getItem("musics")
    //     for(let i = 0; i < musics.length; i++){
    //         if(musics[i].name === musicName){
    //             musics[i].clickCount += 1;
    //             break
    //         }
    //     }
    //     localStorage.setItem("musics", JSON.stringify(musics))
    // })

} else if (loginForm !== null) {
    loginForm.addEventListener("submit", (event) => login(event));
}

// add an event listener to the form
const editProfileForm = document.getElementById("edit-profile-form")
if (editProfileForm !== null) {
    editProfileForm.addEventListener("submit", (e) => {
        e.preventDefault();
        modifyProfile();
    });
}


// ! When song play button is clicked, we add the audio player to class "music-player"
firstClick = true;
function playSong (iterator) {
    // activate the audio player
    openMusicPlayer(iterator);
}


const setPlaylistsInHome = () => {
    const songsGroupedByPlaylist = getSongsGroupedByPlaylist();
    const playlistsContainer = document.getElementById("home-music-container");
    let iterator = 0;    
    songsGroupedByPlaylist.forEach((songsGroupedByPlaylist) => {
        const { playlist, songs } = songsGroupedByPlaylist;
        const playlistContainer = document.createElement("div");
        playlistContainer.classList.add("music-genre-container");
        playlistContainer.innerHTML = `
            <h2 class="music-genre-title">${playlist}</h2>
            <div class="music-genre-songs-container">
            </div>
        `;
        const playlistMusicContainer = playlistContainer.querySelector(".music-genre-songs-container");
        // Creamos un iterador para cada canción   
        songs.forEach((song) => {
            // Aumentamos el iterador autoincremental
            const { title, artist, cover, audio } = song;
            const musicCard = document.createElement("div");
            musicCard.classList.add("song-container");
            musicCard.setAttribute("songName", title);
             // TODO: crear iterador autoincremental para poder distinguir las canciones
            // ! Ahora pdodremos llamar a cada canción por su iterador (posición en el json)) 
            musicCard.innerHTML = `
                <figure class="song-cover-container">
                    <img class="song-cover" src="./images/${cover}" alt="Song Cover">
                    <a id="play-icon" alt="Play Icon" onclick="playSong(${iterator})"></a>
                </figure>
                <p class="song-description">
                    ${title}
                </p>
                <p class="song-author">
                    ${artist}
                </p>
            `;
            playlistMusicContainer.appendChild(musicCard);
            iterator++;
        });
        playlistsContainer.appendChild(playlistContainer);
    });
}

function openMusicPlayer (iterator) {
    document.documentElement.style.setProperty("--content-height-without-footer", "94vh");
    document.documentElement.style.setProperty("--footer-height", "0vh");
    document.documentElement.style.setProperty("--music-player-original-height", "6vh");
    
    const trackName = TRACKS[iterator].title;
    const trackArtist = TRACKS[iterator].artist;
    const trackImage = TRACKS[iterator].image;
    const trackAudio = TRACKS[iterator].audio;
    const trackCover = TRACKS[iterator].cover;

    
    // We add the audio player to the music player div
    const musicPlayer = document.getElementById("music-player");
    musicPlayer.innerHTML = `
        <!-- Define the section for displaying details -->
        <div class="player-controls">
            <div class="details">
              <div class="track-name">${trackName}</div>
              <div class="track-artist">${trackArtist}</div>
            </div>
    
        <!-- Define the section for displaying track buttons -->
        
            <div class="track-buttons">
                <div class="buttons">
                  <div class="prev-track" onclick="prevTrack()">
                    <i class="fa fa-step-backward fa-1x"></i>
                  </div>
                  <div class="playpause-track" onclick="playpauseTrack()">
                    <i class="fa fa-play-circle fa-2x"></i>
                  </div>
                  <div class="next-track" onclick="nextTrack()">
                    <i class="fa fa-step-forward fa-1x"></i>
                  </div>
                </div>

                <!-- Define the section for displaying the seek slider-->
                <div class="slider_container">
                  <div class="current-time" id="current-time">00:00</div>
                  <input type="range" min="0" max="100" value="0" class="seek_slider" id="seek_slider" onchange="seekTo()">
                  <div class="total-duration" id="total-duration">00:00</div>
                </div>
            </div>

            <!-- Define the section for displaying the volume slider-->
            <div class="slider_volume-container">
              <i class="fa fa-volume-down"></i>
              <input type="range" min="0" max="100" value="100" class="volume_slider" id="volume_slider" onchange="setVolume()">
            </div>
        </div>
    `;

    // We play the song
    loadTrack(iterator);
    playpauseTrackExit(); // in here if we touch the pause icon twice, music player will close
}


function closeMusicPlayer () {
    document.documentElement.style.setProperty("--content-height-without-footer", "100vh");
    document.documentElement.style.setProperty("--footer-height", "0vh");
    document.documentElement.style.setProperty("--music-player-original-height", "0vh");
    // we remove the audio player from the class "music-player"
    const musicPlayer = document.getElementById("music-player");
    musicPlayer.innerHTML = ``;
}

const getSongsFromPlaylist = (playlist) => {
    let songs = [];
    TRACKS.forEach((track) => {
        if (track.playlist === playlist) {
            songs.push(track);
        }
    });
    return songs;
}

const getSongsGroupedByPlaylist = () => {
    let songsGroupedByPlaylist = [];
    PLAYLISTS.forEach((playlist) => {
        songsGroupedByPlaylist.push({
            playlist,
            songs: getSongsFromPlaylist(playlist),
        });
    });
    return songsGroupedByPlaylist;
}


const logoutModal = `
    <div class="logoutModal" id="logoutModal">
        <div class="logoutModal-content">
            <div class="logoutModal-header">
                <span class="close" onclick="closeLogoutModal()">&times;</span>
            </div>
            <div class="logoutModal-body">
                <h2>¿Está seguro de que quiere cerrar sesión?</h2>
                <p>Si cierras sesión, no podrás acceder a tus listas de reproducción.</p>
            </div>
            <div class="logoutModal-footer">
                <button class="logoutModal-button" onclick="logout()">Si, cerrar sesión</button>
            </div>
        </div>
    </div>
`;

// on document load
document.addEventListener("DOMContentLoaded", () => {
    setNavbarLinks();

    // append the logout modal to the body
    document.body.innerHTML += logoutModal;

    // set the playlists in the home page
    setPlaylistsInHome();
});


function loadTrack(iterator) {

    // Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();
   
    // Load a new track
    curr_track.src = TRACKS[iterator].audio;
    curr_track.load();
   
    // Update details of the track
    track_name = TRACKS[iterator].title;
    track_artist = TRACKS[iterator].artist;
   
    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);
   
    // Move to the next track if the current finishes playing
    // using the 'ended' event
    curr_track.addEventListener("ended", nextTrack);
}


  // Function to reset all values to their default
function resetValues() {
    var seekSlider = document.getElementById("seek_slider");
    var totalDuration = document.getElementById("total-duration");
    var curr_time = document.getElementById("current-time");
    curr_time.textContent = "00:00";
    totalDuration.textContent = "00:00";
    seekSlider.value = 0;
}

function playpauseTrack() {
    // Switch between playing and pausing
    // depending on the current state
    if (!isPlaying) playTrack();
    else pauseTrack();
    // Replace icon with the pause icon
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function playpauseTrackExit() {
    // Switch between playing and pausing
    // depending on the current state
    if (!isPlaying) {
        playTrack();
        // Replace icon with the pause icon
        playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
        document.documentElement.style.setProperty("--play-pause-icon", "url(../images/pause.svg)");
    }
    else {
        exitTrack();
        // Replace icon with the pause icon
        playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
        document.documentElement.style.setProperty("--play-pause-icon", "url(../images/play.svg)");
    }
}
   
function playTrack() {
    // Play the loaded track
    curr_track.play();
    isPlaying = true;
}
   
function pauseTrack() {
    // Pause the loaded track
    curr_track.pause();
    isPlaying = false;
    // Replace icon with the play icon
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function exitTrack() {
    // Pause the loaded track
    curr_track.pause();
    isPlaying = false;
    closeMusicPlayer();
}

function nextTrack() {
    // Go back to the first track if the
    // current one is the last in the track list
    if (iterator < TRACKS.length - 1)
      iterator += 1;
    else iterator = 0;
   
    // Load and play the new track
    loadTrack(iterator);
    playTrack();
}
   
function prevTrack() {
    // Go back to the last track if the
    // current one is the first in the track list
    if (iterator > 0)
      iterator -= 1;
    else iterator = TRACKS.length - 1;
     
    // Load and play the new track
    loadTrack(iterator);
    playTrack();
}


function seekTo() {
    var seekSlider = document.getElementById("seek_slider");
    // Calculate the seek position by the
    // percentage of the seek slider
    // and get the relative duration to the track
   
    // Set the current track position to the calculated seek position
    curr_track.currentTime = curr_track.duration * (seekSlider.value / 100);;
}

function setVolume() {
    var volumeSlider = document.getElementById("seek_slider");
    // Set the volume according to the
    // percentage of the volume slider set
    curr_track.volume = volumeSlider.value / 100;
}
   
function seekUpdate() {
    let seekPosition = 0;
    var seekSlider = document.getElementById("seek_slider");
    var curr_time = document.getElementById("current-time");
    var totalDuration = document.getElementById("total-duration");

    // Check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
      seekPosition = curr_track.currentTime * (100 / curr_track.duration);
      seekSlider.value = seekPosition;
   
      // Calculate the time left and the total duration
      let currentMinutes = Math.floor(curr_track.currentTime / 60);
      let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(curr_track.duration / 60);
      let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
   
      // Add a zero to the single digit time values
      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
   
      // Display the updated duration
      curr_time.textContent = currentMinutes + ":" + currentSeconds;
      totalDuration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
