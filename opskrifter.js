/* ========================================
   SKAB. — OPSKRIFTER
======================================== */


/* ========================================
   OPSKRIFTER
======================================== */

const recipes = [

    {
        id: "tomatpasta",
        name: "Cremet tomatpasta",
        category: "Pasta",
        description: "En enkel og cremet pasta med tomat, hvidløg og parmesan.",
        time: "25 min",
        difficulty: "Nem",

        ingredients: [
            { name: "Tomat", amount: 400, unit: "g" },
            { name: "Pasta", amount: 200, unit: "g" },
            { name: "Hvidløg", amount: 2, unit: "stk" },
            { name: "Fløde", amount: 1, unit: "dl" },
            { name: "Parmesan", amount: 50, unit: "g" }
        ],

        steps: [
            "Kog pastaen i letsaltet vand efter anvisningen på pakken.",
            "Hak hvidløget fint og steg det kort i lidt olie.",
            "Tilsæt tomater og fløde. Lad saucen simre i cirka 10 minutter.",
            "Vend den kogte pasta i saucen.",
            "Riv parmesan over pastaen og server."
        ]
    },


    {
        id: "gronpasta",
        name: "Grøn pasta",
        category: "Vegetarisk",
        description: "Pasta med grønne grøntsager, citron og hvidløg.",
        time: "20 min",
        difficulty: "Nem",

        ingredients: [
            { name: "Pasta", amount: 200, unit: "g" },
            { name: "Spinat", amount: 100, unit: "g" },
            { name: "Broccoli", amount: 150, unit: "g" },
            { name: "Hvidløg", amount: 2, unit: "stk" },
            { name: "Citron", amount: 1, unit: "stk" }
        ],

        steps: [
            "Kog pastaen i letsaltet vand.",
            "Skær broccoli i små buketter og kog dem med pastaen de sidste minutter.",
            "Steg hvidløg og spinat kort på en pande.",
            "Vend pasta og broccoli sammen med spinaten.",
            "Pres frisk citron over retten og server."
        ]
    },


    {
        id: "kartoffel-bowl",
        name: "Sprød kartoffel-bowl",
        category: "Bowl",
        description: "Ovnbagte kartofler med grøntsager og en frisk dressing.",
        time: "35 min",
        difficulty: "Nem",

        ingredients: [
            { name: "Kartoffel", amount: 500, unit: "g" },
            { name: "Gulerod", amount: 2, unit: "stk" },
            { name: "Agurk", amount: 0.5, unit: "stk" },
            { name: "Yoghurt", amount: 2, unit: "dl" },
            { name: "Citron", amount: 0.5, unit: "stk" }
        ],

        steps: [
            "Skær kartoflerne i mindre stykker.",
            "Vend dem med olie, salt og peber og bag dem ved 220 grader i cirka 30 minutter.",
            "Skær gulerødder og agurk i mindre stykker.",
            "Bland yoghurt med citronsaft til en enkel dressing.",
            "Anret grøntsagerne med de sprøde kartofler og dressing."
        ]
    },


    {
        id: "omelet",
        name: "Omelet med grønt",
        category: "Æg",
        description: "En hurtig omelet med æg, grøntsager og friske urter.",
        time: "15 min",
        difficulty: "Nem",

        ingredients: [
            { name: "Æg", amount: 3, unit: "stk" },
            { name: "Spinat", amount: 100, unit: "g" },
            { name: "Tomat", amount: 1, unit: "stk" },
            { name: "Løg", amount: 0.5, unit: "stk" },
            { name: "Friske urter", amount: 1, unit: "stk" }
        ],

        steps: [
            "Pisk æggene sammen i en skål.",
            "Hak løg og tomat.",
            "Steg løg, tomat og spinat kort på en pande.",
            "Hæld æggene over grøntsagerne.",
            "Lad omeletten sætte sig og fold den sammen."
        ]
    },


    {
        id: "stegte-ris",
        name: "Stegte ris",
        category: "Asiatisk",
        description: "En nem måde at bruge ris og grøntsager fra køleskabet.",
        time: "20 min",
        difficulty: "Nem",

        ingredients: [
            { name: "Kogte ris", amount: 300, unit: "g" },
            { name: "Æg", amount: 2, unit: "stk" },
            { name: "Gulerod", amount: 1, unit: "stk" },
            { name: "Ært", amount: 100, unit: "g" },
            { name: "Sojasauce", amount: 2, unit: "dl" }
        ],

        steps: [
            "Hak grøntsagerne i små stykker.",
            "Steg grøntsagerne på en varm pande.",
            "Tilsæt de kogte ris og steg dem sprøde.",
            "Skub risene til siden og steg æggene på panden.",
            "Bland det hele sammen og tilsæt sojasauce."
        ]
    },


    {
        id: "grontsagssuppe",
        name: "Grøntsagssuppe",
        category: "Suppe",
        description: "En varm og enkel suppe lavet af de grøntsager, du har.",
        time: "40 min",
        difficulty: "Nem",

        ingredients: [
            { name: "Kartoffel", amount: 300, unit: "g" },
            { name: "Gulerod", amount: 2, unit: "stk" },
            { name: "Løg", amount: 1, unit: "stk" },
            { name: "Bouillon", amount: 5, unit: "dl" },
            { name: "Valgfrie grøntsager", amount: 200, unit: "g" }
        ],

        steps: [
            "Skær alle grøntsagerne i mindre stykker.",
            "Steg løget kort i lidt olie.",
            "Tilsæt resten af grøntsagerne og bouillon.",
            "Lad suppen simre i cirka 25 minutter.",
            "Blend suppen eller server den med grøntsagsstykker."
        ]
    }

];


/* ========================================
   NORMALISER INGREDIENSNAVNE
======================================== */

function normalizeIngredientName(name) {

    const value = String(name)
        .toLowerCase()
        .trim();

    const variations = {

        "tomater": "tomat",

        "kartofler": "kartoffel",

        "gulerødder": "gulerod",

        "citroner": "citron",

        "agurker": "agurk",

        "æbler": "æble",

        "bananer": "banan",

        "pærer": "pære",

        "appelsiner": "appelsin",

        "ærter": "ært"

    };

    return variations[value] || value;
}


/* ========================================
   ENHEDER
======================================== */

function convertToBaseUnit(amount, unit) {

    switch (unit) {

        case "kg":
            return {
                amount: Number(amount) * 1000,
                unit: "g"
            };

        case "g":
            return {
                amount: Number(amount),
                unit: "g"
            };

        case "l":
            return {
                amount: Number(amount) * 1000,
                unit: "ml"
            };

        case "dl":
            return {
                amount: Number(amount) * 100,
                unit: "ml"
            };

        case "ml":
            return {
                amount: Number(amount),
                unit: "ml"
            };

        case "stk":
            return {
                amount: Number(amount),
                unit: "stk"
            };

        default:
            return {
                amount: Number(amount),
                unit: unit
            };
    }
}


function convertFromBaseUnit(amount, unit) {

    switch (unit) {

        case "kg":
            return amount / 1000;

        case "g":
            return amount;

        case "l":
            return amount / 1000;

        case "dl":
            return amount / 100;

        case "ml":
            return amount;

        case "stk":
            return amount;

        default:
            return amount;
    }
}


/* ========================================
   FIND INGREDIENS I SKABET
======================================== */

function findPantryIngredient(
    recipeIngredient,
    pantryIngredients
) {

    const recipeName =
        normalizeIngredientName(
            recipeIngredient.name
        );

    return pantryIngredients.find(
        function (pantryIngredient) {

            return (
                normalizeIngredientName(
                    pantryIngredient.name
                ) === recipeName
            );

        }
    );
}


/* ========================================
   SAMMENLIGN INGREDIENS
======================================== */

function compareIngredient(
    recipeIngredient,
    pantryIngredient
) {

    if (!pantryIngredient) {

        return {
            status: "missing",
            missingAmount: recipeIngredient.amount,
            missingUnit: recipeIngredient.unit
        };

    }


    const recipeBase =
        convertToBaseUnit(
            recipeIngredient.amount,
            recipeIngredient.unit
        );


    const pantryBase =
        convertToBaseUnit(
            pantryIngredient.quantity,
            pantryIngredient.unit
        );


    if (
        recipeBase.unit !==
        pantryBase.unit
    ) {

        return {
            status: "unknown",
            missingAmount: recipeIngredient.amount,
            missingUnit: recipeIngredient.unit
        };

    }


    const difference =
        pantryBase.amount -
        recipeBase.amount;


    if (difference >= 0) {

        return {
            status: "enough",
            missingAmount: 0,
            missingUnit: recipeIngredient.unit
        };

    }


    return {
        status: "partial",
        missingAmount:
            convertFromBaseUnit(
                Math.abs(difference),
                recipeIngredient.unit
            ),
        missingUnit: recipeIngredient.unit
    };
}


/* ========================================
   BEREGN OPSKRIFT MATCH
======================================== */

function calculateRecipeMatch(
    recipe,
    pantryIngredients
) {

    let enoughCount = 0;
    let partialCount = 0;

    let earliestExpiry = Infinity;


    recipe.ingredients.forEach(
        function (ingredient) {

            const pantryIngredient =
                findPantryIngredient(
                    ingredient,
                    pantryIngredients
                );


            const comparison =
                compareIngredient(
                    ingredient,
                    pantryIngredient
                );


            if (
                comparison.status ===
                "enough"
            ) {

                enoughCount++;

            }


            if (
                comparison.status ===
                "partial"
            ) {

                partialCount++;

            }


            if (pantryIngredient) {

                const days =
                    calculateDaysUntilExpiry(
                        pantryIngredient.expiry
                    );


                if (
                    days <
                    earliestExpiry
                ) {

                    earliestExpiry =
                        days;

                }

            }

        }
    );


    return {

        enoughCount:
            enoughCount,

        partialCount:
            partialCount,

        matchedCount:
            enoughCount +
            partialCount,

        totalCount:
            recipe.ingredients.length,

        earliestExpiry:
            earliestExpiry

    };
}


/* ========================================
   SORTER OPSKRIFTER
======================================== */

function sortRecipes(
    recipeArray,
    pantryIngredients
) {

    return recipeArray
        .map(
            function (recipe) {

                return {

                    recipe: recipe,

                    match:
                        calculateRecipeMatch(
                            recipe,
                            pantryIngredients
                        )

                };

            }
        )
        .sort(
            function (a, b) {

                if (
                    b.match.enoughCount !==
                    a.match.enoughCount
                ) {

                    return (
                        b.match.enoughCount -
                        a.match.enoughCount
                    );

                }


                if (
                    b.match.matchedCount !==
                    a.match.matchedCount
                ) {

                    return (
                        b.match.matchedCount -
                        a.match.matchedCount
                    );

                }


                return (
                    a.match.earliestExpiry -
                    b.match.earliestExpiry
                );

            }
        );
}


/* ========================================
   FORMAT MÆNGDE
======================================== */

function formatAmount(
    amount,
    unit
) {

    const rounded =
        Number.isInteger(
            Number(amount)
        )
            ? Number(amount)
            : Number(amount)
                .toFixed(2)
                .replace(/\.?0+$/, "");


    return (
        `${rounded} ${unit === "stk" ? "stk." : unit}`
    );
}


/* ========================================
   OPSKRIFTSLISTE
======================================== */

const recipeList =
    document.getElementById(
        "recipeList"
    );


if (recipeList) {

    const pantryIngredients =
        JSON.parse(
            localStorage.getItem(
                "skabIngredients"
            )
        ) || [];


    const sortedRecipes =
        sortRecipes(
            recipes,
            pantryIngredients
        );


    sortedRecipes.forEach(
        function (item) {

            const recipe =
                item.recipe;

            const match =
                item.match;


            const card =
                document.createElement(
                    "a"
                );


            card.className =
                "recipe-card";


            card.href =
                `opskrift.html?id=${recipe.id}`;


            let matchText;


            if (
                match.enoughCount ===
                match.totalCount
            ) {

                matchText =
                    "Du har alt til opskriften";

            } else if (
                match.enoughCount > 0
            ) {

                matchText =
                    `${match.enoughCount} af ${match.totalCount} ingredienser`;

            } else if (
                match.matchedCount > 0
            ) {

                matchText =
                    `Du har ${match.matchedCount} af ${match.totalCount}`;

            } else {

                matchText =
                    "Flere ingredienser mangler";

            }


            let expiryText;


            if (
                match.earliestExpiry ===
                Infinity
            ) {

                expiryText =
                    "Ingen ingredienser fra dit skab";

            } else if (
                match.earliestExpiry < 0
            ) {

                expiryText =
                    "Noget er udløbet";

            } else if (
                match.earliestExpiry === 0
            ) {

                expiryText =
                    "Noget udløber i dag";

            } else if (
                match.earliestExpiry === 1
            ) {

                expiryText =
                    "Noget udløber i morgen";

            } else {

                expiryText =
                    `Noget udløber om ${match.earliestExpiry} dage`;

            }


            card.innerHTML = `

                <div class="recipe-top">

                    <span class="recipe-category">
                        ${recipe.category}
                    </span>

                    <span class="recipe-arrow">
                        ↗
                    </span>

                </div>


                <div class="recipe-content">

                    <h3>
                        ${recipe.name}
                    </h3>

                    <p>
                        ${recipe.description}
                    </p>


                    <div class="recipe-info">

                        <span>
                            ${recipe.time}
                        </span>

                        <span>
                            ${recipe.difficulty}
                        </span>

                    </div>


                    <div class="recipe-match-preview">

                        <strong>
                            ${matchText}
                        </strong>

                        <span>
                            ${expiryText}
                        </span>

                    </div>

                </div>

            `;


            recipeList.appendChild(
                card
            );

        }
    );

}


/* ========================================
   RATINGS
======================================== */

function getRatings() {

    return JSON.parse(
        localStorage.getItem(
            "skabRatings"
        )
    ) || {};

}


/* ========================================
   GEM RATING
======================================== */

function saveRating(
    recipeId,
    rating
) {

    let ratings =
        getRatings();


    /*
       Hvis der allerede ligger
       en gammel rating som et tal,
       laver vi den om til et array.
    */

    if (
        typeof ratings[recipeId] ===
        "number"
    ) {

        ratings[recipeId] = [
            ratings[recipeId]
        ];

    }


    /*
       Hvis der ikke findes
       nogen ratings endnu.
    */

    if (
        !Array.isArray(
            ratings[recipeId]
        )
    ) {

        ratings[recipeId] = [];

    }


    ratings[recipeId].push(
        Number(rating)
    );


    localStorage.setItem(
        "skabRatings",
        JSON.stringify(
            ratings
        )
    );


    return ratings[recipeId];

}


/* ========================================
   GENNEMSNIT
======================================== */

function getAverageRating(
    ratings
) {

    if (
        !Array.isArray(ratings) ||
        ratings.length === 0
    ) {

        return 0;

    }


    const total =
        ratings.reduce(
            function (
                sum,
                rating
            ) {

                return (
                    sum +
                    Number(rating)
                );

            },
            0
        );


    return (
        total /
        ratings.length
    );

}


/* ========================================
   OPSKRIFTHISTORIK
======================================== */

function getRecipeHistory() {

    return JSON.parse(
        localStorage.getItem(
            "skabRecipeHistory"
        )
    ) || {};

}


function registerRecipeMade(
    recipe
) {

    let history =
        getRecipeHistory();


    if (
        !history[recipe.id]
    ) {

        history[recipe.id] = {

            timesMade: 0,

            lastMade: null

        };

    }


    history[recipe.id].timesMade++;


    history[recipe.id].lastMade =
        new Date().toISOString();


    localStorage.setItem(
        "skabRecipeHistory",
        JSON.stringify(
            history
        )
    );

}


/* ========================================
   LAV OPSKRIFT
======================================== */

function makeRecipe(
    recipe
) {

    registerRecipeMade(
        recipe
    );


    let pantryIngredients =
        JSON.parse(
            localStorage.getItem(
                "skabIngredients"
            )
        ) || [];


    recipe.ingredients.forEach(
        function (recipeIngredient) {

            const pantryIngredient =
                findPantryIngredient(
                    recipeIngredient,
                    pantryIngredients
                );


            if (!pantryIngredient) {

                return;

            }


            const recipeBase =
                convertToBaseUnit(
                    recipeIngredient.amount,
                    recipeIngredient.unit
                );


            const pantryBase =
                convertToBaseUnit(
                    pantryIngredient.quantity,
                    pantryIngredient.unit
                );


            if (
                recipeBase.unit !==
                pantryBase.unit
            ) {

                return;

            }


            const remaining =
                pantryBase.amount -
                recipeBase.amount;


            if (
                remaining > 0
            ) {

                pantryIngredient.quantity =
                    convertFromBaseUnit(
                        remaining,
                        pantryIngredient.unit
                    );

            } else {

                pantryIngredients =
                    pantryIngredients.filter(
                        function (item) {

                            return (
                                item.id !==
                                pantryIngredient.id
                            );

                        }
                    );

            }

        }
    );


    localStorage.setItem(
        "skabIngredients",
        JSON.stringify(
            pantryIngredients
        )
    );


    showRecipe(
        recipe,
        true
    );

}


/* ========================================
   VIS OPSKRIFT
======================================== */

function showRecipe(
    recipe,
    wasMade = false
) {

    const recipeDetail =
        document.getElementById(
            "recipeDetail"
        );


    if (!recipeDetail) {

        return;

    }


    const pantryIngredients =
        JSON.parse(
            localStorage.getItem(
                "skabIngredients"
            )
        ) || [];


    let enoughCount = 0;
    let partialCount = 0;
    let missingCount = 0;


    const ingredientList =
        recipe.ingredients
            .map(
                function (ingredient) {

                    const pantryIngredient =
                        findPantryIngredient(
                            ingredient,
                            pantryIngredients
                        );


                    const comparison =
                        compareIngredient(
                            ingredient,
                            pantryIngredient
                        );


                    if (
                        comparison.status ===
                        "enough"
                    ) {

                        enoughCount++;

                    }


                    if (
                        comparison.status ===
                        "partial"
                    ) {

                        partialCount++;

                    }


                    if (
                        comparison.status ===
                        "missing"
                    ) {

                        missingCount++;

                    }


                    let statusClass =
                        comparison.status;

                    let statusIcon;

                    let statusText;


                    if (
                        comparison.status ===
                        "enough"
                    ) {

                        statusIcon =
                            "✓";

                        statusText =
                            "Du har nok";

                    } else if (
                        comparison.status ===
                        "partial"
                    ) {

                        statusIcon =
                            "−";

                        statusText =
                            `Mangler ${formatAmount(
                                comparison.missingAmount,
                                comparison.missingUnit
                            )}`;

                    } else {

                        statusIcon =
                            "○";

                        statusText =
                            `Mangler ${formatAmount(
                                comparison.missingAmount,
                                comparison.missingUnit
                            )}`;

                    }


                    return `

                        <li class="${statusClass}">

                            <span>

                                <span class="ingredient-status">
                                    ${statusIcon}
                                </span>

                                ${ingredient.name}

                            </span>


                            <span class="ingredient-amount">

                                ${formatAmount(
                                    ingredient.amount,
                                    ingredient.unit
                                )}

                                <small>
                                    ${statusText}
                                </small>

                            </span>

                        </li>

                    `;

                }
            )
            .join("");


    const totalIngredients =
        recipe.ingredients.length;


    const matchPercentage =
        (
            enoughCount /
            totalIngredients
        ) * 100;


    /*
       RATING
    */

    const ratings =
        getRatings();


    let recipeRatings =
        ratings[recipe.id];


    if (
        typeof recipeRatings ===
        "number"
    ) {

        recipeRatings = [
            recipeRatings
        ];

    }


    if (
        !Array.isArray(recipeRatings)
    ) {

        recipeRatings = [];

    }


    const averageRating =
        getAverageRating(
            recipeRatings
        );


    const ratingCount =
        recipeRatings.length;


    let ratingSummary;


    if (
        ratingCount === 0
    ) {

        ratingSummary =
            "Ingen vurderinger endnu";

    } else {

        ratingSummary =
            `${averageRating.toFixed(1)}/5 · ${ratingCount} vurdering${ratingCount === 1 ? "" : "er"}`;

    }


    /*
       HISTORIK
    */

    const history =
        getRecipeHistory();


    const timesMade =
        history[recipe.id]
            ? history[recipe.id].timesMade
            : 0;


    recipeDetail.innerHTML = `

        <p class="recipe-category">
            ${recipe.category}
        </p>


        <h1>
            ${recipe.name}
        </h1>


        <p class="recipe-description">
            ${recipe.description}
        </p>


        <div class="recipe-match">

            <div>

                <strong>
                    ${enoughCount} AF ${totalIngredients}
                </strong>

                <span>
                    ingredienser har du nok af
                </span>

            </div>


            <div class="match-bar">

                <div
                    class="match-progress"
                    style="width: ${matchPercentage}%"
                ></div>

            </div>

        </div>


        <div class="recipe-meta">

            <div class="recipe-meta-item">

                <span>
                    Tid
                </span>

                <strong>
                    ${recipe.time}
                </strong>

            </div>


            <div class="recipe-meta-item">

                <span>
                    Sværhedsgrad
                </span>

                <strong>
                    ${recipe.difficulty}
                </strong>

            </div>


            <div class="recipe-meta-item">

                <span>
                    Vurdering
                </span>

                <strong>
                    ${ratingSummary}
                </strong>

            </div>

        </div>


        <div class="recipe-body">


            <div>

                <h2>
                    Ingredienser
                </h2>


                <ul class="ingredients">

                    ${ingredientList}

                </ul>


                <div class="recipe-actions">

                    <button
                        id="makeRecipeButton"
                        class="make-recipe-button"
                        type="button"
                    >
                        Lav opskriften
                    </button>


                    <button
                        id="rateRecipeButton"
                        class="rate-recipe-button"
                        type="button"
                    >
                        Vurder opskrift
                    </button>

                </div>


                <div
                    id="recipeConfirmation"
                    class="recipe-confirmation hidden"
                >

                    <p class="recipe-confirmation-label">
                        ER DU SIKKER?
                    </p>


                    <h3>
                        Lav ${recipe.name}?
                    </h3>


                    <p>
                        De ingredienser, du har i dit skab,
                        bliver trukket fra dine beholdninger.
                    </p>


                    <div class="confirmation-buttons">

                        <button
                            id="confirmRecipeButton"
                            class="confirm-button"
                            type="button"
                        >
                            Ja, lav opskriften
                        </button>


                        <button
                            id="cancelRecipeButton"
                            class="cancel-button"
                            type="button"
                        >
                            Annuller
                        </button>

                    </div>

                </div>


                <div
                    id="recipeRating"
                    class="recipe-rating hidden"
                >

                    <p class="recipe-rating-label">
                        DIN VURDERING
                    </p>


                    <h3>
                        Hvordan var opskriften?
                    </h3>


                    <div class="rating-stars">

                        <button
                            class="rating-star"
                            data-rating="1"
                            type="button"
                        >★</button>


                        <button
                            class="rating-star"
                            data-rating="2"
                            type="button"
                        >★</button>


                        <button
                            class="rating-star"
                            data-rating="3"
                            type="button"
                        >★</button>


                        <button
                            class="rating-star"
                            data-rating="4"
                            type="button"
                        >★</button>


                        <button
                            class="rating-star"
                            data-rating="5"
                            type="button"
                        >★</button>

                    </div>


                    <button
                        id="saveRatingButton"
                        class="save-rating-button"
                        type="button"
                    >
                        Gem vurdering
                    </button>


                    <div
                        id="ratingSavedMessage"
                        class="rating-saved-message"
                    ></div>

                </div>


                <div
                    id="recipeMadeMessage"
                    class="recipe-made-message ${wasMade ? "" : "hidden"}"
                >

                    <strong>
                        ${recipe.name} er lavet.
                    </strong>

                    <span>
                        De ingredienser, du havde,
                        er trukket fra dit skab.
                    </span>

                </div>


                <div class="recipe-history-info">

                    <span>
                        OPSKRIFTSHISTORIK
                    </span>

                    <strong>
                        ${timesMade === 1
                            ? "Lavet 1 gang"
                            : `Lavet ${timesMade} gange`}
                    </strong>

                </div>

            </div>


            <div>

                <h2>
                    Sådan gør du
                </h2>


                <ol class="steps">

                    ${recipe.steps
                        .map(
                            function (step) {

                                return `
                                    <li>
                                        ${step}
                                    </li>
                                `;

                            }
                        )
                        .join("")}

                </ol>

            </div>

        </div>

    `;


    /* ========================================
       KNAPPER
    ======================================== */

    const makeRecipeButton =
        document.getElementById(
            "makeRecipeButton"
        );


    const rateRecipeButton =
        document.getElementById(
            "rateRecipeButton"
        );


    const recipeConfirmation =
        document.getElementById(
            "recipeConfirmation"
        );


    const confirmRecipeButton =
        document.getElementById(
            "confirmRecipeButton"
        );


    const cancelRecipeButton =
        document.getElementById(
            "cancelRecipeButton"
        );


    const recipeRating =
        document.getElementById(
            "recipeRating"
        );


    const ratingStars =
        document.querySelectorAll(
            ".rating-star"
        );


    const saveRatingButton =
        document.getElementById(
            "saveRatingButton"
        );


    let selectedRating = 0;


    /* ========================================
       LAV OPSKRIFT
    ======================================== */

    if (makeRecipeButton) {

        makeRecipeButton.addEventListener(
            "click",
            function () {

                recipeConfirmation.classList.remove(
                    "hidden"
                );

                makeRecipeButton.style.display =
                    "none";

            }
        );

    }


    if (cancelRecipeButton) {

        cancelRecipeButton.addEventListener(
            "click",
            function () {

                recipeConfirmation.classList.add(
                    "hidden"
                );

                makeRecipeButton.style.display =
                    "";

            }
        );

    }


    if (confirmRecipeButton) {

        confirmRecipeButton.addEventListener(
            "click",
            function () {

                makeRecipe(
                    recipe
                );

            }
        );

    }


    /* ========================================
       VURDER OPSKRIFT
    ======================================== */

    if (rateRecipeButton) {

        rateRecipeButton.addEventListener(
            "click",
            function () {

                recipeRating.classList.toggle(
                    "hidden"
                );

            }
        );

    }


    /* ========================================
       STJERNER
    ======================================== */

    ratingStars.forEach(
        function (star) {

            star.addEventListener(
                "click",
                function () {

                    selectedRating =
                        Number(
                            star.dataset.rating
                        );


                    ratingStars.forEach(
                        function (otherStar) {

                            const value =
                                Number(
                                    otherStar.dataset.rating
                                );


                            if (
                                value <=
                                selectedRating
                            ) {

                                otherStar.classList.add(
                                    "selected"
                                );

                            } else {

                                otherStar.classList.remove(
                                    "selected"
                                );

                            }

                        }
                    );

                }
            );

        }
    );


    /* ========================================
       GEM VURDERING
    ======================================== */

    if (saveRatingButton) {

        saveRatingButton.addEventListener(
            "click",
            function () {

                const message =
                    document.getElementById(
                        "ratingSavedMessage"
                    );


                if (
                    selectedRating === 0
                ) {

                    message.textContent =
                        "Vælg en vurdering først.";

                    return;

                }


                const savedRatings =
                    saveRating(
                        recipe.id,
                        selectedRating
                    );


                const average =
                    getAverageRating(
                        savedRatings
                    );


                message.textContent =
                    `Din vurdering er gemt · Gennemsnit: ${average.toFixed(1)}/5 (${savedRatings.length} vurdering${savedRatings.length === 1 ? "" : "er"})`;


                /*
                   Nulstil valget,
                   men behold beskeden.
                */

                selectedRating = 0;


                ratingStars.forEach(
                    function (star) {

                        star.classList.remove(
                            "selected"
                        );

                    }
                );


                /*
                   Opdater rating øverst
                   på siden.
                */

                const ratingMeta =
                    document.querySelector(
                        ".recipe-meta-item:nth-child(3) strong"
                    );


                if (ratingMeta) {

                    ratingMeta.textContent =
                        `${average.toFixed(1)}/5 · ${savedRatings.length} vurdering${savedRatings.length === 1 ? "" : "er"}`;

                }

            }
        );

    }

}


/* ========================================
   DAGE TIL UDLØB
======================================== */

function calculateDaysUntilExpiry(
    expiry
) {

    if (!expiry) {

        return Infinity;

    }


    const today =
        new Date();


    today.setHours(
        0,
        0,
        0,
        0
    );


    const expiryDate =
        new Date(
            expiry
        );


    expiryDate.setHours(
        0,
        0,
        0,
        0
    );


    const difference =
        expiryDate -
        today;


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
   START
======================================== */

const recipeDetail =
    document.getElementById(
        "recipeDetail"
    );


if (recipeDetail) {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const recipeId =
        params.get(
            "id"
        );


    const recipe =
        recipes.find(
            function (item) {

                return (
                    item.id ===
                    recipeId
                );

            }
        );


    if (recipe) {

        showRecipe(
            recipe
        );

    } else {

        recipeDetail.innerHTML = `

            <h1>
                Opskriften blev ikke fundet.
            </h1>

        `;

    }

}