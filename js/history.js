// ======================================
// ELEMENT
// ======================================

const historyContainer = document.getElementById("historyContainer");

const searchInput = document.getElementById("searchHistory");

let histories = [];

// ======================================
// LOAD HISTORY
// ======================================

async function loadHistory(){

    const { data, error } = await db

        .from("product_history")

        .select("*")

        .order("created_at",{

            ascending:false

        });

    if(error){

        console.error(error);

        return;

    }

    histories = data;

    renderHistory(histories);

}

// ======================================
// RENDER HISTORY
// ======================================

function renderHistory(data){

    historyContainer.innerHTML = "";

    if(data.length===0){

        historyContainer.innerHTML=`

            <div class="empty">

                <h2>Belum ada riwayat.</h2>

            </div>

        `;

        return;

    }

    data.forEach(item=>{

        let icon="📦";

        let badge="badge-add";

        switch(item.action){

            case "Product Added":

                icon="🟢";

                badge="badge-add";

                break;

            case "Product Updated":

                icon="🔵";

                badge="badge-edit";

                break;

            case "Stock Added":

                icon="🟡";

                badge="badge-stock";

                break;

            case "Stock Reduced":

                icon="🔴";

                badge="badge-delete";

                break;

        }

        historyContainer.innerHTML+=`

            <div class="history-card">

                <div class="history-icon">

                    ${icon}

                </div>

                <div class="history-content">

                    <h3>

                        ${item.product_name}

                    </h3>

                    <p>

                        ${item.action}

                    </p>

                    <span class="badge ${badge}">

                        ${item.action}

                    </span>

                    <div class="history-date">

                        ${new Date(item.created_at)

                            .toLocaleString("id-ID")}

                    </div>

                </div>

            </div>

        `;

    });

}

// ======================================
// START
// ======================================

loadHistory();