const sidebar = document.getElementById("sidebar");

const toggle = document.getElementById("toggleSidebar");

toggle.onclick = () => {

    sidebar.classList.toggle("collapsed");

};