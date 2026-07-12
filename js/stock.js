// ======================================
// ELEMENT
// ======================================

const stockContainer = document.getElementById("stockContainer");

const searchInput = document.getElementById("searchProduct");

let products = [];

// ======================================
// LOAD PRODUCT
// ======================================

async function loadProducts(){

    const { data, error } = await db

        .from("products")

        .select("*")

        .order("name");

    if(error){

        console.error(error);

        return;

    }

    products = data;

    renderProducts(products);

}

// ======================================
// RENDER PRODUCT
// ======================================

function renderProducts(data){

    stockContainer.innerHTML = "";

    if(data.length === 0){

        stockContainer.innerHTML = `

            <div class="empty">

                <h2>Tidak ada produk.</h2>

            </div>

        `;

        return;

    }

    data.forEach(product=>{

        let badge = "stock-good";

        let status = "🟢 Aman";

        if(product.stock <= 10){

            badge = "stock-low";

            status = "🟡 Menipis";

        }

        if(product.stock <= 0){

            badge = "stock-empty";

            status = "🔴 Habis";

        }

        stockContainer.innerHTML += `

            <div class="stock-card">

                <div class="stock-image">

                    <img
                        src="${product.front_image}"
                        alt="${product.name}">

                </div>

                <div class="stock-info">

                    <h3>

                        ${product.name}

                    </h3>

                    <p>

                        ${status}

                    </p>

                    <span class="stock-status ${badge}">

                        Stock ${product.stock}

                    </span>

                </div>

                <div class="stock-action">

                    <button

                        class="stock-btn"

                        onclick="updateStock(${product.id},-1)">

                        -

                    </button>

                    <div class="stock-value">

                        ${product.stock}

                    </div>

                    <button

                        class="stock-btn"

                        onclick="updateStock(${product.id},1)">

                        +

                    </button>

                </div>

            </div>

        `;

    });

}

// ======================================
// START
// ======================================

loadProducts();