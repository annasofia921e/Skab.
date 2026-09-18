/* ========================================
   SKAB.
   MIT SKAB
======================================== */


/* ========================================
   DOM-ELEMENTER
======================================== */

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


/* ========================================
   ÅBN TILFØJ-FORMULAR
======================================== */

if (addIngredientBtn) {

    addIngredientBtn.addEventListener(
        "click",
        function () {

            ingredientForm.classList.remove("hidden");

            const nameInput =
                document.getElementById("ingredientName");

            if (nameInput) {
                nameInput.focus();
            }

        }
    );

}


/* ========================================
   LUK TILFØJ-FORMULAR
======================================== */

if (closeFormBtn) {

    closeFormBtn.addEventListener(
        "click",
        function () {

            ingredientForm.classList.add("hidden");

        }
    );

}


/* ========================================
   HENT INGREDIENSER
======================================== */

let ingredients =
    JSON.parse(
        localStorage.getItem("skabIngredients")
    ) || [];


/* ========================================
   GEM INGREDIENSER
======================================== */

function saveIngredients() {

    localStorage.setItem(
        "skabIngredients",
        JSON.stringify(ingredients)
    );

}


/* ========================================
   TILFØJ NY INGREDIENS
======================================== */

if (newIngredientForm) {

    newIngredientForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const nameInput =
                document.getElementById("ingredientName");

            const quantityInput =
                document.getElementById("ingredientQuantity");

            const unitInput =
                document.getElementById("ingredientUnit");

            const expiryInput =
                document.getElementById("ingredientExpiry");


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


            const ingredient = {

                id: Date.now(),

                name: name,

                quantity: quantity,

                unit: unit,

                expiry: expiry

            };


            ingredients.push(ingredient);

            saveIngredients();

            renderIngredients();

            newIngredientForm.reset();

            ingredientForm.classList.add("hidden");

        }
    );

}


/* ========================================
   VIS INGREDIENSER
======================================== */

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


    /* Sortér efter udløbsdato */

    ingredients.sort(
        function (a, b) {

            return new Date(a.expiry) -
                new Date(b.expiry);

        }
    );


    const today = new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );


    const soon = new Date();

    soon.setDate(
        today.getDate() + 7
    );


    /* Ingredienser der udløber snart */

    const expiringSoon =
        ingredients.filter(
            function (ingredient) {

                const expiryDate =
                    new Date(
                        ingredient.expiry
                    );

                return expiryDate <= soon;

            }
        );


    /* Resten */

    const otherIngredients =
        ingredients.filter(
            function (ingredient) {

                const expiryDate =
                    new Date(
                        ingredient.expiry
                    );

                return expiryDate > soon;

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


/* ========================================
   OPRET INGREDIENS-GRUPPE
======================================== */

function createIngredientGroup(
    title,
    items
) {

    const group =
        document.createElement("section");

    group.className =
        "generated-group";


    group.innerHTML = `
        <div class="generated-group-header">

            <h3>
                ${title}
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


/* ========================================
   OPRET INGREDIENS
======================================== */

function createIngredientElement(
    ingredient
) {

    const item =
        document.createElement("article");


    const daysUntilExpiry =
        calculateDaysUntilExpiry(
            ingredient.expiry
        );


    const urgent =
        daysUntilExpiry <= 7;


    item.className =
        "generated-ingredient" +
        (urgent ? " urgent" : "");


    let quantityText;


    if (
        typeof ingredient.quantity === "number" &&
        ingredient.unit
    ) {

        quantityText =
            `${formatQuantity(
                ingredient.quantity
            )} ${formatUnit(
                ingredient.unit
            )}`;

    } else {

        quantityText =
            ingredient.quantity || "";

    }


    item.innerHTML = `
        <div class="generated-name">

            <h4>
                ${escapeHTML(ingredient.name)}
            </h4>

            <p>
                ${escapeHTML(quantityText)}
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
                aria-label="Slet ${escapeHTML(ingredient.name)}"
            >
                ×
            </button>

        </div>
    `;


    /* Rediger */

    const editButton =
        item.querySelector(".edit-button");


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


    /* Slet */

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


/* ========================================
   REDIGER INGREDIENS
======================================== */

function createEditForm(
    item,
    ingredient
) {

    item.classList.add("editing");


    item.innerHTML = `
        <div class="edit-form">

            <div class="edit-field">

                <label>
                    Ingrediens
                </label>

                <input
                    type="text"
                    class="edit-name"
                    value="${escapeHTML(ingredient.name)}"
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


    const unitSelect =
        item.querySelector(".edit-unit");


    if (unitSelect) {

        unitSelect.value =
            ingredient.unit;

    }


    const saveButton =
        item.querySelector(
            ".save-edit-button"
        );


    if (saveButton) {

        saveButton.addEventListener(
            "click",
            function () {

                const newName =
                    item
                        .querySelector(".edit-name")
                        .value
                        .trim();


                const newQuantity =
                    Number(
                        item
                            .querySelector(".edit-amount")
                            .value
                    );


                const newUnit =
                    item
                        .querySelector(".edit-unit")
                        .value;


                const newExpiry =
                    item
                        .querySelector(".edit-expiry")
                        .value;


                if (
                    !newName ||
                    !newExpiry ||
                    isNaN(newQuantity) ||
                    newQuantity < 0
                ) {

                    alert(
                        "Udfyld venligst alle felter korrekt."
                    );

                    return;

                }


                ingredient.name =
                    newName;

                ingredient.quantity =
                    newQuantity;

                ingredient.unit =
                    newUnit;

                ingredient.expiry =
                    newExpiry;


                saveIngredients();

                renderIngredients();

            }
        );

    }


    const cancelButton =
        item.querySelector(
            ".cancel-edit-button"
        );


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            function () {

                renderIngredients();

            }
        );

    }

}


/* ========================================
   NORMALISERING
======================================== */

function normalizeIngredientName(name) {

    const normalized =
        name
            .toLowerCase()
            .trim();


    const variations = {

        "tomater": "tomat",
        "tomat": "tomat",

        "kartofler": "kartoffel",
        "kartoffel": "kartoffel",

        "gulerødder": "gulerod",
        "gulerod": "gulerod",

        "citroner": "citron",
        "citron": "citron",

        "agurker": "agurk",
        "agurk": "agurk",

        "æbler": "æble",
        "æble": "æble",

        "bananer": "banan",
        "banan": "banan",

        "pærer": "pære",
        "pære": "pære",

        "appelsiner": "appelsin",
        "appelsin": "appelsin",

        "ærter": "ært",
        "ært": "ært",

        "løg": "løg",

        "æg": "æg",

        "spinat": "spinat",

        "broccoli": "broccoli"

    };


    return (
        variations[normalized] ||
        normalized
    );

}


/* ========================================
   FORMATÉR MÆNGDE
======================================== */

function formatQuantity(quantity) {

    if (Number.isInteger(quantity)) {

        return quantity;

    }


    return quantity
        .toFixed(2)
        .replace(/\.?0+$/, "");

}


/* ========================================
   FORMATÉR ENHED
======================================== */

function formatUnit(unit) {

    if (unit === "stk") {

        return "stk.";

    }


    return unit;

}


/* ========================================
   BEREGN DAGE TIL UDLØB
======================================== */

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


    const expiryDate =
        new Date(expiry);


    expiryDate.setHours(
        0,
        0,
        0,
        0
    );


    const difference =
        expiryDate - today;


    return Math.ceil(
        difference /
        (
            1000 *
            60 *
            60 *
            24
        )
    );

}


/* ========================================
   FORMATÉR UDLØBSDATO
======================================== */

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


    const date =
        new Date(expiry);


    return date.toLocaleDateString(
        "da-DK",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

}


/* ========================================
   SLET INGREDIENS
======================================== */

function deleteIngredient(
    id
) {

    ingredients =
        ingredients.filter(
            function (ingredient) {

                return ingredient.id !== id;

            }
        );


    saveIngredients();

    renderIngredients();

}


/* ========================================
   BESKYT HTML
======================================== */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* ========================================
   START MIT SKAB
======================================== */

renderIngredients();


/* ========================================
   SKAB. — PWA
======================================== */

if ("serviceWorker" in navigator) {

    window.addEventListener(
        "load",
        function () {

            navigator.serviceWorker.register(
                "./service-worker.js"
            )
            .then(
                function () {

                    console.log(
                        "SKAB. PWA er aktiveret."
                    );

                }
            )
            .catch(
                function (error) {

                    console.log(
                        "PWA kunne ikke aktiveres:",
                        error
                    );

                }
            );

        }
    );

}


/* ========================================
   KVITTERINGS OCR
======================================== */


/* DOM */

const scanReceiptBtn =
    document.getElementById(
        "scanReceiptBtn"
    );

const receiptInput =
    document.getElementById(
        "receiptInput"
    );

const receiptReview =
    document.getElementById(
        "receiptReview"
    );

const receiptItems =
    document.getElementById(
        "receiptItems"
    );

const closeReceiptReview =
    document.getElementById(
        "closeReceiptReview"
    );

const addReceiptItemsBtn =
    document.getElementById(
        "addReceiptItemsBtn"
    );


/* ========================================
   ORD SOM SKAL FILTRERES VÆK
======================================== */

const RECEIPT_IGNORE_WORDS = [

    "TOTAL",
    "SUBTOTAL",
    "BETALT",
    "KORT",
    "KONTANT",
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
    "TRANSAKTIONS",
    "SALDO",
    "CHANGE",
    "CASH",
    "PAYMENT",
    "THANK",
    "CUSTOMER",
    "REGISTER",
    "RECEIPT",
    "PRICE",
    "PRIS",
    "STREGKODE"

];


/* ========================================
   SUPERMARKEDER
======================================== */

const SUPERMARKETS = [

    "REMA",
    "REMA 1000",
    "NETTO",
    "FØTEX",
    "FOTEX",
    "MENY",
    "LIDL",
    "ALDI",
    "SPAR",
    "365",
    "365DISCOUNT",
    "COOP",
    "IRMA",
    "SUPERBRUGSEN",
    "BRUGSEN",
    "BILKA",
    "DAGLI'BRUGSEN",
    "DAGLI BRUGSEN"

];


/* ========================================
   MADVARER
======================================== */

const FOOD_WORDS = [

    "mælk",
    "skummetmælk",
    "minimælk",
    "letmælk",

    "skyr",
    "yoghurt",
    "yogurt",
    "fløde",
    "smør",
    "æg",

    "ost",

    "havre",
    "havregryn",
    "mel",
    "sukker",

    "ris",
    "pasta",
    "nudler",

    "brød",
    "rugbrød",
    "toast",
    "boller",

    "kartoffel",
    "kartofler",

    "tomat",
    "tomater",

    "agurk",

    "peberfrugt",
    "gulerod",
    "gulerødder",

    "løg",
    "hvidløg",
    "porre",

    "broccoli",
    "blomkål",
    "spinat",
    "salat",

    "avocado",

    "banan",
    "bananer",

    "æble",
    "æbler",

    "pære",
    "pærer",

    "appelsin",
    "appelsiner",

    "citron",
    "lime",

    "jordbær",
    "blåbær",
    "hindbær",
    "vindruer",

    "kylling",
    "kyllingebryst",

    "oksekød",
    "svinekød",

    "bacon",
    "skinke",
    "pølser",

    "laks",
    "tun",
    "fisk",
    "rejer",
    "kød",

    "bønner",
    "kikærter",
    "linser",
    "majs",
    "ærter",

    "champignon",
    "svampe",

    "pesto",
    "tomatsauce",
    "tomatsovs",

    "bouillon",

    "olie",
    "olivenolie",
    "eddike",

    "salt",
    "peber",

    "ketchup",
    "sennep",
    "mayonnaise",

    "nødder",
    "mandler",
    "peanutbutter",

    "chokolade",
    "kakao",

    "juice",

    "kaffe",
    "te"

];


/* ========================================
   TJEK OM LINJE ER EN PRIS
======================================== */

function isReceiptPrice(line) {

    return /^\s*(?:DKK\s*)?\d{1,4}(?:[.,]\d{2})\s*(?:KR|DKK)?\s*$/i
        .test(line);

}


/* ========================================
   FJERN PRIS FRA PRODUKT
======================================== */

function removePriceFromLine(line) {

    return line
        .replace(
            /\s+\d{1,4}[.,]\d{2}\s*(?:kr|dkk)?\s*$/i,
            ""
        )
        .trim();

}


/* ========================================
   FJERN STREGKODER
======================================== */

function removeBarcode(line) {

    return line
        .replace(
            /\b\d{8,14}\b/g,
            ""
        )
        .trim();

}


/* ========================================
   TJEK OM DET LIGNER MAD
======================================== */

function looksLikeFood(line) {

    const normalized =
        line
            .toLowerCase()
            .replace(/\s+/g, " ")
            .trim();


    return FOOD_WORDS.some(
        function (food) {

            return normalized.includes(food);

        }
    );

}


/* ========================================
   FILTRÉR KVITTERINGSTEKST
======================================== */

function filterReceiptText(text) {

```
const lines = text
    .split("\n")
    .map(function (line) {

        return line
            .replace(/\|/g, "")
            .replace(/\s+/g, " ")
            .trim();

    })
    .filter(function (line) {

        return line.length > 1;

    });


const foodItems = [];
const seenItems = new Set();


lines.forEach(function (originalLine) {

    let line = originalLine;


    const upperLine =
        line
            .toUpperCase()
            .replace(/\s+/g, " ")
            .trim();


    /* ==============================
       PRISLINJER
    ============================== */

    if (isReceiptPrice(line)) {
        return;
    }


    /* ==============================
       KVITTERINGSTEKST
    ============================== */

    const containsReceiptWord =
        RECEIPT_IGNORE_WORDS.some(
            function (word) {

                return upperLine.includes(word);

            }
        );


    if (containsReceiptWord) {
        return;
    }


    /* ==============================
       SUPERMARKED
    ============================== */

    const containsSupermarket =
        SUPERMARKETS.some(
            function (store) {

                return upperLine.includes(store);

            }
        );


    if (containsSupermarket) {
        return;
    }


    /* ==============================
       FJERN PRIS
    ============================== */

    line = removePriceFromLine(line);


    /* ==============================
       FJERN STREGKODER
    ============================== */

    line = removeBarcode(line);


    /* ==============================
       FJERN DATOER
    ============================== */

    line = line.replace(
        /\b\d{1,2}[./-]\d{1,2}[./-]\d{2,4}\b/g,
        ""
    );


    /* ==============================
       FJERN MÆNGDE / VÆGT
    ============================== */

    line = line.replace(
        /\b\d+(?:[.,]\d+)?\s*(?:kg|g|mg|l|ml|cl|stk)\b/gi,
        ""
    );


    /* ==============================
       RENS OCR-TEGN
    ============================== */

    line = line
        .replace(/^[^A-Za-zÆØÅæøå]+/, "")
        .replace(
            /[^A-Za-zÆØÅæøå0-9%.,'&+\- ]+$/g,
            ""
        )
        .replace(/\s+/g, " ")
        .trim();


    if (!line) {
        return;
    }


    /* ==============================
       SKAL INDEHOLDE BOGSTAVER
    ============================== */

    const letters =
        line.match(
            /[A-Za-zÆØÅæøå]/g
        );


    if (!letters || letters.length < 3) {
        return;
    }


    /* ==============================
       FOR MEGET TAL = IKKE VARE
    ============================== */

    const numbers =
        line.match(/[0-9]/g) || [];


    if (
        numbers.length >
        letters.length
    ) {
        return;
    }


    /* ==============================
       FOR KORT / MÆRKELIG TEKST
    ============================== */

    if (line.length < 3) {
        return;
    }


    if (line.length > 60) {
        return;
    }


    /* ==============================
       DUBLETTER
    ============================== */

    const normalized =
        line
            .toLowerCase()
            .replace(/[^a-zæøå0-9]+/g, "")
            .trim();


    if (!normalized) {
        return;
    }


    if (seenItems.has(normalized)) {
        return;
    }


    seenItems.add(normalized);


    /* ==============================
       GEM VAREN
    ============================== */

    foodItems.push({

        name: line

    });

});


return foodItems;
```

}



/* ========================================
   ÅBN KAMERA / FILVÆLGER
======================================== */

if (
    scanReceiptBtn &&
    receiptInput
) {

    scanReceiptBtn.addEventListener(
        "click",
        function () {

            receiptInput.click();

        }
    );


    receiptInput.addEventListener(
        "change",
        async function () {

            if (
                !receiptInput.files ||
                !receiptInput.files.length
            ) {

                return;

            }


            const receipt =
                receiptInput.files[0];


            scanReceiptBtn.disabled =
                true;


            scanReceiptBtn.innerHTML =
                "Læser kvittering...";


            try {

                /* Tjek Tesseract */

                if (
                    typeof Tesseract ===
                    "undefined"
                ) {

                    throw new Error(
                        "Tesseract blev ikke indlæst. Tjek script-linket i skab.html."
                    );

                }


                console.log(
                    "SKAB.: Tesseract er indlæst."
                );


                /* Opret OCR-worker */

                const worker =
                    await Tesseract.createWorker(
                        "eng",
                        1,
                        {

                            workerPath:
                                "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/worker.min.js",

                            corePath:
                                "https://cdn.jsdelivr.net/npm/tesseract.js-core@5.0.0",

                            logger:
                                function (message) {

                                    console.log(
                                        "OCR:",
                                        message
                                    );

                                }

                        }
                    );


                console.log(
                    "SKAB.: OCR-worker er klar."
                );


                /* Læs kvitteringen */

                const result =
                    await worker.recognize(
                        receipt
                    );


                const text =
                    result.data.text;


                console.log(
                    "SKAB.: ORIGINAL OCR:",
                    text
                );


                /* Luk worker */

                await worker.terminate();


                /* Ingen tekst */

                if (
                    !text ||
                    !text.trim()
                ) {

                    alert(
                        "OCR kunne ikke finde nogen tekst på kvitteringen."
                    );

                    return;

                }


                /* Filtrér teksten */

                const foodItems =
                    filterReceiptText(text);


                console.log(
                    "SKAB.: FUNDET MAD:",
                    foodItems
                );


                /* Ingen madvarer */

                if (
                    foodItems.length === 0
                ) {

                    alert(
                        "Jeg kunne ikke genkende nogen madvarer på kvitteringen."
                    );

                    return;

                }


                /* Vis resultatet */

                showReceiptReview(
                    foodItems
                );

            }

            catch (error) {

                console.error(
                    "SKAB.: OCR FEJL:",
                    error
                );


                alert(
                    "Der opstod en OCR-fejl:\n\n" +
                    error.message
                );

            }

            finally {

                scanReceiptBtn.disabled =
                    false;


                scanReceiptBtn.innerHTML =
                    "<span>▣</span> Tilføj fra kvittering";


                receiptInput.value =
                    "";

            }

        }
    );

}


/* ========================================
   VIS KVITTERINGSRESULTAT
======================================== */

function showReceiptReview(items) {

    if (
        !receiptReview ||
        !receiptItems
    ) {

        console.error(
            "SKAB.: receiptReview eller receiptItems blev ikke fundet i HTML."
        );

        alert(
            "Kvitteringen blev læst, men resultatfeltet kunne ikke findes på siden."
        );

        return;

    }


    receiptItems.innerHTML =
        "";


    items.forEach(
        function (item, index) {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "receipt-item";


            row.innerHTML = `

                <div class="receipt-item-top">

                    <label class="receipt-checkbox">

                        <input
                            type="checkbox"
                            class="receipt-select"
                            checked
                        >

                    </label>


                    <input
                        type="text"
                        class="receipt-name"
                        value="${escapeHTML(item.name)}"
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
                            min="0"
                            step="0.01"
                            placeholder="Fx 200"
                        >

                    </div>


                    <div class="receipt-field">

                        <label>
                            Enhed
                        </label>

                        <select
                            class="receipt-unit"
                        >

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

                            <option value="stk" selected>
                                stk.
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
                        >

                    </div>


                </div>

            `;


            receiptItems.appendChild(
                row
            );

        }
    );


    /* Vis resultatet */

    receiptReview.classList.add(
        "visible"
    );


    /* Scroll ned til resultatet */

    receiptReview.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* ========================================
   LUK KVITTERINGSRESULTAT
======================================== */

if (closeReceiptReview) {

    closeReceiptReview.addEventListener(
        "click",
        function () {

            receiptReview.classList.remove(
                "visible"
            );

        }
    );

}


/* ========================================
   TILFØJ VALGTE KVITTERINGSVARER
======================================== */

if (addReceiptItemsBtn) {

    addReceiptItemsBtn.addEventListener(
        "click",
        function () {

            if (!receiptItems) {

                return;

            }


            const rows =
                receiptItems.querySelectorAll(
                    ".receipt-item"
                );


            let addedCount =
                0;


            for (
                let i = 0;
                i < rows.length;
                i++
            ) {

                const row =
                    rows[i];


                const checkbox =
                    row.querySelector(
                        ".receipt-select"
                    );


                if (
                    !checkbox ||
                    !checkbox.checked
                ) {

                    continue;

                }


                const name =
                    row
                        .querySelector(
                            ".receipt-name"
                        )
                        .value
                        .trim();


                const quantity =
                    Number(
                        row
                            .querySelector(
                                ".receipt-quantity"
                            )
                            .value
                    );


                const unit =
                    row
                        .querySelector(
                            ".receipt-unit"
                        )
                        .value;


                const expiry =
                    row
                        .querySelector(
                            ".receipt-expiry"
                        )
                        .value;


                /* Tjek felterne */

                if (
                    !name ||
                    !expiry ||
                    isNaN(quantity) ||
                    quantity <= 0
                ) {

                    alert(
                        "Udfyld navn, mængde og udløbsdato for alle valgte varer."
                    );

                    return;

                }


                /* Tilføj til skabet */

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


                addedCount++;

            }


            /* Gem */

            if (addedCount > 0) {

                saveIngredients();

                renderIngredients();


                receiptReview.classList.remove(
                    "visible"
                );


                alert(
                    addedCount === 1
                        ? "1 ingrediens blev tilføjet til dit skab."
                        : `${addedCount} ingredienser blev tilføjet til dit skab.`
                );

            }

        }
    );

}


/* ========================================
   SLUT PÅ SCRIPT
======================================== */