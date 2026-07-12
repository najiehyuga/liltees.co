// ======================================
// GET PRODUCT ID
// ======================================

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

if (!productId) {

    alert("Produk tidak ditemukan.");

    location.replace("products.html");

}

// ======================================
// ELEMENT
// ======================================

const form = document.getElementById("productForm");

const frontPreview = document.getElementById("frontPreview");

const backPreview = document.getElementById("backPreview");

// ======================================
// OLD IMAGE
// ======================================

let oldFrontImage = "";

let oldBackImage = "";

// ======================================
// LOAD PRODUCT
// ======================================

async function loadProduct() {

    const { data, error } = await db

        .from("products")

        .select("*")

        .eq("id", productId)

        .single();

    if (error) {

        console.error(error);

        alert("Produk tidak ditemukan.");

        location.replace("products.html");

        return;

    }

    // ===============================
    // INPUT
    // ===============================

    document.getElementById("name").value = data.name;

    document.getElementById("price").value = data.price;

    document.getElementById("stock").value = data.stock;

    document.getElementById("description").value = data.description;

    document.getElementById("status").value = data.is_active.toString();

    // ===============================
    // IMAGE
    // ===============================

    oldFrontImage = data.front_image;

    oldBackImage = data.back_image;

    if (oldFrontImage) {

        frontPreview.src = oldFrontImage;

        frontPreview.style.display = "block";

    }

    if (oldBackImage) {

        backPreview.src = oldBackImage;

        backPreview.style.display = "block";

    }

    // ===============================
    // INFO
    // ===============================

    document.getElementById("productId").textContent = data.id;

    document.getElementById("createdAt").textContent =

        new Date(data.created_at).toLocaleDateString("id-ID");

}

// ======================================
// START
// ======================================

loadProduct();