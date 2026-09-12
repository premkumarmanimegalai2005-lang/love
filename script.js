const API_URL = "https://love-backend-ak0f.onrender.com";

let isRegisterMode = true;

const form = document.getElementById("authForm");
const title = document.getElementById("formTitle");
const submitButton = document.getElementById("submitButton");
const switchText = document.getElementById("switchText");
const switchButton = document.getElementById("switchButton");
const message = document.getElementById("message");

switchButton.addEventListener("click", function () {
    isRegisterMode = !isRegisterMode;

    if (isRegisterMode) {
        title.textContent = "Create Account";
        submitButton.textContent = "Register";
        switchText.textContent = "Already have an account?";
        switchButton.textContent = "Login";
    } else {
        title.textContent = "Login";
        submitButton.textContent = "Login";
        switchText.textContent = "Don't have an account?";
        switchButton.textContent = "Register";
    }

    message.textContent = "";
});

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const url = isRegisterMode
        ? API_URL + "/register"
        : API_URL + "/login";

    message.textContent = "Please wait...";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await response.json();

        message.textContent = data.message;

        if (data.status === "Success") {
            if (isRegisterMode) {
                message.textContent = "Account created successfully. Now login.";
            } else {
                window.location.href = "success.html";
            }
        }
    } catch (error) {
        message.textContent = "Backend connection failed";
        console.log(error);
    }
});
