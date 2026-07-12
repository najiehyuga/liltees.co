// ======================================
// PREVIEW IMAGE
// ======================================

previewImage("frontImage", "frontPreview");
previewImage("backImage", "backPreview");

function previewImage(inputId, previewId) {

    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);

    console.log(input);
    console.log(preview);

    if (!input || !preview) return;

    input.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";

    });

}

// ======================================
// UPLOAD IMAGE
// ======================================

async function uploadImage(file, folder) {

    if (!file) return null;

    const ext = file.name.split(".").pop();

    const fileName = `${folder}/${crypto.randomUUID()}.${ext}`;

    const { error } = await db.storage

        .from("products")

        .upload(fileName, file);

    if (error) {

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

    const saveButton = document.querySelector(".save-btn");

    saveButton.disabled = true;
    saveButton.textContent = "Menyimpan...";

    try {

        // ===============================
        // Upload Front Image
        // ===============================

        const frontFile = document
            .getElementById("frontImage")
            .files[0];

        const frontUrl = await uploadImage(
            frontFile,
            "front"
        );

        // ===============================
        // Upload Back Image
        // ===============================

        const backFile = document
            .getElementById("backImage")
            .files[0];

        const backUrl = await uploadImage(
            backFile,
            "back"
        );

        // ===============================
        // Insert Database
        // ===============================

        const { error } = await db

            .from("products")

            .insert({

                name: document.getElementById("name").value,

                price: Number(
                    document.getElementById("price").value
                ),

                stock: Number(
                    document.getElementById("stock").value
                ),

                description:
                    document.getElementById("description").value,

                front_image: frontUrl,

                back_image: backUrl,

                is_active:

                    document.getElementById("status").value === "true"

            });

        if (error) {

            throw error;

        }

        alert("Produk berhasil ditambahkan.");

        location.replace("products.html");

    }

    catch (err) {

        console.error("FULL ERROR:", err);
    
        alert(JSON.stringify(err, null, 2));
    
    }
    finally {

        saveButton.disabled = false;

        saveButton.textContent = "Simpan Produk";

    }

});