console.log("auth.js loaded");

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    const button = form.querySelector("button");

    button.disabled = true;
    button.textContent = "Loading...";

    const { error } = await db.auth.signInWithPassword({

        email,
        password

    });

    button.disabled = false;
    button.textContent = "Login";

    if (error) {

        showMessage("Email atau password salah.", "error");

        return;

    }

    location.replace("dashboard.html");

});

function showMessage(message, type) {

    const msg = document.getElementById("message");

    msg.textContent = message;

    msg.className = type;

}