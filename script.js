/* =========================================================
   SKAB.
   MIT SKAB + KVITTERINGS OCR
========================================================= */


/* =========================================================
   DOM
========================================================= */

const addIngredientBtn =
    document.getElementById("addIngredientBtn");

const ingredientForm =
    document.getElementById("ingredientForm");

const closeFormBtn =
    document.getElementById("closeFormBtn");

const newIngredientForm =
    document.getElementById("newIngredientForm");

const ingredientList =
    document.getElementById("ingredientList");


/* =========================================================
   INGREDIENSER
========================================================= */

let ingredients = [];

try {
    ingredients =
        JSON.parse(
            localStorage.getItem("skabIngredients")
        ) || [];
} catch (error) {
    ingredients = [];
}


function saveIngredients() {

    localStorage.setItem(
        "skabIngredients",
        JSON.stringify(ingredients)
    );

}


/* =========================================================
   MANUEL TILFØJELSE
========================================================= */

if (addIngredientBtn) {

    addIngredientBtn.addEventListener(
        "click",
        function () {

            if (ingredientForm) {

                ingredientForm.classList.remove("hidden");

            }

            const nameInput =
                document.getElementById(
                    "ingredientName"
                );

            if (nameInput) {
                nameInput.focus();
            }

        }
    );

}


if (closeFormBtn) {

    closeFormBtn.addEventListener(
        "click",
        function () {

            if (ingredientForm) {

                ingredientForm.classList.add("hidden");

            }

        }
    );

}


if (newIngredientForm) {

    newIngredientForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const nameInput =
                document.getElementById(
                    "ingredientName"
                );

            const quantityInput =
                document.getElementById(
                    "ingredientQuantity"
                );

            const unitInput =
                document.getElementById(
                    "ingredientUnit"
                );

            const expiryInput =
                document.getElementById(
                    "ingredientExpiry"
                );


            if (
                !nameInput ||
                !quantityInput ||
                !unitInput ||
                !expiryInput
            ) {

                return;

            }


            const name =
                nameInput.value.trim();

            const quantity =
                Number(quantityInput.value);

            const unit =
                unitInput.value;

            const expiry =
                expiryInput.value;


            if (
                !name ||
                !expiry ||
                isNaN(quantity) ||
                quantity < 0
            ) {

                alert(
                    "Udfyld venligst alle felter korrekt."
                );

                return;

            }


            ingredients.push({

                id: Date.now(),

                name: name,

                quantity: quantity,

                unit: unit,

                expiry: expiry

            });


            saveIngredients();

            renderIngredients();

            newIngredientForm.reset();


            if (ingredientForm) {

                ingredientForm.classList.add(
                    "hidden"
                );

            }

        }
    );

}


/* =========================================================
   VIS INGREDIENSER
========================================================= */

function renderIngredients() {

    if (!ingredientList) {
        return;
    }


    ingredientList.innerHTML = "";


    if (ingredients.length === 0) {

        ingredientList.innerHTML = `
            <div class="empty-state">

                <p>
                    Dit skab er tomt.
                </p>

                <span>
                    Tilføj din første ingrediens ovenfor.
                </span>

            </div>
        `;

        return;

    }


    ingredients.sort(
        function (a, b) {

            return (
                new Date(a.expiry) -
                new Date(b.expiry)
            );

        }
    );


    const today =
        new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );


    const soon =
        new Date(today);

    soon.setDate(
        soon.getDate() + 7
    );


    const expiringSoon =
        ingredients.filter(
            function (ingredient) {

                return (
                    new Date(
                        ingredient.expiry
                    ) <= soon
                );

            }
        );


    const otherIngredients =
        ingredients.filter(
            function (ingredient) {

                return (
                    new Date(
                        ingredient.expiry
                    ) > soon
                );

            }
        );


    if (expiringSoon.length > 0) {

        ingredientList.appendChild(
            createIngredientGroup(
                "Udløber snart",
                expiringSoon
            )
        );

    }


    if (otherIngredients.length > 0) {

        ingredientList.appendChild(
            createIngredientGroup(
                "Dit skab",
                otherIngredients
            )
        );

    }

}


/* =========================================================
   INGREDIENS-GRUPPE
========================================================= */

function createIngredientGroup(
    title,
    items
) {

    const group =
        document.createElement(
            "section"
        );

    group.className =
        "generated-group";


    group.innerHTML = `
        <div class="generated-group-header">

            <h3>
                ${escapeHTML(title)}
            </h3>

            <span>
                ${items.length}
                ${
                    items.length === 1
                        ? "ingrediens"
                        : "ingredienser"
                }
            </span>

        </div>
    `;


    items.forEach(
        function (ingredient) {

            group.appendChild(
                createIngredientElement(
                    ingredient
                )
            );

        }
    );


    return group;

}


/* =========================================================
   INGREDIENS-ELEMENT
========================================================= */

function createIngredientElement(
    ingredient
) {

    const item =
        document.createElement(
            "article"
        );


    const days =
        calculateDaysUntilExpiry(
            ingredient.expiry
        );


    item.className =
        "generated-ingredient" +
        (
            days <= 7
                ? " urgent"
                : ""
        );


    const quantityText =
        formatQuantity(
            ingredient.quantity
        )
        + " "
        + formatUnit(
            ingredient.unit
        );


    item.innerHTML = `

        <div class="generated-name">

            <h4>
                ${escapeHTML(
                    ingredient.name
                )}
            </h4>

            <p>
                ${escapeHTML(
                    quantityText
                )}
            </p>

        </div>


        <div class="generated-expiry">

            <span>
                Udløber
            </span>

            <strong>
                ${formatExpiry(
                    ingredient.expiry
                )}
            </strong>

        </div>


        <div class="ingredient-actions">

            <button
                class="edit-button"
                type="button"
            >
                Rediger
            </button>

            <button
                class="generated-delete"
                type="button"
                aria-label="Slet ingrediens"
            >
                ×
            </button>

        </div>
    `;


    const editButton =
        item.querySelector(
            ".edit-button"
        );


    if (editButton) {

        editButton.addEventListener(
            "click",
            function () {

                createEditForm(
                    item,
                    ingredient
                );

            }
        );

    }


    const deleteButton =
        item.querySelector(
            ".generated-delete"
        );


    if (deleteButton) {

        deleteButton.addEventListener(
            "click",
            function () {

                deleteIngredient(
                    ingredient.id
                );

            }
        );

    }


    return item;

}


/* =========================================================
   REDIGER
========================================================= */

function createEditForm(
    item,
    ingredient
) {

    item.classList.add(
        "editing"
    );


    item.innerHTML = `

        <div class="edit-form">

            <div class="edit-field">

                <label>
                    Ingrediens
                </label>

                <input
                    type="text"
                    class="edit-name"
                    value="${escapeHTML(
                        ingredient.name
                    )}"
                >

            </div>


            <div class="edit-field">

                <label>
                    Mængde
                </label>

                <div class="edit-quantity">

                    <input
                        type="number"
                        class="edit-amount"
                        value="${ingredient.quantity}"
                        min="0"
                        step="0.01"
                    >

                    <select class="edit-unit">

                        <option value="g">
                            g
                        </option>

                        <option value="kg">
                            kg
                        </option>

                        <option value="ml">
                            ml
                        </option>

                        <option value="dl">
                            dl
                        </option>

                        <option value="l">
                            l
                        </option>

                        <option value="stk">
                            stk.
                        </option>

                    </select>

                </div>

            </div>


            <div class="edit-field">

                <label>
                    Udløbsdato
                </label>

                <input
                    type="date"
                    class="edit-expiry"
                    value="${ingredient.expiry}"
                >

            </div>


            <div class="edit-actions">

                <button
                    type="button"
                    class="save-edit-button"
                >
                    Gem ændringer
                </button>

                <button
                    type="button"
                    class="cancel-edit-button"
                >
                    Annuller
                </button>

            </div>

        </div>
    `;


    const unit =
        item.querySelector(
            ".edit-unit"
        );

    if (unit) {

        unit.value =
            ingredient.unit;

    }


    const save =
        item.querySelector(
            ".save-edit-button"
        );


    if (save) {

        save.addEventListener(
            "click",
            function () {

                const name =
                    item
                        .querySelector(
                            ".edit-name"
                        )
                        .value
                        .trim();


                const quantity =
                    Number(
                        item
                            .querySelector(
                                ".edit-amount"
                            )
                            .value
                    );


                const newUnit =
                    item
                        .querySelector(
                            ".edit-unit"
                        )
                        .value;


                const expiry =
                    item
                        .querySelector(
                            ".edit-expiry"
                        )
                        .value;


                if (
                    !name ||
                    !expiry ||
                    isNaN(quantity) ||
                    quantity < 0
                ) {

                    alert(
                        "Udfyld venligst alle felter korrekt."
                    );

                    return;

                }


                ingredient.name =
                    name;

                ingredient.quantity =
                    quantity;

                ingredient.unit =
                    newUnit;

                ingredient.expiry =
                    expiry;


                saveIngredients();

                renderIngredients();

            }
        );

    }


    const cancel =
        item.querySelector(
            ".cancel-edit-button"
        );


    if (cancel) {

        cancel.addEventListener(
            "click",
            function () {

                renderIngredients();

            }
        );

    }

}


/* =========================================================
   SLET
========================================================= */

function deleteIngredient(id) {

    ingredients =
        ingredients.filter(
            function (ingredient) {

                return (
                    ingredient.id !== id
                );

            }
        );


    saveIngredients();

    renderIngredients();

}


/* =========================================================
   HJÆLPEFUNKTIONER
========================================================= */

function formatQuantity(
    quantity
) {

    const number =
        Number(quantity);


    if (
        Number.isInteger(number)
    ) {

        return String(number);

    }


    return number
        .toFixed(2)
        .replace(
            /\.?0+$/,
            ""
        );

}


function formatUnit(unit) {

    if (unit === "stk") {

        return "stk.";

    }

    return unit || "";

}


function calculateDaysUntilExpiry(
    expiry
) {

    const today =
        new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );


    const date =
        new Date(expiry);

    date.setHours(
        0,
        0,
        0,
        0
    );


    return Math.ceil(
        (
            date - today
        ) /
        (
            1000 *
            60 *
            60 *
            24
        )
    );

}


function formatExpiry(
    expiry
) {

    const days =
        calculateDaysUntilExpiry(
            expiry
        );


    if (days < 0) {
        return "Udløbet";
    }


    if (days === 0) {
        return "I dag";
    }


    if (days === 1) {
        return "I morgen";
    }


    if (days <= 7) {
        return `Om ${days} dage`;
    }


    return new Date(
        expiry
    ).toLocaleDateString(
        "da-DK",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

}


function escapeHTML(
    value
) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   START
========================================================= */

renderIngredients();


/* =========================================================
   KVITTERING OCR
========================================================= */

const scanReceiptBtn =
    document.getElementById(
        "scanReceiptBtn"
    );

const receiptInput =
    document.getElementById(
        "receiptInput"
    );

let receiptReview =
    document.getElementById(
        "receiptReview"
    );

let receiptItems =
    document.getElementById(
        "receiptItems"
    );

let closeReceiptReview =
    document.getElementById(
        "closeReceiptReview"
    );

let addReceiptItemsBtn =
    document.getElementById(
        "addReceiptItemsBtn"
    );


/* =========================================================
   FLYT OCR-BOKSEN UD AF FORMULAREN
========================================================= */

if (
    receiptReview &&
    ingredientForm &&
    ingredientForm.parentNode
) {

    ingredientForm.parentNode.insertBefore(
        receiptReview,
        ingredientForm
    );

}


/* =========================================================
   OCR-STYLING
   Vi indsætter den direkte fra JavaScript,
   så CSS-filen ikke er afgørende.
========================================================= */

const receiptStyle =
    document.createElement(
        "style"
    );


receiptStyle.textContent = `

.receipt-review {
    display: none;
    margin-top: 40px;
    padding: 30px;
    background: #f3f1e9;
    border: 1px solid #d7d3c8;
}

.receipt-review.visible {
    display: block;
}

.receipt-review-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 30px;
}

.receipt-review-header h2 {
    margin: 6px 0 8px;
}

.receipt-review-header p {
    margin: 0;
}

.receipt-close {
    border: none;
    background: transparent;
    font-size: 28px;
    cursor: pointer;
    color: #172a46;
}

.receipt-items {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.receipt-item {
    background: #ffffff;
    border: 1px solid #d7d3c8;
    padding: 20px;
}

.receipt-item-top {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 18px;
}

.receipt-select {
    width: 18px;
    height: 18px;
}

.receipt-name {
    flex: 1;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #d7d3c8;
    background: #f3f1e9;
    padding: 12px;
    font-family: "DM Sans", sans-serif;
    font-size: 13px;
}

.receipt-item-fields {
    display: grid;
    grid-template-columns: 1fr 100px 1.2fr;
    gap: 12px;
}

.receipt-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.receipt-field label {
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
}

.receipt-field input,
.receipt-field select {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #d7d3c8;
    background: #f3f1e9;
    padding: 12px;
    font-family: "DM Sans", sans-serif;
    font-size: 12px;
}

.receipt-add-all {
    margin-top: 24px;
    border: none;
    background: #172a46;
    color: #f3f1e9;
    padding: 14px 22px;
    font-family: "DM Sans", sans-serif;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    cursor: pointer;
}

.receipt-progress {
    margin-top: 15px;
    font-size: 11px;
    color: #59616b;
}

@media (max-width: 600px) {

    .receipt-review {
        padding: 20px;
    }

    .receipt-item-fields {
        grid-template-columns: 1fr;
    }

    .receipt-add-all {
        width: 100%;
    }

}

`;


document.head.appendChild(
    receiptStyle
);


/* =========================================================
   ÅBN KVITTERING
========================================================= */

if (scanReceiptBtn) {

    scanReceiptBtn.addEventListener(
        "click",
        function () {

            if (receiptInput) {

                receiptInput.click();

            }

        }
    );

}


/* =========================================================
   OCR
========================================================= */

if (receiptInput) {

    receiptInput.addEventListener(
        "change",
        async function () {

            const file =
                receiptInput.files &&
                receiptInput.files[0];


            if (!file) {
                return;
            }


            try {

                showReceiptLoading();


                const result =
                    await Tesseract.recognize(
                        file,
                        "eng",
                        {
                            logger:
                                function (
                                    message
                                ) {

                                    updateOCRProgress(
                                        message
                                    );

                                }
                        }
                    );


                const text =
                    result.data.text || "";


                const products =
                    extractReceiptProducts(
                        text
                    );


                if (
                    products.length === 0
                ) {

                    hideReceiptReview();

                    alert(
                        "Jeg kunne ikke finde nogen varer på kvitteringen. Prøv et tydeligere billede."
                    );

                    return;

                }


                showReceiptReview(
                    products
                );


            } catch (error) {

                console.error(
                    "OCR fejl:",
                    error
                );


                hideReceiptReview();


                alert(
                    "Der opstod en fejl under læsningen af kvitteringen."
                );

            }

        }
    );

}


/* =========================================================
   OCR PROGRESS
========================================================= */

function showReceiptLoading() {

    if (!receiptReview) {
        return;
    }


    receiptReview.classList.add(
        "visible"
    );


    receiptReview.innerHTML = `

        <div class="receipt-review-header">

            <div>

                <p class="eyebrow">
                    KVITTERING
                </p>

                <h2>
                    Læser kvitteringen
                </h2>

                <p>
                    Det kan tage et øjeblik.
                </p>

                <div
                    class="receipt-progress"
                    id="receiptProgress"
                >
                    Starter OCR...
                </div>

            </div>

        </div>

    `;

}


function updateOCRProgress(
    message
) {

    const progress =
        document.getElementById(
            "receiptProgress"
        );


    if (!progress) {
        return;
    }


    if (
        message.status
    ) {

        let percent = "";

        if (
            typeof message.progress ===
            "number"
        ) {

            percent =
                " " +
                Math.round(
                    message.progress *
                    100
                ) +
                "%";

        }


        progress.textContent =
            message.status +
            percent;

    }

}


/* =========================================================
   FIND PRODUKTER PÅ KVITTERING
========================================================= */

function extractReceiptProducts(
    text
) {

    const lines =
        text
            .split(/\r?\n/)
            .map(
                function (line) {

                    return cleanReceiptLine(
                        line
                    );

                }
            )
            .filter(
                function (line) {

                    return line.length >= 3;

                }
            );


    const products = [];

    const seen = new Set();


    lines.forEach(
        function (line) {

            if (
                isDefinitelyNotProduct(
                    line
                )
            ) {

                return;

            }


            const normalized =
                line
                    .toLowerCase()
                    .replace(
                        /[^a-zæøå0-9]/g,
                        ""
                    );


            if (!normalized) {
                return;
            }


            if (
                seen.has(normalized)
            ) {

                return;

            }


            seen.add(
                normalized
            );


            products.push(
                line
            );

        }
    );


    return products;

}


/* =========================================================
   RENS OCR-LINJE
========================================================= */

function cleanReceiptLine(
    line
) {

    let result =
        String(line || "")
            .replace(
                /\|/g,
                ""
            )
            .replace(
                /[ \t]+/g,
                " "
            )
            .trim();


    /* Pris i slutningen */

    result =
        result.replace(
            /\s+\d{1,5}[.,]\d{2}\s*(?:kr|dkk)?$/i,
            ""
        );


    /* Pris med komma/punkt */

    result =
        result.replace(
            /\s+\d{1,5}[.,]\d{2}\s*$/,
            ""
        );


    /* Stregkode */

    result =
        result.replace(
            /\b\d{8,14}\b/g,
            ""
        );


    /* Dato */

    result =
        result.replace(
            /\b\d{1,2}[./-]\d{1,2}[./-]\d{2,4}\b/g,
            ""
        );


    result =
        result
            .replace(
                /^[^A-Za-zÆØÅæøå]+/,
                ""
            )
            .replace(
                /\s+/g,
                " "
            )
            .trim();


    return result;

}


/* =========================================================
   SORTER TING FRA DER IKKE ER VARER
========================================================= */

function isDefinitelyNotProduct(
    line
) {

    const upper =
        line.toUpperCase();


    /* Kun tal */

    if (
        /^[\d\s.,:-]+$/.test(
            line
        )
    ) {

        return true;

    }


    /* For lidt tekst */

    const letters =
        line.match(
            /[A-Za-zÆØÅæøå]/g
        );


    if (
        !letters ||
        letters.length < 3
    ) {

        return true;

    }


    /* Kvitteringstekst */

    const ignoredWords = [

        "TOTAL",
        "SUBTOTAL",
        "BETALT",
        "KONTANT",
        "KORT",
        "MOMS",
        "VAT",
        "RABAT",
        "BONUS",
        "KVITTERING",
        "ORDRE",
        "TERMINAL",
        "BYTTE",
        "BELØB",
        "DATO",
        "TID",
        "TAK FOR",
        "TAK!",
        "KUNDE",
        "KASSE",
        "EAN",
        "BANK",
        "VISA",
        "MASTERCARD",
        "MAESTRO",
        "MOBILEPAY",
        "TRANSAKTION",
        "SALDO",
        "PAYMENT",
        "THANK",
        "CUSTOMER",
        "REGISTER",
        "RECEIPT",
        "PRICE",
        "PRIS",
        "STREGKODE"

    ];


    for (
        let i = 0;
        i < ignoredWords.length;
        i++
    ) {

        if (
            upper.includes(
                ignoredWords[i]
            )
        ) {

            return true;

        }

    }


    /* Supermarkeder */

    const supermarkets = [

        "REMA 1000",
        "REMA",
        "NETTO",
        "FØTEX",
        "FOTEX",
        "MENY",
        "LIDL",
        "ALDI",
        "SPAR",
        "365",
        "COOP",
        "IRMA",
        "SUPERBRUGSEN",
        "BRUGSEN",
        "BILKA"

    ];


    for (
        let i = 0;
        i < supermarkets.length;
        i++
    ) {

        if (
            upper === supermarkets[i] ||
            upper.startsWith(
                supermarkets[i] + " "
            )
        ) {

            return true;

        }

    }


    /* For lang OCR-linje */

    if (
        line.length > 70
    ) {

        return true;

    }


    return false;

}


/* =========================================================
   VIS OCR RESULTAT
========================================================= */

function showReceiptReview(
    products
) {

    if (!receiptReview) {
        return;
    }


    receiptReview.innerHTML = `

        <div class="receipt-review-header">

            <div>

                <p class="eyebrow">
                    KVITTERING
                </p>

                <h2>
                    Tjek dine varer
                </h2>

                <p>
                    ${products.length} varer fundet.
                    Fjern markeringen fra dem,
                    du ikke vil gemme.
                </p>

            </div>


            <button
                id="closeReceiptReview"
                class="receipt-close"
                type="button"
            >
                ×
            </button>

        </div>


        <div
            id="receiptItems"
            class="receipt-items"
        ></div>


        <button
            id="addReceiptItemsBtn"
            class="receipt-add-all"
            type="button"
        >
            Tilføj valgte til mit skab
        </button>

    `;


    receiptItems =
        document.getElementById(
            "receiptItems"
        );


    closeReceiptReview =
        document.getElementById(
            "closeReceiptReview"
        );


    addReceiptItemsBtn =
        document.getElementById(
            "addReceiptItemsBtn"
        );


    products.forEach(
        function (product, index) {

            receiptItems.appendChild(
                createReceiptItem(
                    product,
                    index
                )
            );

        }
    );


    receiptReview.classList.add(
        "visible"
    );


    if (closeReceiptReview) {

        closeReceiptReview.addEventListener(
            "click",
            hideReceiptReview
        );

    }


    if (addReceiptItemsBtn) {

        addReceiptItemsBtn.addEventListener(
            "click",
            addSelectedReceiptItems
        );

    }

}


/* =========================================================
   OCR VARE
========================================================= */

function createReceiptItem(
    name,
    index
) {

    const item =
        document.createElement(
            "article"
        );


    item.className =
        "receipt-item";


    const expiry =
        new Date();


    expiry.setDate(
        expiry.getDate() + 7
    );


    const expiryString =
        expiry
            .toISOString()
            .split("T")[0];


    item.innerHTML = `

        <div class="receipt-item-top">

            <input
                type="checkbox"
                class="receipt-select"
                checked
            >

            <input
                type="text"
                class="receipt-name"
                value="${escapeHTML(
                    name
                )}"
            >

        </div>


        <div class="receipt-item-fields">

            <div class="receipt-field">

                <label>
                    Mængde
                </label>

                <input
                    type="number"
                    class="receipt-quantity"
                    value="1"
                    min="0"
                    step="0.01"
                >

            </div>


            <div class="receipt-field">

                <label>
                    Enhed
                </label>

                <select
                    class="receipt-unit"
                >

                    <option value="stk">
                        stk.
                    </option>

                    <option value="g">
                        g
                    </option>

                    <option value="kg">
                        kg
                    </option>

                    <option value="ml">
                        ml
                    </option>

                    <option value="dl">
                        dl
                    </option>

                    <option value="l">
                        l
                    </option>

                </select>

            </div>


            <div class="receipt-field">

                <label>
                    Udløbsdato
                </label>

                <input
                    type="date"
                    class="receipt-expiry"
                    value="${expiryString}"
                >

            </div>

        </div>

    `;


    item.dataset.index =
        index;


    return item;

}


/* =========================================================
   TILFØJ VALGTE OCR-VARER
========================================================= */

function addSelectedReceiptItems() {

    if (!receiptItems) {
        return;
    }


    const items =
        receiptItems.querySelectorAll(
            ".receipt-item"
        );


    let added = 0;


    items.forEach(
        function (item) {

            const checkbox =
                item.querySelector(
                    ".receipt-select"
                );


            if (
                !checkbox ||
                !checkbox.checked
            ) {

                return;

            }


            const name =
                item
                    .querySelector(
                        ".receipt-name"
                    )
                    .value
                    .trim();


            const quantity =
                Number(
                    item
                        .querySelector(
                            ".receipt-quantity"
                        )
                        .value
                );


            const unit =
                item
                    .querySelector(
                        ".receipt-unit"
                    )
                    .value;


            const expiry =
                item
                    .querySelector(
                        ".receipt-expiry"
                    )
                    .value;


            if (
                !name ||
                !expiry ||
                isNaN(quantity) ||
                quantity < 0
            ) {

                return;

            }


            ingredients.push({

                id:
                    Date.now() +
                    Math.random(),

                name:
                    name,

                quantity:
                    quantity,

                unit:
                    unit,

                expiry:
                    expiry

            });


            added++;

        }
    );


    if (added === 0) {

        alert(
            "Vælg mindst én vare."
        );

        return;

    }


    saveIngredients();

    renderIngredients();

    hideReceiptReview();


    if (receiptInput) {

        receiptInput.value = "";

    }


    alert(
        added +
        (
            added === 1
                ? " vare blev tilføjet til dit skab."
                : " varer blev tilføjet til dit skab."
        )
    );

}


/* =========================================================
   LUK OCR
========================================================= */

function hideReceiptReview() {

    if (!receiptReview) {
        return;
    }


    receiptReview.classList.remove(
        "visible"
    );

}


 /* =========================================================
    PWA
 ========================================================= */

if (
    "serviceWorker" in navigator
) {

    window.addEventListener(
        "load",
        function () {

            navigator.serviceWorker
                .register(
                    "./service-worker.js"
                )
                .catch(
                    function (error) {

                        console.log(
                            "PWA fejl:",
                            error
                        );

                    }
                );

        }
    );

}
