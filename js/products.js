// ======================================
// ELEMENT
// ======================================

const modal = document.getElementById("productModal");

const addProductBtn = document.getElementById("addProductBtn");

const closeModal = document.getElementById("closeModal");

const productContainer = document.getElementById("productContainer");

const productForm = document.getElementById("productForm");

// ======================================
// MODAL
// ======================================

addProductBtn.onclick = () => {

    modal.style.display = "flex";

};

closeModal.onclick = () => {

    modal.style.display = "none";

};

window.onclick = (e) => {

    if (e.target === modal) {

        modal.style.display = "none";

    }

};

// ======================================
// PREVIEW IMAGE
// ======================================

previewImage("frontImage", "frontPreview");

previewImage("backImage", "backPreview");

previewImage("sizeChart", "sizePreview");

function previewImage(inputId, previewId){

    const input = document.getElementById(inputId);

    const preview = document.getElementById(previewId);

    if(!input || !preview) return;

    input.addEventListener("change", () => {

        const file = input.files[0];

        if(!file){

            preview.src = "../images/no-image.png";

            return;

        }

        preview.src = URL.createObjectURL(file);

    });

}

// ======================================
// LOAD PRODUCTS
// ======================================

async function loadProducts(){

    const { data, error } = await db

        .from("products")

        .select("*")

        .order("id");

    if(error){

        console.error(error);

        return;

    }

    productContainer.innerHTML = "";

    if(data.length === 0){

        productContainer.innerHTML = `

            <div class="empty">

                <h2>Belum ada produk.</h2>

                <p>Klik "Tambah Produk" untuk mulai.</p>

            </div>

        `;

        return;

    }

    data.forEach(product=>{

        productContainer.innerHTML += `

            <div class="product-card">

                <img
                    src="${product.front_image || "../images/no-image.png"}"
                    alt="${product.name}">

                <div class="product-info">

                    <h3>${product.name}</h3>

                    <p>${product.description || "-"}</p>

                    <h4>

                        Rp ${Number(product.price).toLocaleString("id-ID")}

                    </h4>

                    <span>

                        Stock : ${product.stock}

                    </span>

                    <div class="product-action">

                        <button class="edit-btn">

                            Edit

                        </button>

                        <button class="delete-btn">

                            Hapus

                        </button>

                    </div>

                </div>

            </div>

        `;

    });

}

// ======================================
// SIMPAN PRODUK
// ======================================

productForm.addEventListener("submit", async(e)=>{

    e.preventDefault();

    alert("Upload gambar akan kita kerjakan pada tahap berikutnya 😊");

});

// ======================================
// LOGOUT
// ======================================

document

.getElementById("logoutBtn")

.addEventListener("click", async()=>{

    await db.auth.signOut();

    location.href = "login.html";

});

// ======================================

loadProducts();