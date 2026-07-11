const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    const { error } = await db.auth.signInWithPassword({

        email,
        password

    });

    if (error) {

        showMessage(error.message, "error");

        return;

    }

    location.href = "dashboard.html";

});

function showMessage(message, type) {

    let msg = document.getElementById("message");

    if (!msg) {

        msg = document.createElement("div");

        msg.id = "message";

        document.querySelector(".login-card").appendChild(msg);

    }

    msg.textContent = message;

    msg.className = type;


}