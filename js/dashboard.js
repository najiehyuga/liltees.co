// ================================
// Dashboard Lil Tees
// ================================

async function loadDashboard() {

    // Ambil semua produk
    const { data, error } = await db
        .from("products")
        .select("*");

    if (error) {
        console.error(error);
        return;
    }

    // ===========================
    // Total Produk
    // ===========================

    document.getElementById("totalProducts").textContent =
        data.length;

    // ===========================
    // Total Stock
    // ===========================

    let totalStock = 0;

    data.forEach(product => {

        totalStock += Number(product.stock);

    });

    document.getElementById("totalStock").textContent =
        totalStock;

    // ===========================
    // Produk Aktif
    // ===========================

    const activeProducts =
        data.filter(product => product.is_active === true);

    document.getElementById("activeProducts").textContent =
        activeProducts.length;

}

// ================================
// Logout
// ================================

document
.getElementById("logoutBtn")
.addEventListener("click", async () => {

    await db.auth.signOut();

    location.href = "login.html";

});

// ================================
// Jalankan Dashboard
// ================================

loadDashboard();