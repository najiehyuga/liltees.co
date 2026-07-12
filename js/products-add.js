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