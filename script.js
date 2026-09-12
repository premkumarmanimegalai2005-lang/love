const API_URL = "https://love-backend-ak0f.onrender.com";

let isRegisterMode = false;

const form = document.getElementById("authForm");
const title = document.getElementById("formTitle");
const description = document.getElementById("formDescription");
const submitButton = document.getElementById("submitButton");
const switchText = document.getElementById("switchText");
const switchButton = document.getElementById("switchButton");
const message = document.getElementById("message");

switchButton.addEventListener("click", function () {

    isRegisterMode = !isRegisterMode;

    message.textContent = "";
    form.reset();

    if (isRegisterMode) {

        title.textContent = "Create Account ❤️";
        description.textContent = "Create your new account";

        submitButton.textContent = "Register";

        switchText.textContent = "Already have an account?";
        switchButton.textContent = "Login";

    } else {

        title.textContent = "Login ❤️";
        description.textContent = "Login to continue";

        submitButton.textContent = "Login";

        switchText.textContent = "Don't have an account?";
        switchButton.textContent = "Create Account";

    }

});

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (username === "" || password === "") {
        message.textContent = "Please fill all fields";
        return;
    }

    const url = isRegisterMode
        ? API_URL + "/register"
        : API_URL + "/login";

    submitButton.disabled = true;
    message.textContent = "Please wait...";

    try {

        const response = await fetch(url, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
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

                message.textContent =
                    "Account created successfully. Please login.";

                isRegisterMode = false;

                title.textContent = "Login ❤️";
                description.textContent = "Login to continue";

                submitButton.textContent = "Login";

                switchText.textContent = "Don't have an account?";
                switchButton.textContent = "Create Account";

                form.reset();

            } else {

                window.location.href = "success.html";

            }

        }

    } catch (error) {

        console.error(error);

        message.textContent =
            "Backend connection failed. Please try again.";

    }

    submitButton.disabled = false;

});
