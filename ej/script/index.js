const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("error-message");
const signUpForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const navbarL = document.getElementById("navbar-links")
const navbarLinks = document.getElementById("navbar-links-container")
const hamburgerDropdown = document.getElementById("hamburguer-menu-options");
const selectImageInput = document.getElementById("input-file");
const selectImageButton = document.getElementById("select-image-button")
const profileName = document.getElementById("profile-title");
const profileData = document.getElementById("profile-body");
const profileOptions = document.getElementById("profile-options-container");
const myListsContainer = document.getElementById("mylists-container");
const likedSongs = document.getElementById("likedSongs-container");

const profileImage = document.getElementById("profile-image");

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
        "audio": "./audios/song0.mp3",
        "id": 0
    },
    {
        "playlist": "Rock",
        "title": "Under My Thumb",
        "artist": "The Rolling Stones",
        "cover": "under-my-thumb.jpeg",
        "audio": "./audios/song1.mp3",
        "id": 1
    },
    {
        "playlist": "Rock",
        "title": "Sweet Child OMine",
        "artist": "Guns NRoses",
        "cover": "sweet-child-o-mine.jpeg",
        "audio": "./audios/song2.mp3",
        "id": 2
    },
    {
        "playlist": "Rock",
        "title": "Highway To Hell",
        "artist": "AC/DC",
        "cover": "highway-to-hell.jpeg",
        "audio": "./audios/song3.mp3",
        "id": 3
    },
    {
        "playlist": "Rock",
        "title": "Seven Nation Army",
        "artist": "The White Stripes",
        "cover": "seven-nation-army.jpeg",
        "audio": "./audios/song4.mp3",
        "id": 4
    },
    {
        "playlist": "Pop",
        "title": "Dynamite",
        "artist": "Taio Cruz",
        "cover": "dynamite.jpeg",
        "audio": "./audios/song2.mp3",
        "id": 5
    },
    {
        "playlist": "Pop",
        "title": "Titanium",
        "artist": "David Guetta",
        "cover": "titanium.webp",
        "audio": "./audios/song3.mp3",
        "id": 6
    },
    {
        "playlist": "Pop",
        "title": "Believer",
        "artist": "Imagine Dragons",
        "cover": "believer.jpeg",
        "audio": "./audios/song2.mp3",
        "id": 7
    },
    {
        "playlist": "Pop",
        "title": "Pompeii",
        "artist": "Bastille",
        "cover": "pompeii.jpeg",
        "audio": "./audios/song4.mp3",
        "id": 8
    },
    {
        "playlist": "Pop",
        "title": "Gods Plan",
        "artist": "Drake",
        "cover": "gods-plan.jpeg",
        "audio": "./audios/song1.mp3",
        "id": 9
    },
    {
        "playlist": "Hip Hop",
        "title": "Still D.R.E.",
        "artist": "Dr. Dre, Snoop Dogg",
        "cover": "still-dre.jpeg",
        "audio": "./audios/song0.mp3",
        "id": 10
    },
    {
        "playlist": "Hip Hop",
        "title": "In Da Club",
        "artist": "50 Cent",
        "cover": "in-da-club.jpeg",
        "audio": "./audios/song2.mp3",
        "id": 11
    },
    {
        "playlist": "Hip Hop",
        "title": "Without Me",
        "artist": "Eminem",
        "cover": "without-me.jpeg",
        "audio": "./audios/song4.mp3",
        "id": 12
    },
    {
        "playlist": "Hip Hop",
        "title": "Candy Shop",
        "artist": "50 Cent, Oliva",
        "cover": "candy-shop.jpeg",
        "audio": "./audios/song1.mp3",
        "id": 13
    },
    {
        "playlist": "Hip Hop",
        "title": "P.I.M.P.",
        "artist": "50 Cent, Snoop Dogg",
        "cover": "pimp.jpeg",
        "audio": "./audios/song3.mp3",
        "id": 14
    }
]

const goToHome = () => window.location.href = "index.html";
const goToProfileOptions = () => window.location.href = "profileOptions.html";
const goToLists = () => window.location.href = "mylists.html";
const goToAccount = () => window.location.href = "account.html";
const goToProfile = () => window.location.href = "profile.html";
const goToArtist = () => window.location.href = "artist.html";
const goToFollower = () => window.location.href = "follower.html";
const goToPlaylistCreator = () => window.location.href = "playlistCreator.html";
const goToLogin = () => window.location.href = "login.html";

const modalFunction = () => {
    const modal = document.getElementById("logoutModal");
    modal.style.display = "flex";
}

const closeLogoutModal = () => {
    const modal = document.getElementById("logoutModal");
    modal.style.display = "none";
}

const deleteModal = () => {
    const deleteModal = document.getElementById("deleteModal");
    deleteModal.style.display = "flex";
}

const closeDeleteModal = () => {
    const deleteModal = document.getElementById("deleteModal");
    deleteModal.style.display = "none";
}

const deleteAccount = () => {
    localStorage.removeItem("user");
    localStorage.setItem("isAuthenticated", "false");
    window.location.href = "index.html";
}

function toggleMenuLinks() {
    navbarNotifications = document.getElementById("navbar-notifications");
    navbarProfileOptions = document.getElementById("navbar-profile-options");

    maxProfileHeight = navbarProfileOptions.style.maxHeight;
    // if navProfileOptions maxHeight style is 0, then set it to auto else set it to 0
    navbarProfileOptions.style.maxHeight = (maxProfileHeight === "0px" || maxProfileHeight === "") ? "300px" : "0px";
    navbarProfileOptions.style.paddingTop = (maxProfileHeight === "0px" || maxProfileHeight === "") ? "10px" : "0px";
    navbarProfileOptions.style.paddingBottom = (maxProfileHeight === "0px" || maxProfileHeight === "") ? "10px" : "0px";

    navbarNotifications.style.maxHeight = "0px";
    navbarNotifications.style.paddingTop = "0px";
    navbarNotifications.style.paddingBottom = "0px";
}

function toggleNotificationLinks() {
    populateNotifications();
    navbarNotifications = document.getElementById("navbar-notifications");
    navbarProfileOptions = document.getElementById("navbar-profile-options");
    
    maxNotificationsHeight = navbarNotifications.style.maxHeight;
    // if navProfileOptions maxHeight style is 0, then set it to auto else set it to 0
    navbarNotifications.style.maxHeight = (maxNotificationsHeight === "0px" || maxNotificationsHeight === "") ? "300px" : "0px";
    navbarNotifications.style.paddingTop = (maxNotificationsHeight === "0px" || maxNotificationsHeight === "") ? "10px" : "0px";
    navbarNotifications.style.paddingBottom = (maxNotificationsHeight === "0px" || maxNotificationsHeight === "") ? "10px" : "0px";

    navbarProfileOptions.style.maxHeight = "0px";
    navbarProfileOptions.style.paddingTop = "0px";
    navbarProfileOptions.style.paddingBottom = "0px";
}
function populateNotifications(){
    const user = JSON.parse(localStorage.getItem("user"));
    const toursList = user.artistTours;
    var notificationsContainer = document.getElementById("notifications-container");
    toursList.forEach(tour => {
        var notificationEntry = document.createElement("div");
        notificationEntry.classList.add("navbar-notification-option");
        notificationEntry.innerHTML=`
        <img src=${tour.artistImage} class="navbar-notification-option-image">
        <a class="navbar-notification-option-link" onclick="goToArtistPage(${tour})">
            <p class="navbar-notification-option-text">New tour by ${tour.artist}</p>
        </a>
        `;
        notificationsContainer.appendChild(notificationEntry);
    });

    


}

const createErrorMessage = (message) => {
    const errorMessageContainer = document.getElementById("error-message-container");
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

const validateEmail = (email) =>{
    const regex = new RegExp("[a-zA-Z0-9_.]@[a-z]+\.[a-z]{2,}", 'g');
    if (regex.test(email) == true){
      return true;
    }
    else{
        createErrorMessage(`El email debe ser del siguiente <example@gmail.com> por ejemplo: maruui22@hotmail.com`)
      return false
    }
  }

// create async function to get the user image
const saveUserInLocalStorage = async user => {
    const useImageInput = document.getElementById("input-file");
    console.log("function to save image")
    if (useImageInput.files.length > 0) {
        console.log("if to save image")
        const userImageFile = useImageInput.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(userImageFile);

        console.log("reader", reader)
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

const modifyProfile = (event) => {
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;

    if (validateUsername(username) && (validateEmail(email))) {
        user.username = username;
        user.email = email;

        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "index.html";
    
    }
}

const signUp = async (event) => {
    event.preventDefault();

    const username = usernameInput.value;
    const email = document.getElementById("email").value;
    const password = passwordInput.value;
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;

    console.log("entering in signup")

    if (validateUsername(username) && validatePassword(password)) {

        console.log("username and password validated")
        let user = {
            "username": username,
            "email": email,
            "password": password,
            "name": name,
            "surname": surname,
            "likedSongs": [],
            "playlists": [],
            "artistTours": []
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
    const searchValue = searchbarInput.value.toLowerCase();

    let searchResultsList = document.getElementById("searchbar-results");
    searchResultsList.innerHTML = "";

    if (searchValue != "") {
        TRACKS.forEach(track => {
            const trackName = track.title.toLowerCase();
            const trackArtist = track.artist.toLowerCase();
            if (trackName.includes(searchValue)) {
                const searchResult = document.createElement("li");
                searchResult.className = "searchbar-result";
                searchResult.innerHTML = `
                    <button class="searchbar-button play-button" name="play-button" onclick="openMusicPlayer('${track.id}')">
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

const getNotificationIcon = (isNotification) => {
    return isNotification ? "./images/bell-notification.svg" : "./images/bell.svg";
}
function readValueFromAddTourAndSaveToLocalStorage(){
    //if (window.location.href.includes("artist.html")){
        const artist = "50 Cent";
        const artistImage = "images/50cent.jpeg";
        const artistPage = "artist.html";
    //}
   
    var sala = document.getElementById("sala-entry");
    var date = document.getElementById("date-entry");
    //checkear si son nulos
    if ((sala.value=="") || (date.value=="")){
        
        createErrorMessage("cant be none!");
    }
    // Si no es nulo entonces crear la carta tour y almacenar en local storage
    else{
        
        console.log("It is creating tour")
        const imageSource = "images/"+sala.value+".jpg";
        console.log(imageSource);
        let tour = {
            "artist":artist,
            "artistImage":artistImage,
            "artistPage":artistPage,
            "sala":sala.options[sala.selectedIndex].text,
            "date":date.options[date.selectedIndex].text,
            "source":imageSource,
            "isRead":false
        }
        const user = JSON.parse(localStorage.getItem("user"));
        artistTours = user.artistTours;
        artistTours.push(tour)
        user.artistTours = artistTours;
        localStorage.setItem("user", JSON.stringify(user));
        console.log("Successfully stored to local storage");
    }
    
    
    
}

function addTour(){
    console.log("HAHAHAHHHAAHHA");
    let addTourContainer = document.getElementById("add-tour-options");
    addTourContainer.innerHTML = `
    <div class="sala-container">
        <label for="sala" style=color:#ffffff>Sala</label>
        <select name="sala" class="sala-entry" id="sala-entry">
            <option value="" selected disabled hidden>No ha elegido ninguna sala</option>
            <option value="wizink-center">Wizink Center</option>
            <option value="la-riviera">La Riviera</option>
            <option value="palau-sant-jordi">Palau Sant Jordi</option>
        </select>

    </div>
    <div class="date-container">
    <label for="date" style=color:#ffffff>Fecha</label>
        <select name="date" class="date-entry" id="date-entry">
            <option value="" selected disabled hidden>No ha elegido ninguna fecha</option>
            <option value="julio-22-2023">Julio-22-2023</option>
            <option value="agosto-12-2023">Agosto-12-2023</option>
            <option value="junio-20-2023">Junio-20-2023</option>
        </select>
    </div>
    <button class="add-tour-button" onclick="readValueFromAddTourAndSaveToLocalStorage()">
        Añadir Tour
    </button>
    <div class="error-message-container" id="error-message-container"></div>

    
    `;
    
}
function notificationIsRead(toursList){
    toursList.forEach(tour =>{
        if (tour.isRead ==="true"){
            return true;
        }
    });
    return false;

}

const setNavbarLinks = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    // ! isAuthenticated default value
    if (isAuthenticated === null) {
        localStorage.setItem("isAuthenticated", false);
    }
    
    // ! Esto hay que crearlo como la imagen del usuario y si se le da click, que te muestre las siguientes opciones
    if (isAuthenticated === "true") {
        // Cuando se inicia sesión, en el navbar solo aparece la imagen del usuario
        const user = JSON.parse(localStorage.getItem("user"));
        const userImage = user.image === undefined ? "./images/profile-icon.svg" : user.image;
        
        
        navbarLinks.style.flexDirection = "column";
        
        const toursList = user.artistTours;
        //Para saber hay notificación, mira si hay algun isRead de tour es true, si al menos hay 1
        //returnea la funcion notificationIsRead true
        let isNotification = notificationIsRead(toursList);
        const navbarNotificationsMenu = `
            <div class="navbar-profile">
                <img src=${getNotificationIcon(isNotification)} class="bell-image" onclick="toggleNotificationLinks()">
            </div>
            <div class="navbar-profile-options" id="navbar-notifications">
                    <div class="navbar-notification-option-container" id="notifications-container">
                        <div class="navbar-notification-option">
                            <img src="./images/logo.svg" class="navbar-profile-option-icon">
                            <a href="#settings" class="navbar-profile-option-link" onclick="goToProfile()">
                                <p class="navbar-profile-option-text">This is your first notification!</p>
                            </a>
                        </div>
                    </div>
                </div>
        `
        const navbarProfileImageMenu = `
                <div class="navbar-profile">
                    <img src=${userImage} class="navbar-profile-image" onclick="toggleMenuLinks()">
                </div>
                <div class="navbar-profile-options" id="navbar-profile-options">
                    <div class="navbar-profile-option-info">
                        <img src=${userImage} class="navbar-profile-option-image">
                        <p class="navbar-profile-option-name">${user.name} ${user.surname}</p>
                    </div> 
                    <div class="navbar-profile-option-container">
                        <div class="navbar-profile-option">
                            <img src="./images/edit-profile.svg" class="navbar-profile-option-icon">
                            <a href="#settings" class="navbar-profile-option-link" onclick="goToAccount()">
                                <p class="navbar-profile-option-text">Editar Perfil</p>
                            </a>
                        </div>
                        <div class="navbar-profile-option">
                            <img src="./images/account.svg" class="navbar-profile-option-icon">
                            <a class="navbar-profile-option-link" onclick="goToProfile()">
                                <p class="navbar-profile-option-text">Mi Cuenta</p>
                            </a>
                        </div>
                        
                        <div class="navbar-profile-option">
                            <img src="./images/logout.svg" class="navbar-profile-option-icon">
                            <a href="#logout" class="navbar-profile-option-link" onclick="modalFunction()">
                                <p class="navbar-profile-option-text">Cerrar Sesión</p>
                            </a>
                        </div>
                    </div>
                </div>
        `;
        const songsSearchbar = `
            <div class="searchbar-container">
                <input id="searchbar" onkeyup="searchSong()" class="searchbar" type="text" placeholder="Buscar">
                ${navbarNotificationsMenu}
                ${navbarProfileImageMenu}
                <ul id="searchbar-results" class="searchbar-results"></ul>
            </div>
        `;
        const navbarProfileLinks = `
            <div class="searchbar-profile-container">
                ${songsSearchbar}
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
        // select the first child of the navbarLinks and apply it a margin left auto
        navbarLinks.firstElementChild.style.marginLeft = "auto";
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

        //deleted
        //<p class="profile-data-title">Correo electrónico</p>
        //<p class="profile-data-info">${email}</p>
        //<p class="profile-data-title">Fecha de nacimiento</p>
        
        // set the profile data
        const username = user.username, email = user.email;
        const userImage = user.image === undefined ? "./images/profile-icon.svg" : user.image;
        const userProfileInitialData = `
            
            <div class="profile-data">
                
                <p class="profile-data-info">@${username}</p>
                
            </div>
            <hr>
            <div class="profile-extra">
            <p id="profile-extra-title">Artistas más escuchados</p>
            <div class="profile-extra-artists" id="profile-extra-artists">
                <div class="artist-profile">
                    <img src="images/acdc.jpeg" alt="artist1" class="artist-img" onclick="goToArtist()">
                    <p class="artist-name">AC/DC</p>
                </div>
                <div class="artist-profile">
                    <img src="images/david_guetta.jpeg" alt="artist1" class="artist-img" onclick="goToArtist()">
                    <p class="artist-name">David Guetta</p>
                </div>
                <div class="artist-profile">
                    <img src="images/50cent.jpeg" alt="artist1" class="artist-img" onclick="goToArtist()">
                    <p class="artist-name">50 Cent</p>
                </div>
            </div>
            <p id="profile-extra-title">Canciones más escuchadas</p>
            <div class="profile-extra-artists" id="profile-extra-artists">
                <div class="song-container">

                    <figure class="song-cover-container-small">
                        <img class="song-cover-small" src="./images/highway-to-hell.jpeg" alt="Song Cover">
                        <a id="play-icon" alt="Play Icon" onclick="openMusicPlayer(0)"></a>
                    </figure>
                    <p class="song-description">
                        Highway to Hell
                    </p>
                    <p class="song-author">
                        AC/DC
                    </p>
                
                </div>
                <div class="song-container">

                    <figure class="song-cover-container-small">
                        <img class="song-cover-small" src="./images/still-dre.jpeg" alt="Song Cover">
                        <a id="play-icon" alt="Play Icon" onclick="openMusicPlayer(0)"></a>
                    </figure>
                    <p class="song-description">
                        Still D.R.E.
                    </p>
                    <p class="song-author">
                        Dr. Dre
                    </p>
                
                </div>
                <div class="song-container">

                    <figure class="song-cover-container-small">
                        <img class="song-cover-small" src="./images/gods-plan.jpeg" alt="Song Cover">
                        <a id="play-icon" alt="Play Icon" onclick="openMusicPlayer(0)"></a>
                    </figure>
                    <p class="song-description">
                        Gods plan
                    </p>
                    <p class="song-author">
                        Drake
                    </p>
                
                </div>
            </div>
            <p id="profile-extra-title">Canciones favoritas</p>
        `;
        profileImage.innerHTML = `
        <div class="profile-data">
            <img src="${userImage}" class="profile-image" alt="profile-image">
        </div>
        `;
        let favourites = `<div class="profile-extra-liked-songs" id="profile-extra-liked-songs">`;
        const favouriteSongs = getLikedSongsInformation();
        favouriteSongs.forEach(song => {
            const { title, artist, cover } = song;
            favourites += `
                <div class="artist-profile">
                    <img src="images/${cover}" alt="${artist}" class="artist-img">
                    <p class="artist-name">${title}</p>
                </div>
            `;
        });
        favourites += `</div>`;

        const restOfSections = `
            <p id="profile-extra-title">Canciones del usuario: 1</p>
                <div class="profile-extra-artists" id="profile-extra-artists">
                <div class="song-container">

                <figure class="song-cover-container-small">
                    <img class="song-cover-small" src="./images/profile-cover.jpeg" alt="Song Cover">
                    <a id="play-icon" alt="Play Icon" onclick="openMusicPlayer(0)"></a>
                </figure>
                <p class="song-description">
                    Sunrise Cover
                </p>
                <p class="song-author">
                    User
                </p>
            
            </div>
                </div>
                <p id="profile-extra-title">Seguidores</p>
                <div class="profile-extra-artists" id="profile-extra-artists">
                    <div class="artist-profile">
                        <img src="images/albertito03.jpeg" alt="artist1" class="artist-img"  onclick="goToFollower()">
                        <p class="artist-name">@alberto03</p>
                    </div>
                        <div class="artist-profile">
                        <img src="images/50cent.jpeg" alt="artist1" class="artist-img" onclick="goToArtist()">
                        <p class="artist-name">50 Cent</p>
                    </div>
                </div>
            </div>
        </div>
        `
        profileData.innerHTML = `
            ${userProfileInitialData}
            ${favourites}
            ${restOfSections}
        `
    }
    
    // ! Vamos a la pagina del artista
    if (window.location.href.includes("artist.html")) {
        profileName.innerHTML = `
        <h2 class="profile-name">
            50 Cent
        </h2>`;

        // set the profile data
        profileData.innerHTML = `
        <div class="profile-data">
            <img src="images/50cent.jpeg" class="profile-image" alt="profile-image">
        </div>
        <br>
        <div class="profile-extra">
            <p id="profile-extra-title">Canciones</p>
            <div class="profile-extra-artists" id="profile-extra-artists">
                <div class="song-container">
                    <figure class="song-cover-container-small">
                        <img class="song-cover-small" src="images/candy-shop.jpeg" alt="Song Cover">
                        <a id="play-icon" alt="Play Icon" onclick="openMusicPlayer(0)"></a>
                    </figure>
                    <p class="song-description">
                        Candy Shop
                    </p>
                    <p class="song-author">
                        50 Cent
                    </p>
                </div>
                <div class="song-container">
                    <figure class="song-cover-container-small">
                        <img class="song-cover-small" src="images/pimp.jpeg" alt="Song Cover">
                        <a id="play-icon" alt="Play Icon" onclick="openMusicPlayer(0)"></a>
                    </figure>
                    <p class="song-description">
                        P.I.M.P
                    </p>
                    <p class="song-author">
                        50 Cent
                    </p>
                </div>
                <div class="song-container">
                    <figure class="song-cover-container-small">
                        <img class="song-cover-small" src="images/in-da-club.jpeg" alt="Song Cover">
                        <a id="play-icon" alt="Play Icon" onclick="openMusicPlayer(0)"></a>
                    </figure>
                    <p class="song-description">
                        In Da Club
                    </p>
                    <p class="song-author">
                        50 Cent
                    </p>
                </div>
            </div>
            <p id="profile-extra-title">Álbumes</p>
            <div class="profile-extra-artists" id="profile-extra-artists">
                <div class="song-container">
                    <figure class="song-cover-container-small">
                        <img class="song-cover-small" src="images/in-da-club.jpeg" alt="Song Cover">
                        <a id="play-icon" alt="Play Icon" onclick="openMusicPlayer(0)"></a>
                    </figure>
                    <p class="song-description">
                        Get Rich or Die
                    </p>
                    <p class="song-author">
                        50 Cent
                    </p>
                </div>
                <div class="song-container">
                    <figure class="song-cover-container-small">
                        <img class="song-cover-small" src="images/candy-shop.jpeg" alt="Song Cover">
                        <a id="play-icon" alt="Play Icon" onclick="openMusicPlayer(0)"></a>
                    </figure>
                    <p class="song-description">
                        The Massacre
                    </p>
                    <p class="song-author">
                        50 Cent
                    </p>
                </div>
                <div class="song-container">
                    <figure class="song-cover-container-small">
                        <img class="song-cover-small" src="images/21questions.jpeg" alt="Song Cover">
                        <a id="play-icon" alt="Play Icon" onclick="openMusicPlayer(0)"></a>
                    </figure>
                    <p class="song-description">
                        21 Questions
                    </p>
                    <p class="song-author">
                        50 Cent
                    </p>
                </div>  
            </div>
            <p id="profile-extra-title">Tours y próximos eventos</p>
            <div class="profile-extra-artists" id="tours-container">
            </div>
            <div class="add-tour-container" id="add-tour-container">
                <button class='add-tour-button' onclick="addTour()">Añadir tour</button>
                <div class="add-tour-options" id="add-tour-options"></div>
            </div>
        </div>`;}




    // ! Añadimos la pagina del seguidor
    if (isAuthenticated === "true" && window.location.href.includes("follower.html")) {
        profileName.innerHTML = `
        <h2 class="profile-name">
            Perfil de Alberto García
        </h2>`;

        // set the profile data
        profileData.innerHTML = `
        <div class="profile-data">
            <img src="./images/albertito03.jpeg" class="profile-image" alt="profile-image">
        </div>
        <div class="profile-data">
            <p class="profile-data-title">Nombre de usuario</p>
            <p class="profile-data-info">@alberto03</p>
            <p class="profile-data-title">Correo electrónico</p>
            <p class="profile-data-info">albertito2003@gmail.com</p>
            <p class="profile-data-title">Fecha de nacimiento</p>
            <p class="profile-data-info">2003-02-12</p>
        </div>
        <hr>
        <div class="profile-extra">
            <p id="profile-extra-title">Artistas más escuchados</p>
            <div class="profile-extra-artists" id="profile-extra-artists">
                <div class="artist-profile">
                    <img src="images/acdc.jpeg" alt="artist1" class="artist-img" onclick="goToArtist()">
                    <p class="artist-name">AC/DC</p>
                </div>
                <div class="artist-profile">
                    <img src="images/david_guetta.jpeg" alt="artist1" class="artist-img" onclick="goToArtist()">
                    <p class="artist-name">David Guetta</p>
                </div>
                <div class="artist-profile">
                    <img src="images/50cent.jpeg" alt="artist1" class="artist-img" onclick="goToArtist()">
                    <p class="artist-name">50 Cent</p>
                </div>
            </div>
            <p id="profile-extra-title">Canciones más escuchadas</p>
            <div class="profile-extra-artists" id="profile-extra-artists">
            <div class="artist-profile">
                <img src="images/highway-to-hell.jpeg" alt="artist1" class="artist-img">
                <p class="artist-name">Highway to Hell</p>
            </div>
            <div class="artist-profile">
                <img src="images/still-dre.jpeg" alt="artist1" class="artist-img">
                <p class="artist-name">Still D.R.E.</p>
            </div>
            <div class="artist-profile">
                <img src="images/without-me.jpeg" alt="artist1" class="artist-img">
                <p class="artist-name">Without Me</p>
            </div>
            </div>
            <p id="profile-extra-title">Canciones favoritas</p>
            <div class="profile-extra-liked-songs" id="profile-extra-liked-songs">
            <div class="artist-profile">
                <img src="images/highway-to-hell.jpeg" alt="artist1" class="artist-img">
                <p class="artist-name">Highway to Hell</p>
            </div>
            <div class="artist-profile">
                <img src="images/titanium.webp" alt="artist1" class="artist-img">
                <p class="artist-name">Titanium</p>
            </div>
            <div class="artist-profile">
                <img src="images/gods-plan.jpeg" alt="artist1" class="artist-img">
                <p class="artist-name">Gods Plan</p>
            </div>
            <div class="artist-profile">
                <img src="images/still-dre.jpeg" alt="artist1" class="artist-img">
                <p class="artist-name">Still D.R.E.</p>
            </div>
            <div class="artist-profile">
                <img src="images/without-me.jpeg" alt="artist1" class="artist-img">
                <p class="artist-name">Without Me</p>
            </div>
            </div>
            <p id="profile-extra-title">Canciones del usuario: 0</p>
            <br><br><br>
            <p id="profile-extra-title">Seguidores</p>
                <div class="profile-extra-artists" id="profile-extra-artists">
                    <div class="artist-profile">
                    <img src="images/david_guetta.jpeg" alt="artist1" class="artist-img" onclick="goToArtist()">
                    <p class="artist-name">David Guetta</p>
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


        // deleted
        //<p class="profile-data-title">Fecha de nacimiento</p>

        // set the profile data
        const username = user.username, email = user.email;
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

            <button type="submit" class="sign-log-in-button">
                Guardar Cambios
            </button>

            <button type="button" class="delete-account-button" id="delete-account-button">
                Borrar tu perfil
            </button>

            <div id="error-message-container" class="error-message-container"></div>
        `;

        const deleteButton = form.querySelector("#delete-account-button");
        deleteButton.addEventListener("click", () => {
            deleteModal();
        });

        profileImage.innerHTML = `
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
    //ahora en perfil de artista
    if (isAuthenticated === "true" && window.location.href.includes("artist.html")) {
        const user = JSON.parse(localStorage.getItem("user"));
        // user.artistTours = [];
        // localStorage.setItem("user", JSON.stringify(user));
        var artistTours = user.artistTours;
        var toursContainer = document.getElementById("tours-container");
        artistTours.forEach(tour=>{
            const tourContainer = document.createElement("div");
            tourContainer.classList.add("tour-container");
            tourContainer.innerHTML=`
            <a href="https://www.ticketmaster.es/" target="_blank">
                <figure class="song-cover-container-small">
                    <img class="tour-image-cover" src= ${tour.source} alt="tour Cover">
                    </figure>
                    <p class="song-description">
                        ${tour.sala}
                    </p>
                    <p class="song-author">
                        Madrid
                    </p>
                    <p class="song-author">
                        ${tour.date}
                    </p>
                </figure>
            </a>
            `;
            toursContainer.appendChild(tourContainer);
        });
    }
    //update notification 
    if (isAuthenticated === "true"){
        return

    }
}

function isSongLiked(songName){
    const user = JSON.parse(localStorage.getItem("user"));
    const likedSongs = user.likedSongs;
    return likedSongs.includes(songName);
}

function getLikeDisplayIcon(songName){
    return isSongLiked(songName) ? "./images/heart-fill.svg" : "./images/heart-no-fill.svg";
}

function toggleLike(songName) {
    const user = JSON.parse(localStorage.getItem("user"));
    const likedSongs = user.likedSongs;
    if (likedSongs.includes(songName)) {
        // remove the song from the liked songs
        const index = likedSongs.indexOf(songName);
        likedSongs.splice(index, 1);
    } else {
        // add the song to the liked songs
        likedSongs.push(songName);
    }
    user.likedSongs = likedSongs;
    localStorage.setItem("user", JSON.stringify(user));
}

function getSongInformation(songName) {
    for (let i = 0; i < TRACKS.length; i++) {
        if (TRACKS[i].title === songName) {
            return TRACKS[i];
        }
    }
}

function getLikedSongsInformation() {
    const user = JSON.parse(localStorage.getItem("user"));
    const likedSongs = user.likedSongs;
    let likedSongsInformation = [];
    likedSongs.forEach((songName) => {
        const song = getSongInformation(songName);
        likedSongsInformation.push(song);
    });
    return likedSongsInformation;
}

const playlistCounters = () => {
    // ! Creamos los countfown timer
    // ! Creamos los countfown timer
    var countDownDate0 = new Date("Jan 5, 2023 15:34:25").getTime();
    var countDownDate1 = new Date("Feb 7, 2023 15:36:35").getTime();
    var countDownDate2 = new Date("Jan 10, 2023 00:37:11").getTime();

    // Actualizamos el contador cada segundo
    setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate0 - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const counter0 = document.getElementById("counter-0")
        if (counter0 !== null) {
            counter0.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
            if (distance < 0) {
                clearInterval(x);
                counter0.innerHTML = "OUT NOW";
            }
        }
    }, 1000);

    setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate1 - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        const counter1 = document.getElementById("counter-1")
        if (counter1 !== null) {
            counter1.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
            if (distance < 0) {
                clearInterval(x);
                counter1.innerHTML = "OUT NOW";
            }
        }
    }, 1000);

    setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate2 - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const counter2 = document.getElementById("counter-2")
        if (counter2 !== null) {
            counter2.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
            if (distance < 0) {
                clearInterval(x);
                counter2.innerHTML = "OUT NOW";
            }
        }
    }, 1000);
}

  
const setPlaylistsInHome = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    const playlistsContainer = document.getElementById("home-music-container");

    if (playlistsContainer === null) return;

    if (isAuthenticated !== "true") {
        playlistCounters();
    }

    const songsGroupedByPlaylist = getSongsGroupedByPlaylist();
    
    // ! Si no se ha registrado, se mostrará una playlist nueva
    if (isAuthenticated !== "true") {
        playlistsContainer.innerHTML += `
        <h2 class="music-genre-title">Últimos lanzamientos</h2>
        <div class="music-genre-songs-container">
            <div class="song-container">
                <figure class="song-cover-container">
                    <img class="song-cover" src="./images/pompeii.jpeg" alt="Song Cover">
                    <a id="play-icon" alt="Play Icon" onclick="openMusicPlayer(0)"></a>
                </figure>
                <p class="song-description">
                    Pompeii
                </p>
                <p class="song-author">
                    Bastille
                </p>
                <br>
                <p id="counter-0">
                </p>
            </div>
            <div class="song-container">
                <figure class="song-cover-container">
                    <img class="song-cover" src="./images/still-dre.jpeg" alt="Song Cover">
                    <a id="play-icon" alt="Play Icon" onclick="openMusicPlayer(0)"></a>
                </figure>
                <p class="song-description">
                    Still Dre
                </p>
                <p class="song-author">
                    Dr. Dre
                </p>
                <br>
                <p id="counter-1">
                </p>
            </div>
            <div class="song-container">
                <figure class="song-cover-container">
                    <img class="song-cover" src="./images/pimp.jpeg" alt="Song Cover">
                    <a id="play-icon" alt="Play Icon" onclick="openMusicPlayer(0)"></a>
                </figure>
                <p class="song-description">
                    P.I.M.P.
                </p>
                <p class="song-author">
                    50 Cent
                </p>
                <br>
                <p id="counter-2">
                </p>
            </div>
        </div>
        `;
    }

    var iterador = 0;
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
            const { title, artist, cover, audio } = song;
            const musicCard = document.createElement("div");
            musicCard.classList.add("song-container");
            musicCard.setAttribute("songName", title);
            // Crear iterador autoincremental para poder distinguir las canciones
            // ! Ahora podremos llamar a cada canción por su iterador (posición en el json))

            musicCard.innerHTML = `
                <figure class="song-cover-container">
                    <img class="song-cover" src="./images/${cover}" alt="Song Cover">
                    <a id="play-icon" alt="Play Icon" onclick="openMusicPlayer(${iterador})"></a>
                </figure>
                <p class="song-description">
                    ${title}
                </p>
                <p class="song-author">
                    ${artist}
                </p>
                <div class="liked-container">
                </div>
            `;
            if(isAuthenticated === "true"){
                const likedIcon = getLikeDisplayIcon(title);
                const likedIconElement = `<img src="${likedIcon}" class="liked-icon" onClick="toggleLike('${title}')"/>`;
                const likedContainer = musicCard.querySelector(".liked-container");
                likedContainer.innerHTML = likedIconElement;
                const likedTextContainer = musicCard.querySelector(".liked-icon");
                likedTextContainer.addEventListener("click", () => {
                    const likedIcon = getLikeDisplayIcon(title);
                    likedTextContainer.src = likedIcon;
                });
            }
            playlistMusicContainer.appendChild(musicCard);
            // Aumentamos el iterador autoincremental
            iterador += 1;
        });
        if(playlistsContainer != null) {
            playlistsContainer.appendChild(playlistContainer);
        } 
    });
}


// ! When song play button is clicked, we add the audio player to class "music-player"
function openMusicPlayer (iterator){
    
    document.documentElement.style.setProperty("--content-height-without-footer", "94vh");
    document.documentElement.style.setProperty("--footer-height", "0vh");
    document.documentElement.style.setProperty("--music-player-original-height", "6vh");
    globalThis.iterator = iterator;
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
              <div class="track-name" id="track-name">${trackName}</div>
              <div class="track-artist" id="track-artist">${trackArtist}</div>
            </div>
    
        <!-- Define the section for displaying track buttons -->
        
            <div class="track-buttons">
                <div class="buttons">
                  <div class="prev-track" onclick="prevTrack()">
                    <i class="fa fa-step-backward fa-1x"></i>
                  </div>
                  <div class="playpause-track" onclick="playpauseTrack()">
                    <i id="music-player-play-icon" class="fa fa-pause-circle fa-2x" color="white"></i>
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
    playpauseTrackExit(iterator); // in here if we touch the pause icon twice, music player will close
    // playpauseTrack(); // in here if we touch the pause icon twice, music player will not close, pause instead
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
    // We change them in the HTML
    document.getElementById("track-name").innerHTML = track_name;
    document.getElementById("track-artist").innerHTML = track_artist;

   
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
    // playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    const playIcon = document.getElementById("music-player-play-icon");
    if (playIcon.classList.contains("fa-play-circle")) {
        playIcon.classList.remove("fa-play-circle");
        playIcon.classList.add("fa-pause-circle");
    } else {
        playIcon.classList.remove("fa-pause-circle");
        playIcon.classList.add("fa-play-circle");
    }
}

function playpauseTrackExit(iterator) {
    // Switch between playing and pausing
    // depending on the current state
    if (!isPlaying) {
        playTrack();
        document.documentElement.style.setProperty("--play-pause-icon", "url(../images/pause.svg)");
        TRACKS.forEach(track => {
            document.getElementsByClassName("searchbar-button play-button")[track.id].innerHTML = '<img src="./images/pause.svg" alt="pause-button">';
        });
        
    }
    else {
        exitTrack();
        // Replace icon with the pause icon
        playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
        document.documentElement.style.setProperty("--play-pause-icon", "url(../images/play.svg)");
        TRACKS.forEach(track => {
            document.getElementsByClassName("searchbar-button play-button")[track.id].innerHTML = '<img src="./images/play.svg" alt="play-button">';
        });
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
    if (iterator < TRACKS.length - 1) iterator += 1;
    else iterator = 0;

    // Load and play the new track
    loadTrack(iterator);
    playTrack();
}
   
function prevTrack() {
    // Go back to the last track if the
    // current one is the first in the track list
    if (iterator > 0) iterator -= 1;
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
    var volumeSlider = document.getElementById("volume_slider");
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
    if (!isNaN(curr_track.duration) && seekSlider != null && seekSlider != undefined && seekPosition != null && seekPosition != undefined) {
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

const deletePlaylist = (playlistName) => {
    const user = JSON.parse(localStorage.getItem('user'));
    let playlists = user.playlists;
    let newPlaylists = [];
    playlists.forEach(playlist => {
        if (playlist.name != playlistName) {
            newPlaylists.push(playlist);
        }
    });
    user.playlists = newPlaylists;
    localStorage.setItem('user', JSON.stringify(user));
}

const deleteSongFromPlaylist = (playlistName, songName) => {
    const user = JSON.parse(localStorage.getItem('user'));
    let playlists = user.playlists;
    // delete song from playlist
    playlists.forEach(playlist => {
        if (playlist.name === playlistName) {
            playlist.songs = playlist.songs.filter(song => song !== songName);
        }
    });
    // update user
    user.playlists = playlists;
    localStorage.setItem('user', JSON.stringify(user));
}


/* My liked songs creator */
const createLikedSongs = () => {
    const myListsContainer = document.getElementById("likedSongs-container");
    const user = JSON.parse(localStorage.getItem("user"));
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const likedSongs = user.likedSongs;
    console.log("hi")
    const playlistContainer = document.createElement("div");
    playlistContainer.classList.add("music-genre-container");
    playlistContainer.innerHTML = `
        <h2 class="music-genre-title">Liked songs</h2>
        <br><br><br>
        <div class="music-genre-songs-container">
        </div>`;
    
    const songsContainer = playlistContainer.querySelector(".music-genre-songs-container");

    const playlistSongs = likedSongs;
    var iterador = 0;
    playlistSongs.forEach((songName) => {
        const {artist, cover} = getSongInformation(songName);
        const musicCard = document.createElement("div");
        musicCard.classList.add("song-container");

        // We loop through the songs and if the name corresponds to the song we are looking for, get the id
        var selectedSongId = 0;
        for (var i = 0; i < TRACKS.length; i++) {
            if (TRACKS[i].title == songName) {
                selectedSongId = TRACKS[i].id;
            }
        }
        
        

        const likedIcon = getLikeDisplayIcon(songName);
        // Crear iterador autoincremental para poder distinguir las canciones
        // ! Ahora podremos llamar a cada canción por su iterador (posición en el json)) 
        musicCard.innerHTML = `
            <figure class="song-cover-container">
                <img class="song-cover" src="./images/${cover}" alt="Song Cover">
                <a id="play-icon" alt="Play Icon" onclick="openMusicPlayer(${selectedSongId})"></a>
            </figure>
            <p class="song-description">
                ${songName}
            </p>
            <p class="song-author">
                ${artist}
            </p>
            <div class="liked-container">
            </div>
            
        `;

        

        if(isAuthenticated === "true"){
            const likedIconElement = `<img src="${likedIcon}" class="liked-icon" onClick="toggleLike('${songName}')"/>`;
            const likedContainer = musicCard.querySelector(".liked-container");
            likedContainer.innerHTML = likedIconElement;
            const likedTextContainer = musicCard.querySelector(".liked-icon");
            likedTextContainer.addEventListener("click", () => {
                const likedIcon = getLikeDisplayIcon(songName);
                likedTextContainer.src = likedIcon;
            });
        }
        songsContainer.appendChild(musicCard);
        // Aumentamos el iterador autoincremental
        iterador += 1;
    })
    if(playlistContainer != null) {
        playlistContainer.appendChild(songsContainer);
    } 
    if(myListsContainer != null) {
        myListsContainer.appendChild(playlistContainer);
    } 
    
}

/* My Playlists & Playlist Creator */
const createMyLists = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    
    if (isAuthenticated === "true") {
        const user = JSON.parse(localStorage.getItem("user"));
        const playlists = user.playlists;

        if (playlists.length == 0) {
            myListsContainer.innerHTML = `
                <h2 class="music-genre-title">No tienes listas creadas</h2>
                <button onClick="goToPlaylistCreator()" class="btn-default">Crear lista</button>
            `;
        } else {
            playlists.forEach((playlist) => {
                const playlistName = playlist.name;

                const playlistContainer = document.createElement("div");
                playlistContainer.classList.add("music-genre-container");
                playlistContainer.innerHTML = `
                    <h2 class="music-genre-title">${playlistName}&nbsp;&nbsp;</h2><h3 class="delete-playlist">Eliminar</h3>
                    <br><br><br>
                    <div class="music-genre-songs-container">
                    </div>`;
                const deletePlaylistButton = playlistContainer.querySelector(".delete-playlist");
                deletePlaylistButton.addEventListener("click", () => {
                    deletePlaylist(playlistName);
                    playlistContainer.remove();
                });

                const songsContainer = playlistContainer.querySelector(".music-genre-songs-container");

                const playlistSongs = playlist.songs;
                var iterador = 0;
                playlistSongs.forEach((songName) => {
                    const {artist, cover} = getSongInformation(songName);
                    const musicCard = document.createElement("div");
                    musicCard.classList.add("song-container");

                    // We loop through the songs and if the name corresponds to the song we are looking for, get the id
                    var selectedSongId = 0;
                    for (var i = 0; i < TRACKS.length; i++) {
                        if (TRACKS[i].title == songName) {
                            selectedSongId = TRACKS[i].id;
                        }
                    }
                    console.log(selectedSongId);

                    const likedIcon = getLikeDisplayIcon(songName);
                    // Crear iterador autoincremental para poder distinguir las canciones
                    // ! Ahora podremos llamar a cada canción por su iterador (posición en el json)) 
                    musicCard.innerHTML = `
                        <figure class="song-cover-container">
                            <img class="song-cover" src="./images/${cover}" alt="Song Cover">
                            <a id="play-icon" alt="Play Icon" onclick="openMusicPlayer(${selectedSongId})"></a>
                        </figure>
                        <p class="song-description">
                            ${songName}
                        </p>
                        <p class="song-author">
                            ${artist}
                        </p>
                        <div class="liked-container">
                        </div>
                        <div class="delete-song">
                            <p>Eliminar</p>
                        </div>
                    `;

                    const deleteSong = musicCard.querySelector(".delete-song");
                    deleteSong.addEventListener("click", () => {
                        deleteSongFromPlaylist(playlistName, songName);
                        musicCard.remove();
                    });

                    if(isAuthenticated === "true"){
                        const likedIconElement = `<img src="${likedIcon}" class="liked-icon" onClick="toggleLike('${songName}')"/>`;
                        const likedContainer = musicCard.querySelector(".liked-container");
                        likedContainer.innerHTML = likedIconElement;
                        const likedTextContainer = musicCard.querySelector(".liked-icon");
                        likedTextContainer.addEventListener("click", () => {
                            const likedIcon = getLikeDisplayIcon(songName);
                            likedTextContainer.src = likedIcon;
                        });
                    }
                    songsContainer.appendChild(musicCard);
                    // Aumentamos el iterador autoincremental
                    iterador += 1;
                })
                if(playlistContainer != null) {
                    playlistContainer.appendChild(songsContainer);
                } 
                if(myListsContainer != null) {
                    myListsContainer.appendChild(playlistContainer);
                } 
            });
        }
    } else {
        if (myListsContainer != null) {
            myListsContainer.innerHTML = `
                <h2 class="music-genre-title">Debes iniciar sesión para poder crear tus propias listas</h2>
                <button onClick="goToLogin()" class="btn-default">Iniciar sesión</button>
            `;
        }
    }
}

const userPlaylistExists = (userPlaylists, newPlaylistName) => {
    let exists = false;
    userPlaylists.forEach(playlist => {
        if (playlist.name === newPlaylistName) {
            exists = true;
        }
    });
    return exists;
}

const modifyUserPlaylists = (e) => {
    e.preventDefault();
    const addedSongsContainer = document.getElementById("playlist-creator-added-songs");

    const user = JSON.parse(localStorage.getItem("user"));
    const playlists = user.playlists;
    const playlistName = document.getElementById("playlist-title").value;
    const addedSongs = addedSongsContainer.querySelectorAll("li");
    
    const songs = [];
    addedSongs.forEach((song) => {
        songs.push(song.textContent);
    });

    // avoid creating two playlists with the same name
    if(userPlaylistExists(playlists, playlistName) === false) {
        const newPlaylist = {
            name: playlistName,
            songs: songs
        }

        playlists.push(newPlaylist);
        user.playlists = playlists;
    } else {
        playlists.forEach(playlist => {
            if (playlist.name === playlistName) {
                playlist.songs = songs;
            }
        });
    }

    localStorage.setItem("user", JSON.stringify(user));
}

const isSongInList = (title) => {
    const addedSongsContainer = document.getElementById("playlist-creator-added-songs");
    const addedSongs = addedSongsContainer.querySelectorAll("li");
    let isSongInList = false;
    addedSongs.forEach((song) => {
        if (song.textContent === title) {
            isSongInList = true;
        }
    });
    return isSongInList;
}

const addSongToPlaylist = (title) => {
    if (isSongInList(title) === false){
        const addedSongsContainer = document.getElementById("playlist-creator-added-songs");
        let addedSong = document.createElement("li");
        addedSong.classList.add("playlist-creator-added-song");
        addedSong.innerHTML = title;
        addedSongsContainer.appendChild(addedSong);
    }
}



const searchSongForPlaylist = () => {
    const searchbarInput = document.getElementById("playlist-creator-searchbar");
    const searchValue = searchbarInput.value.toLowerCase();

    let searchResultsList = document.getElementById("playlist-creator-results");
    searchResultsList.innerHTML = "";

    if (searchValue != "") {
        TRACKS.forEach(track => {
            const trackName = track.title.toLowerCase();

            if (trackName.includes(searchValue)) {
                const searchResult = document.createElement("li");
                searchResult.className = "playlist-creator-search-result";
                searchResult.innerHTML = `
                    ${track.title}
                `;

                searchResult.addEventListener("click", () => {
                    addSongToPlaylist(track.title);
                    searchbarInput.value = "";
                    searchResultsList.innerHTML = "";
                })

                searchResultsList.appendChild(searchResult);
            }
        });
    }
}

const handleSingUpLogIn = () => {
    if (signUpForm !== null) {
        signUpForm.addEventListener("submit", (event) => signUp(event));
        selectImageButton.addEventListener("click", () => selectImageInput.click());
    } else if (loginForm !== null) {
        loginForm.addEventListener("submit", (event) => login(event));
    }
}

function openHamburgerMenu() {
    // Si solo si el tamaño de la pantalla es menor a 600px
    if (window.innerWidth < 600) {
        navbarHamburgerMenu = document.getElementById("hamburguer-menu-options");
        maxProfileHeight = navbarHamburgerMenu.style.maxHeight;
        // if navProfileOptions maxHeight style is 0, then set it to auto else set it to 0
        navbarHamburgerMenu.style.maxHeight = (maxProfileHeight === "0px" || maxProfileHeight === "") ? "270px" : "0px";
    }
}

// check if the dom is loaded
document.addEventListener("DOMContentLoaded", () => {
    const playlistCreatorForm = document.getElementById("playlist-creator-form");
    const editProfileForm = document.getElementById("edit-profile-form");
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    

    handleSingUpLogIn();

    setNavbarLinks();
    setPlaylistsInHome();

    if(playlistCreatorForm != null) {
        playlistCreatorForm.addEventListener("submit", (e) => modifyUserPlaylists(e));
    }

    if(editProfileForm != null) {
        editProfileForm.addEventListener("submit", (e) => modifyProfile(e));
    }

    if (myListsContainer != null) createMyLists();
    if(isAuthenticated === "true") createLikedSongs();
});
