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


const USERNAME_MIN_LENGTH = 5;
const PASSWORD_MIN_LENGTH = 8;

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
    const userImageFile = document.getElementById("input-file").files[0];
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

    // save user to the localstorage
    localStorage.setItem("user", JSON.stringify(user));
}

const signUp = async (event) => {
    event.preventDefault();

    const username = usernameInput.value;
    const email = document.getElementById("email").value;
    const password = passwordInput.value;
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const birthdate = document.getElementById("birthdate").value;
    const userImageFile = document.getElementById("input-file").files[0];
    const reader = new FileReader();
    reader.readAsDataURL(userImageFile);

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



const setNavbarLinks = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    // isAuthenticated default value
    if (isAuthenticated === null) {
        localStorage.setItem("isAuthenticated", false);
    }

    const logoutFunction = `
        localStorage.setItem('isAuthenticated', false);
        window.location.href = 'index.html';
    `

    // Esto hay que crearlo como la imagen del usuario y si se le da click, que te muestre las siguientes opciones
    if (isAuthenticated === "true") {
        navbarLinks.innerHTML = `
            <button onclick="location.href='account.html'" class="sign-log-in-button sign-in-button">
                Cuenta
            </button>
            <button onclick="location.href='profile.html'" class="sign-log-in-button sign-in-button">
                Perfil
            </button>
            <button onclick="${logoutFunction}" class="sign-log-in-button sign-in-button">
                Cerrar Sesión
            </button>`;

    } else {
        navbarLinks.innerHTML = `
            <button onclick="location.href='signup.html'" class="sign-log-in-button sign-in-button">
                Registrarse
            </button>
            <button onclick="location.href='login.html'" class="sign-log-in-button">
                Iniciar Sesión
            </button>`;
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
        const username = user.username, email = user.email, birthdate = user.birthdate, image = user.image;
        profileData.innerHTML = `
        <div class="profile-data">
            <img src="${image}" id="profile-image" alt="profile-image">
        </div>
        <div class="profile-data">
            <p id="profile-data-title">Nombre de usuario</p>
            <p id="profile-data-info">@${username}</p>
            <p id="profile-data-title">Correo electrónico</p>
            <p id="profile-data-info">${email}</p>
            <p id="profile-data-title">Fecha de nacimiento</p>
            <p id="profile-data-info">${birthdate}</p>
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
        const username = user.username, email = user.email, birthdate = user.birthdate, image = user.image;
        
        profileData.innerHTML = `
        <div class="profile-data">
            <img src="${image}" id="profile-image" alt="profile-image">
        </div>
        <div class="profile-data">
            <p id="profile-data-title">Nombre de usuario</p>
            <p id="profile-data-info">@${username}</p>
            <p id="profile-data-title">Correo electrónico</p>
            <p id="profile-data-info">${email}</p>
            <p id="profile-data-title">Fecha de nacimiento</p>
            <p id="profile-data-info">${birthdate}</p>
        </div>
        <hr>`;
        
        // Añadimos el botón de editar perfil
        profileData.innerHTML += `
        <div class="profile-data">
            <button onclick="location.href='edit-profile.html'" class="sign-log-in-button">
                Editar Perfil
            </button>
        </div>`;}

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