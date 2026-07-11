// ===============================
// MODAL
// ===============================

const modal = document.getElementById("productModal");

document
.getElementById("addProductBtn")
.onclick = () => {
    modal.style.display = "flex";
};

document
.getElementById("closeModal")
.onclick = () => {
    modal.style.display = "none";
};

window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
};

// ===============================
// LOAD PRODUCTS
// ===============================

async function loadProducts(){

    const { data, error } =
    await db
    .from("products")
    .select("*")
    .order("id");

    if(error){
        console.log(error);
        return;
    }

    const container =
    document.getElementById("productContainer");

    container.innerHTML = "";

    data.forEach(product=>{

        container.innerHTML += `

        <div class="product-card">

            <img src="${
                product.front_image ||
                "../images/no-image.png"
            }">

            <div class="product-body">

                <h3>${product.name}</h3>

                <p class="product-desc">
                    ${product.description || "-"}
                </p>

                <div class="product-price">
                    Rp ${Number(product.price).toLocaleString("id-ID")}
                </div>

                <div class="product-stock">

                    📦 Stock :
                    ${product.stock}

                </div>

                <div class="product-actions">

                    <button
                    class="action-btn edit-btn">

                    ✏ Edit

                    </button>

                    <button
                    class="action-btn delete-btn">

                    🗑 Delete

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

loadProducts();

// ===============================
// ADD PRODUCT
// ===============================

document
.getElementById("productForm")
.addEventListener("submit", async (e)=>{

    e.preventDefault();

    const product = {

        name: document.getElementById("name").value,

        price: Number(document.getElementById("price").value),

        stock: Number(document.getElementById("stock").value),

        description: document.getElementById("description").value,

        front_image: null,

        back_image: null,

        size_chart: null,

        is_active: document.getElementById("active").checked

    };

    const { error } =
    await db
    .from("products")
    .insert(product);

    if(error){

        alert(error.message);

        return;

    }

    alert("Product berhasil ditambahkan.");

    modal.style.display = "none";

    document.getElementById("productForm").reset();

    loadProducts();

});

// ===============================
// LOGOUT
// ===============================

document
.getElementById("logoutBtn")
.addEventListener("click", async ()=>{

    await db.auth.signOut();

    location.href = "login.html";

});