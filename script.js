let isRegisterMode = false;


function switchMode() {

    isRegisterMode = !isRegisterMode;

    let title = document.getElementById("title");
    let button = document.getElementById("submitButton");
    let switchText = document.getElementById("switchText");
    let switchButton = document.getElementById("switchButton");
    let message = document.getElementById("message");

    message.innerHTML = "";

    if (isRegisterMode) {

        title.innerHTML = "Create Account";

        button.innerHTML = "Create Account";

        switchText.innerHTML =
            "Already have an account?";

        switchButton.innerHTML = "Login";

    } else {

        title.innerHTML = "Login";

        button.innerHTML = "Login";

        switchText.innerHTML =
            "Don't have an account?";

        switchButton.innerHTML = "Create Account";
    }
}


async function submitForm() {

    let username =
        document.getElementById("username").value.trim();

    let password =
        document.getElementById("password").value;

    let message =
        document.getElementById("message");


    if (username === "" || password === "") {

        message.innerHTML =
            "Please enter User ID and Password";

        message.style.color = "red";

        return;
    }


    // Username validation
    // Must contain:
    // lowercase letters
    // underscore _
    // number
    // only lowercase letters, numbers and underscore

    let usernamePattern =
        /^(?=.*[a-z])(?=.*_)(?=.*[0-9])[a-z0-9_]+$/;


    if (!usernamePattern.test(username)) {

        message.innerHTML =
            "User ID must contain lowercase letters, _ and numbers";

        message.style.color = "red";

        return;
    }


    let url = isRegisterMode
        ? "http://127.0.0.1:8000/register"
        : "http://127.0.0.1:8000/login";


    try {

        let response = await fetch(url, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                username: username,

                password: password
            })
        });


        let result = await response.json();


        if (result.status === "Success") {

            if (isRegisterMode) {

                message.innerHTML =
                    "Account created successfully!";

                message.style.color = "green";

                document.getElementById("username").value = "";

                document.getElementById("password").value = "";

            } else {

                window.location.href = "success.html";
            }

        } else {

            message.innerHTML = result.message;

            message.style.color = "red";
        }


    } catch (error) {

        message.innerHTML =
            "Backend server is not running";

        message.style.color = "red";
    }
}