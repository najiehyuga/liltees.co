// ======================================
// PRODUCTS.JS
// LIL TEES ADMIN
// ======================================

// Container Product
const productContainer = document.getElementById("productContainer");

// ======================================
// LOAD PRODUCTS
// ======================================

async function loadProducts() {

    productContainer.innerHTML = `
        <div class="empty">
            <p>Loading products...</p>
        </div>
    `;

    const { data, error } = await db
        .from("products")
        .select("*")
        .order("id", { ascending: false });

    if (error) {

        console.error(error);

        productContainer.innerHTML = `
            <div class="empty">
                <p>Gagal mengambil data produk.</p>
            </div>
        `;

        return;
    }

    if (!data || data.length === 0) {

        productContainer.innerHTML = `
            <div class="empty">
                <h3>Belum ada produk</h3>
                <p>Silakan tambahkan produk baru.</p>
            </div>
        `;

        return;
    }

    renderProducts(data);

}

// ======================================
// RENDER PRODUCT
// ======================================

function renderProducts(products) {

    productContainer.innerHTML = "";

    products.forEach(product => {

        productContainer.innerHTML += `

        <div class="product-card">

            <img
                src="${product.front_image || "../images/no-image.png"}"
                alt="${product.name}">

            <div class="product-info">

                <h3>${product.name}</h3>

                <p>${product.description || "-"}</p>

                <h2>
                    Rp ${Number(product.price).toLocaleString("id-ID")}
                </h2>

                <div class="product-meta">

                    <span>
                        📦 Stock : ${product.stock}
                    </span>

                    <span class="${product.is_active ? "active" : "inactive"}">

                        ${product.is_active ? "Active" : "Non Active"}

                    </span>

                </div>

                <div class="product-action">

                    <button
                        class="edit-btn"
                        onclick="editProduct(${product.id})">

                        Edit

                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteProduct(${product.id})">

                        Hapus

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

// ======================================
// EDIT PRODUCT
// ======================================

function editProduct(id){

    location.href = `product-edit.html?id=${id}`;

}

// ======================================
// DELETE PRODUCT
// ======================================

async function deleteProduct(id){

    const confirmDelete = confirm(
        "Yakin ingin menghapus produk ini?"
    );

    if(!confirmDelete) return;

    const { error } = await db

        .from("products")

        .delete()

        .eq("id", id);

    if(error){

        alert(error.message);

        return;

    }

    loadProducts();

}

// ======================================
// LOGOUT
// ======================================

document
.getElementById("logoutBtn")
.addEventListener("click", async () => {

    await db.auth.signOut();

    location.replace("login.html");

});

// ======================================
// START
// ======================================

loadProducts();