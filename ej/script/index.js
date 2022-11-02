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

const USERNAME_MIN_LENGTH = 5;
const PASSWORD_MIN_LENGTH = 8;

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

setNavbarLinks();

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

// append the logout modal to the body
document.body.innerHTML += logoutModal;

// add an event listener to the form
const editProfileForm = document.getElementById("edit-profile-form")
if (editProfileForm !== null) {
    editProfileForm.addEventListener("submit", (e) => {
        e.preventDefault();
        modifyProfile();
    });
}


// ! When song play button is clicked, we add the audio player to class "music-player"
function playSong (song, audio) {
    // activate the audio player
    const audioPlayer = document.getElementById(audio);
    const playIcon = document.getElementById("play-icon");
    
    openMusicPlayer(song, audio);

    if (audioPlayer.paused) {
        audioPlayer.play();
        playIcon.src = "./images/play.svg";
    } else {
        audioPlayer.pause();
        playIcon.src = "./images/pause.svg";
        closeMusicPlayer(audio);
    }
} 





// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;
 
// Create the audio element for the player
let curr_track = document.createElement('audio');

// Define the list of tracks that have to be played
let track_list = [
    {
      name: "Night Owl",
      artist: "Broke For Free",
      image: "Image URL",
      path: "Night_Owl.mp3"
    },
    {
      name: "Enthusiast",
      artist: "Tours",
      image: "Image URL",
      path: "Enthusiast.mp3"
    },
    {
      name: "Shipping Lanes",
      artist: "Chad Crouch",
      image: "Image URL",
      path: "Shipping_Lanes.mp3",
    },
  ];





function openMusicPlayer (song, audio) {
    document.documentElement.style.setProperty("--content-height-without-footer", "94vh");
    document.documentElement.style.setProperty("--footer-height", "0vh");
    document.documentElement.style.setProperty("--music-player-original-height", "6vh");
    
    // We add the audio player to the music player div
    const musicPlayer = document.getElementById("music-player");
    musicPlayer.innerHTML = `
        <!-- <audio id="${audio}" src="${song}" controls></audio> -->

        <!-- Define the section for displaying details -->
        <!--<div class="details">
          <div class="now-playing">PLAYING x OF y</div>
          <div class="track-art"></div>
          <div class="track-name">Track Name</div>
          <div class="track-artist">Track Artist</div>
        </div>-->
    
        <!-- Define the section for displaying track buttons -->
        <div class="player-controls">
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
                  <div class="current-time">00:00</div>
                  <input type="range" min="1" max="100"
                    value="0" class="seek_slider" onchange="seekTo()">
                  <div class="total-duration">00:00</div>
                </div>
            </div>

            <!-- Define the section for displaying the volume slider-->
            <div class="slider_volume-container">
              <i class="fa fa-volume-down"></i>
              <input type="range" min="1" max="100"
                value="100" class="volume_slider" onchange="setVolume()">
                <!--<i class="fa fa-volume-up"></i>-->
            </div>
        </div>
    `;

    // We play the song
    const audioPlayer = document.getElementById(audio);
    audioPlayer.play();
}

function closeMusicPlayer (audio) {
    document.documentElement.style.setProperty("--content-height-without-footer", "100vh");
    document.documentElement.style.setProperty("--footer-height", "0vh");
    document.documentElement.style.setProperty("--music-player-original-height", "0vh");
    // we remove the audio player from the class "music-player"
    const musicPlayer = document.getElementById("music-player");
    musicPlayer.innerHTML = ``;
}




function loadTrack(track_index) {
    // Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();
   
    // Load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();
   
    // Update details of the track
    track_art.style.backgroundImage =
       "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent =
       "PLAYING " + (track_index + 1) + " OF " + track_list.length;
   
    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);
   
    // Move to the next track if the current finishes playing
    // using the 'ended' event
    curr_track.addEventListener("ended", nextTrack);
   
    // Apply a random background color
    random_bg_color();
  }
   
  function random_bg_color() {
    // Get a random number between 64 to 256
    // (for getting lighter colors)
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;
   
    // Construct a color with the given values
    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
   
    // Set the background to the new color
    document.body.style.background = bgColor;
  }
   
  // Function to reset all values to their default
  function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
  }





  function playpauseTrack() {
    // Switch between playing and pausing
    // depending on the current state
    if (!isPlaying) playTrack();
    else pauseTrack();
  }
   
  function playTrack() {
    // Play the loaded track
    curr_track.play();
    isPlaying = true;
   
    // Replace icon with the pause icon
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
  }
   
  function pauseTrack() {
    // Pause the loaded track
    curr_track.pause();
    isPlaying = false;
   
    // Replace icon with the play icon
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
  }
   
  function nextTrack() {
    // Go back to the first track if the
    // current one is the last in the track list
    if (track_index < track_list.length - 1)
      track_index += 1;
    else track_index = 0;
   
    // Load and play the new track
    loadTrack(track_index);
    playTrack();
  }
   
  function prevTrack() {
    // Go back to the last track if the
    // current one is the first in the track list
    if (track_index > 0)
      track_index -= 1;
    else track_index = track_list.length - 1;
     
    // Load and play the new track
    loadTrack(track_index);
    playTrack();
  }





  function seekTo() {
    // Calculate the seek position by the
    // percentage of the seek slider
    // and get the relative duration to the track
    seekto = curr_track.duration * (seek_slider.value / 100);
   
    // Set the current track position to the calculated seek position
    curr_track.currentTime = seekto;
  }
   
  function setVolume() {
    // Set the volume according to the
    // percentage of the volume slider set
    curr_track.volume = volume_slider.value / 100;
  }
   
  function seekUpdate() {
    let seekPosition = 0;
   
    // Check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
      seekPosition = curr_track.currentTime * (100 / curr_track.duration);
      seek_slider.value = seekPosition;
   
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
      total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
  }



  loadTrack(track_index);