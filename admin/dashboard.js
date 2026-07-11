async function loadDashboard(){

    const {
        data:{session}
    } = await db.auth.getSession();

    document.getElementById("adminEmail").textContent =
    session.user.email;

    const { data } =
    await db
        .from("products")
        .select("*");

    document.getElementById("totalProducts").textContent =
    data.length;

    let totalStock = 0;

    data.forEach(item=>{

        totalStock += item.stock || 0;

    });

    document.getElementById("totalStock").textContent =
    totalStock;

}

loadDashboard();

document
.getElementById("logoutBtn")
.addEventListener("click",async()=>{

    await db.auth.signOut();

    location.href="login.html";

});