// ======================================
// PREVIEW IMAGE
// ======================================

previewImage("frontImage", "frontPreview");
previewImage("backImage", "backPreview");

function previewImage(inputId, previewId){

    const input = document.getElementById(inputId);

    const preview = document.getElementById(previewId);

    input.addEventListener("change", ()=>{

        const file = input.files[0];

        if(!file) return;

        preview.src = URL.createObjectURL(file);

    });

}

// ======================================
// UPLOAD IMAGE
// ======================================

async function uploadImage(file){

    if(!file) return null;

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await db.storage

        .from("products")

        .upload(fileName, file);

    if(error){

        throw error;

    }

    const { data } = db.storage

        .from("products")

        .getPublicUrl(fileName);

    return data.publicUrl;

}

// ======================================
// SIMPAN PRODUK
// ======================================

const form = document.getElementById("productForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const saveButton = form.querySelector("button");

    saveButton.disabled = true;
    saveButton.textContent = "Menyimpan...";

    const { error } = await db

        .from("products")

        .insert({

            name: document.getElementById("name").value,

            price: Number(document.getElementById("price").value),

            stock: Number(document.getElementById("stock").value),

            description: document.getElementById("description").value,

            is_active:
                document.getElementById("status").value === "true"

        });

    saveButton.disabled = false;
    saveButton.textContent = "Simpan Produk";

    if (error) {

        console.error(error);

        alert(error.message);

        return;

    }

    alert("Produk berhasil ditambahkan.");

    location.replace("products.html");

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