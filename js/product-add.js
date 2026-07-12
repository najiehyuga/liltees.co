// ======================================
// SIMPAN PRODUK
// ======================================

const form = document.getElementById("productForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const saveButton = form.querySelector(".save-btn");

    saveButton.disabled = true;
    saveButton.textContent = "Menyimpan...";

    try{

        // Upload gambar
        const frontImage = document.getElementById("frontImage").files[0];

        const backImage = document.getElementById("backImage").files[0];

        const frontUrl = await uploadImage(frontImage);

        const backUrl = await uploadImage(backImage);

        // Simpan ke database
        const { error } = await db

            .from("products")

            .insert({

                name: document.getElementById("name").value,

                price: Number(document.getElementById("price").value),

                stock: Number(document.getElementById("stock").value),

                description: document.getElementById("description").value,

                front_image: frontUrl,

                back_image: backUrl,

                is_active:

                    document.getElementById("status").value === "true"

            });

        if(error){

            throw error;

        }

        alert("Produk berhasil ditambahkan.");

        location.replace("products.html");

    }

    catch(err){

        console.error(err);

        alert(err.message);

    }

    finally{

        saveButton.disabled = false;

        saveButton.textContent = "Simpan Produk";

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