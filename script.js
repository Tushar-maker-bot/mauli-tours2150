/* =====================================================
   DESTINATION SEARCH
   ===================================================== */

function searchDestination() {

    const searchInput =
        document.getElementById("destinationSearch");

    const searchResult =
        document.getElementById("searchResult");

    const packages =
        document.querySelectorAll(".package-card");

    if (!searchInput || !searchResult) {
        return;
    }

    const searchValue =
        searchInput.value.trim().toLowerCase();


    /* ================= EMPTY SEARCH ================= */

    if (searchValue === "") {

        packages.forEach(function(packageCard) {

            packageCard.classList.remove("search-hidden");

        });

        searchResult.innerHTML = "";

        return;
    }


    /* ================= SEARCH ================= */

    let foundTours = 0;


    packages.forEach(function(packageCard) {

        const destination =
            packageCard.getAttribute("data-destination") || "";


        const destinationText =
            destination.toLowerCase();


        if (destinationText.includes(searchValue)) {

            packageCard.classList.remove("search-hidden");

            foundTours++;

        } else {

            packageCard.classList.add("search-hidden");

        }

    });


    /* ================= RESULT MESSAGE ================= */

    if (foundTours > 0) {

        searchResult.innerHTML =
            "✅ " +
            foundTours +
            " tour" +
            (foundTours > 1 ? "s" : "") +
            " found for \"" +
            searchInput.value +
            "\".";

    } else {

        searchResult.innerHTML =
            "❌ No tour package found for \"" +
            searchInput.value +
            "\".";

    }


    /* ================= SCROLL TO PACKAGES ================= */

    const packagesSection =
        document.getElementById("packages");


    if (packagesSection) {

        setTimeout(function() {

            packagesSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 150);

    }

}


/* =====================================================
   QUICK SEARCH
   ===================================================== */

function quickSearch(destination) {

    const searchInput =
        document.getElementById("destinationSearch");


    if (!searchInput) {
        return;
    }


    searchInput.value = destination;

    searchDestination();

}


/* =====================================================
   ENTER KEY SEARCH
   ===================================================== */

document.addEventListener("DOMContentLoaded", function() {

    const searchInput =
        document.getElementById("destinationSearch");


    if (searchInput) {

        searchInput.addEventListener(
            "keypress",
            function(event) {

                if (event.key === "Enter") {

                    searchDestination();

                }

            }
        );

    }

});
