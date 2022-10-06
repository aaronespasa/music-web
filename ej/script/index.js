const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMessageContainer = document.getElementById("error-message-container");
const errorMessage = document.getElementById("error-message");
const signUpForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");

const USERNAME_MIN_LENGTH = 5;
const PASSWORD_MIN_LENGTH = 8;

const createErrorMessage = (message) => {
    errorMessageContainer.style.display = "block";

    // create a text node
    const textParagraph = document.createElement("p")
    const textNode = document.createTextNode(message);
    textParagraph.appendChild(textNode);

    textParagraph.className = "error-message";

    // append the text node to the error message
    errorMessageContainer.appendChild(textParagraph);
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

const signUp = (event) => {
    event.preventDefault();

    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    if (validateUsername(username) && validatePassword(password)) {
        const user = {
            "username": username,
            "email": email,
            "password": password
        }

        // save user to the localstorage
        localStorage.setItem("user", JSON.stringify(user));

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
        window.location.href = "index.html";
    } else {
        createErrorMessage("El usuario o la contraseña son incorrectos");
    }
}

if (signUpForm !== null) {
    signUpForm.addEventListener("submit", (event) => signUp(event));
} else if (loginForm !== null) {
    loginForm.addEventListener("submit", (event) => login(event));
}