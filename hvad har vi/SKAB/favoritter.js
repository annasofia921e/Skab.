/* ========================================
   SKAB. — FAVORITTER
======================================== */


/* ========================================
   ELEMENT
======================================== */

const favoritesList =
    document.getElementById("favoritesList");


/* ========================================
   RATINGS
======================================== */

function getRatings() {

    return JSON.parse(
        localStorage.getItem("skabRatings")
    ) || {};

}


/* ========================================
   HISTORIK
======================================== */

function getRecipeHistory() {

    return JSON.parse(
        localStorage.getItem("skabRecipeHistory")
    ) || {};

}


/* ========================================
   GENNEMSNIT
======================================== */

function getAverageRating(ratings) {

    // Hvis der kun findes én gammel rating
    if (typeof ratings === "number") {
        return ratings;
    }

    // Hvis der ikke findes ratings
    if (
        !Array.isArray(ratings) ||
        ratings.length === 0
    ) {
        return 0;
    }

    const total =
        ratings.reduce(
            function (sum, rating) {

                return (
                    sum +
                    Number(rating)
                );

            },
            0
        );

    return total / ratings.length;

}


/* ========================================
   FAVORITTER
======================================== */

function renderFavorites() {

    if (!favoritesList) {
        return;
    }


    favoritesList.innerHTML = "";


    const ratings =
        getRatings();


    const history =
        getRecipeHistory();


    /*
       Find alle opskrifter,
       som brugeren har vurderet.
    */

    const ratedRecipes =
        Object.keys(ratings)
            .map(
                function (recipeId) {

                    const recipe =
                        recipes.find(
                            function (item) {

                                return (
                                    item.id ===
                                    recipeId
                                );

                            }
                        );


                    if (!recipe) {
                        return null;
                    }


                    return {
                        recipe: recipe,
                        ratings: ratings[recipeId]
                    };

                }
            )
            .filter(
                function (item) {

                    return item !== null;

                }
            );


    /*
       Sortér efter gennemsnitlig vurdering.
    */

    ratedRecipes.sort(
        function (a, b) {

            return (
                getAverageRating(b.ratings) -
                getAverageRating(a.ratings)
            );

        }
    );


    /* ========================================
       INGEN FAVORITTER
    ======================================== */

    if (ratedRecipes.length === 0) {

        favoritesList.innerHTML = `

            <div class="empty-favorites">

                <h3>
                    Du har ingen favoritter endnu.
                </h3>

                <p>
                    Giv en opskrift en vurdering,
                    så dukker den op her.
                </p>

            </div>

        `;

        return;

    }


    /* ========================================
       VIS FAVORITTER
    ======================================== */

    ratedRecipes.forEach(
        function (item) {

            const recipe =
                item.recipe;


            const recipeRatings =
                item.ratings;


            const average =
                getAverageRating(
                    recipeRatings
                );


            /*
               Hvis rating er gammel,
               er der kun én vurdering.
            */

            const ratingCount =
                Array.isArray(recipeRatings)
                    ? recipeRatings.length
                    : 1;


            /*
               Lav stjerner ud fra gennemsnittet.
            */

            const roundedAverage =
                Math.round(
                    average
                );


            const stars =
                "★".repeat(
                    roundedAverage
                ) +
                "☆".repeat(
                    5 - roundedAverage
                );


            /*
               Opskriftshistorik.
            */

            const recipeHistory =
                history[recipe.id];


            const timesMade =
                recipeHistory
                    ? recipeHistory.timesMade
                    : 0;


            /*
               Opret favorit-element.
            */

            const favorite =
                document.createElement(
                    "article"
                );


            favorite.className =
                "favorite-item";


            favorite.innerHTML = `

                <a
                    href="opskrift.html?id=${recipe.id}"
                    class="favorite-name"
                >

                    <h3>
                        ${recipe.name}
                    </h3>

                    <span>
                        ${recipe.category}
                    </span>

                </a>


                <div class="favorite-stars">

                    ${stars}

                </div>


                <div class="favorite-rating-text">

                    ${average.toFixed(1)}/5

                </div>


                <div class="favorite-made">

                    ${
                        timesMade === 1
                            ? "Lavet 1 gang"
                            : `Lavet ${timesMade} gange`
                    }

                </div>


                <button
                    class="remove-rating"
                    type="button"
                    aria-label="Fjern vurdering"
                >
                    ×
                </button>

            `;


            /* ========================================
               FJERN FAVORIT
            ======================================== */

            const removeButton =
                favorite.querySelector(
                    ".remove-rating"
                );


            removeButton.addEventListener(
                "click",
                function () {

                    const currentRatings =
                        getRatings();


                    delete currentRatings[
                        recipe.id
                    ];


                    localStorage.setItem(
                        "skabRatings",
                        JSON.stringify(
                            currentRatings
                        )
                    );


                    renderFavorites();

                }
            );


            favoritesList.appendChild(
                favorite
            );

        }
    );

}


/* ========================================
   START
======================================== */

renderFavorites();