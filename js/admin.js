// ======================================
// SIDEBAR TOGGLE
// ======================================

const sidebar = document.getElementById("sidebar");

const toggleBtn = document.getElementById("toggleSidebar");

if(sidebar && toggleBtn){

    // ==========================
    // LOAD STATUS
    // ==========================

    if(localStorage.getItem("sidebar") === "collapsed"){

        sidebar.classList.add("collapsed");

    }

    // ==========================
    // TOGGLE
    // ==========================

    toggleBtn.addEventListener("click", ()=>{

        sidebar.classList.toggle("collapsed");

        if(sidebar.classList.contains("collapsed")){

            localStorage.setItem("sidebar","collapsed");

        }

        else{

            localStorage.setItem("sidebar","expanded");

        }

    });

}

// ======================================
// LOGOUT
// ======================================

const logoutBtn = document.getElementById("logoutBtn");

if(logoutBtn){

    logoutBtn.addEventListener("click", async()=>{

        const confirmLogout = confirm("Yakin ingin logout?");

        if(!confirmLogout) return;

        await db.auth.signOut();

        localStorage.removeItem("sidebar");

        location.href="login.html";

    });

}