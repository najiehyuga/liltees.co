// ======================================
// PREVIEW IMAGE
// ======================================

previewImage("frontImage", "frontPreview");
previewImage("backImage", "backPreview");
previewImage("sizeChart", "sizePreview");

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

form.addEventListener("submit", async(e)=>{

    e.preventDefault();

    try{

        const frontUrl = await uploadImage(

            document.getElementById("frontImage").files[0]

        );

        const backUrl = await uploadImage(

            document.getElementById("backImage").files[0]

        );

        const sizeUrl = await uploadImage(

            document.getElementById("sizeChart").files[0]

        );

        const { error } = await db

            .from("products")

            .insert({

                name: document.getElementById("name").value,

                description: document.getElementById("description").value,

                price: Number(

                    document.getElementById("price").value

                ),

                stock: Number(

                    document.getElementById("stock").value

                ),

                front_image: frontUrl,

                back_image: backUrl,

                size_chart: sizeUrl,

                is_active:

                    document.getElementById("status").value === "true"

            });

        if(error){

            throw error;

        }

        alert("Produk berhasil ditambahkan.");

        location.href = "products.html";

    }

    catch(err){

        console.error(err);

        alert(err.message);

    }

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