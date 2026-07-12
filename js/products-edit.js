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

previewImage("frontImage", "frontPreview");

previewImage("backImage", "backPreview");

function previewImage(inputId, previewId){

    const input = document.getElementById(inputId);

    const preview = document.getElementById(previewId);

    input.addEventListener("change", ()=>{

        const file = input.files[0];

        if(!file) return;

        preview.src = URL.createObjectURL(file);

        preview.style.display = "block";

    });

}

// ======================================
// UPLOAD IMAGE
// ======================================

async function uploadImage(file, folder){

    if(!file) return null;

    const ext = file.name.split(".").pop();

    const fileName = `${folder}/${crypto.randomUUID()}.${ext}`;

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
// UPDATE PRODUCT
// ======================================

form.addEventListener("submit", async(e)=>{

    e.preventDefault();

    const saveButton = document.querySelector(".save-btn");

    saveButton.disabled = true;

    saveButton.textContent = "Mengupdate...";

    try{

        let frontUrl = oldFrontImage;

        let backUrl = oldBackImage;

        // ==========================
        // FRONT IMAGE
        // ==========================

        const frontFile = document

            .getElementById("frontImage")

            .files[0];

        if(frontFile){

            frontUrl = await uploadImage(

                frontFile,

                "front"

            );

        }

        // ==========================
        // BACK IMAGE
        // ==========================

        const backFile = document

            .getElementById("backImage")

            .files[0];

        if(backFile){

            backUrl = await uploadImage(

                backFile,

                "back"

            );

        }

        // ==========================
        // UPDATE DATABASE
        // ==========================

        const { error } = await db

            .from("products")

            .update({

                name:document.getElementById("name").value,

                price:Number(

                    document.getElementById("price").value

                ),

                stock:Number(

                    document.getElementById("stock").value

                ),

                description:

                    document.getElementById("description").value,

                front_image:frontUrl,

                back_image:backUrl,

                is_active:

                    document.getElementById("status").value==="true"

            })

            .eq("id",productId);

        if(error){

            throw error;

        }

        alert("Produk berhasil diperbarui.");

        location.replace("products.html");

    }

    catch(err){

        console.error(err);

        alert(err.message);

    }

    finally{

        saveButton.disabled=false;

        saveButton.textContent="Update Produk";

    }

});