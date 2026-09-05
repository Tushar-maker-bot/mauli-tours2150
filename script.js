/* =====================================================
   MAULI TOURS & TRAVELS
   WORKING DESTINATION SEARCH
   ===================================================== */

const tourPackages = [
    {
        destination: "Mahabaleshwar",
        image: "mahabaleshwar.jpg",
        duration: "2 Days / 1 Night",
        title: "Mahabaleshwar",
        description: "Escape to the Queen of Hills",
        link: "mahabaleshwar.html"
    },
    {
        destination: "Lonavala",
        image: "lonavala.jpg.jpeg",
        duration: "2 Days / 1 Night",
        title: "Lonavala",
        description: "Hills, Waterfalls & Nature",
        link: "lonavala.html"
    },
    {
        destination: "Raigad",
        image: "raigad.jpg.jpeg",
        duration: "1 Day",
        title: "Raigad Fort",
        description: "The Pride of Swarajya",
        link: "raigad.html"
    },
    {
        destination: "Shirdi",
        image: "shirdi.jpg.jpeg",
        duration: "2 Days / 1 Night",
        title: "Shirdi",
        description: "Divine Blessings of Sai Baba",
        link: "shirdi.html"
    },
    {
        destination: "Matheran",
        image: "matheran.jpg.jpeg",
        duration: "2 Days / 1 Night",
        title: "Matheran",
        description: "Explore Hills",
        link: "matheran.html"
    },
    {
        destination: "Goa",
        image: "goa.jpg.jpeg",
        duration: "3 Days / 2 Nights",
        title: "Goa",
        description: "Beaches, Fun & Adventure",
        link: "goa.html"
    },
    {
        destination: "Goa Holiday Tour",
        image: "goa.jpg.jpeg",
        duration: "5 Days / 4 Nights",
        title: "Goa Holiday Tour",
        description: "Beaches, Sightseeing, Adventure & Relaxing Holiday",
        link: "goabig.html"
    },
    {
        destination: "Konkan Coastal Tour",
        image: "konkan.jpg",
        duration: "8 Days / 7 Nights",
        title: "Konkan Coastal Tour",
        description: "Beaches, Forts, Temples, Nature & Coastal Adventure",
        link: "konkanbig.html"
    },
    {
        destination: "Ashtavinayak",
        image: "ashtavinayak.jpg",
        duration: "8 Days / 7 Nights",
        title: "Ashtavinayak Yatra",
        description: "Complete Ashtavinayak Ganpati Temple Spiritual Journey",
        link: "ashtavinayakbig.html"
    },
    {
        destination: "Maharashtra Jyotirlinga",
        image: "jyotirlinga.jpg",
        duration: "6 Days / 5 Nights",
        title: "Maharashtra Jyotirlinga Yatra",
        description: "Visit Maharashtra's four sacred Jyotirlingas",
        link: "jyotirlingabig.html"
    },
    {
        destination: "Kolhapur",
        image: "kolhapur.jpg",
        duration: "2 Days / 1 Night",
        title: "Kolhapur",
        description: "Temples, Forts, Culture & Heritage",
        link: "kolhapur.html"
    },
    {
        destination: "Alibaug",
        image: "alibaug.jpg",
        duration: "2 Days / 1 Night",
        title: "Alibaug",
        description: "Beaches, Forts & Relaxation",
        link: "alibaug.html"
    },
    {
        destination: "Ganpatipule",
        image: "ganpatipule.jpg",
        duration: "2 Days / 1 Night",
        title: "Ganpatipule",
        description: "Beach, Temple & Coastal Beauty",
        link: "ganpatipule.html"
    },
    {
        destination: "Tadoba",
        image: "tadoba.jpg",
        duration: "2 Days / 1 Night",
        title: "Tadoba",
        description: "Wildlife, Jungle Safari & Adventure",
        link: "tadoba.html"
    },
    {
        destination: "Igatpuri",
        image: "igatpuri.jpg",
        duration: "2 Days / 1 Night",
        title: "Igatpuri",
        description: "Mountains, Waterfalls & Peaceful Nature",
        link: "igatpuri.html"
    },
    {
        destination: "Panhala",
        image: "panhala.jpg",
        duration: "2 Days / 1 Night",
        title: "Panhala",
        description: "Fort, History & Scenic Mountains",
        link: "panhala.html"
    },
    {
        destination: "Konkan",
        image: "konkan.jpg",
        duration: "4 Days / 3 Nights",
        title: "Konkan",
        description: "Beaches, Nature & Coastal Adventure",
        link: "konkan.html"
    },
    {
        destination: "Nashik Trimbakeshwar",
        image: "nashiktrimbakeshwar.jpg",
        duration: "2 Days / 1 Night",
        title: "Nashik–Trimbakeshwar",
        description: "Temples, Spirituality & Sacred Places",
        link: "nashiktrimbakeshwar.html"
    },
    {
        destination: "Bhandardara",
        image: "bhandardara.jpg",
        duration: "2 Days / 1 Night",
        title: "Bhandardara",
        description: "Mountains, Lakes & Nature",
        link: "bhandardara.html"
    },
    {
        destination: "Kaas Plateau",
        image: "kass.jpg",
        duration: "2 Days / 1 Night",
        title: "Kaas Plateau",
        description: "Valley of Flowers & Natural Beauty",
        link: "kaas.html"
    },
    {
        destination: "Panchgani",
        image: "panchgani.jpg",
        duration: "2 Days / 1 Night",
        title: "Panchgani",
        description: "Hills, Valleys & Scenic Nature",
        link: "panchgani.html"
    },
    {
        destination: "Murud Janjira",
        image: "murudjanjira.jpg",
        duration: "2 Days / 1 Night",
        title: "Murud–Janjira",
        description: "Sea, Forts & Coastal Adventure",
        link: "murudjanjira.html"
    },
    {
        destination: "Harihareshwar Diveagar",
        image: "harihareshwardiveagar.jpg",
        duration: "2 Days / 1 Night",
        title: "Harihareshwar–Diveagar",
        description: "Beaches, Temples & Coastal Escape",
        link: "harihareshwar-diveagar.html"
    },
    {
        destination: "Pratapgad Wai",
        image: "pratapgad-wai.jpg",
        duration: "2 Days / 1 Night",
        title: "Pratapgad–Wai",
        description: "Forts, Temples, History & Scenic Nature",
        link: "pratapgad-wai.html"
    },
    {
        destination: "Amboli Ghat",
        image: "ambolighat.jpg",
        duration: "2 Days / 1 Night",
        title: "Amboli Ghat",
        description: "Waterfalls, Hills & Scenic Nature",
        link: "amboli-ghat.html"
    },
    {
        destination: "Chikhaldara",
        image: "chikhaldara.jpg",
        duration: "2 Days / 1 Night",
        title: "Chikhaldara",
        description: "Hills, Lakes, Waterfalls & Wildlife",
        link: "chikhaldara.html"
    },
    {
        destination: "Dapoli",
        image: "dapoli.jpg",
        duration: "2 Days / 1 Night",
        title: "Dapoli",
        description: "Beaches, Temples & Coastal Nature",
        link: "dapoli.html"
    },
    {
        destination: "Malshej Ghat",
        image: "malshejghat.jpg",
        duration: "2 Days / 1 Night",
        title: "Malshej Ghat",
        description: "Mountains, Waterfalls & Scenic Valleys",
        link: "malshej-ghat.html"
    },
    {
        destination: "Sinhagad",
        image: "sinhagad.jpg",
        duration: "2 Days / 1 Night",
        title: "Sinhagad",
        description: "Fort, History & Scenic Mountain Views",
        link: "sinhagad.html"
    },
    {
        destination: "Tarkarli–Malvan",
        image: "tarkarli-malvan.jpg",
        duration: "3 Days / 2 Nights",
        title: "Tarkarli–Malvan",
        description: "Beautiful beaches, Sindhudurg Fort & water activities",
        link: "tarkarlimalvan.html"
    },
    {
        destination: "Shrivardhan Harihareshwar",
        image: "shrivardhanharihareshwar.jpg",
        duration: "2 Days / 1 Night",
        title: "Shrivardhan–Harihareshwar",
        description: "Beaches, Temples & Peaceful Coastal Escape",
        link: "shrivardhan-harihareshwar.html"
    },
    {
        destination: "Pandharpur",
        image: "pandharpur.jpg",
        duration: "1 Day",
        title: "Pandharpur",
        description: "Vitthal Darshan, Temples & Spiritual Journey",
        link: "pandharpur.html"
    }
];


/* =====================================================
   SEARCH
   ===================================================== */

function searchDestination() {

    const input = document.getElementById("destinationSearch");
    const result = document.getElementById("searchResult");

    if (!input || !result) {
        console.error("Search bar elements are missing.");
        return;
    }

    const value = input.value.trim().toLowerCase();

    if (value === "") {
        result.innerHTML = "";
        return;
    }

    const matches = tourPackages.filter(function (tour) {

        return (
            tour.destination.toLowerCase().includes(value) ||
            tour.title.toLowerCase().includes(value)
        );

    });


    if (matches.length === 0) {

        result.innerHTML = `
            <div class="no-result">
                <h3>No Tour Package Found</h3>
                <p>Please try Mahabaleshwar, Goa, Lonavala, Raigad or another destination.</p>
            </div>
        `;

        result.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        return;
    }


    result.innerHTML = `

        <div class="search-result-heading">

            <span class="eyebrow">
                ✦ SEARCH RESULTS
            </span>

            <h2>
                ${matches.length}
                Tour Package${matches.length > 1 ? "s" : ""}
                Found
            </h2>

        </div>

        <div class="packages-grid">

            ${matches.map(function (tour) {

                return `

                    <article class="package-card">

                        <div class="package-image">

                            <img
                                src="${tour.image}"
                                alt="${tour.title}"
                            >

                        </div>

                        <div class="package-content">

                            <span class="package-duration">
                                ◷ ${tour.duration}
                            </span>

                            <h3>
                                ${tour.title}
                            </h3>

                            <p>
                                ${tour.description}
                            </p>

                            <a
                                href="${tour.link}"
                                class="card-link"
                            >
                                View Details →
                            </a>

                        </div>

                    </article>

                `;

            }).join("")}

        </div>

    `;


    result.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* =====================================================
   QUICK SEARCH
   ===================================================== */

function quickSearch(destination) {

    const input =
        document.getElementById("destinationSearch");

    if (!input) return;

    input.value = destination;

    searchDestination();
}


/* =====================================================
   OLD BUTTON SUPPORT
   ===================================================== */

function selectDestination(destination) {

    quickSearch(destination);

}


/* =====================================================
   PAGE LOAD
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* SEARCH FORM */

    const form =
        document.getElementById("destinationForm");

    if (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            searchDestination();

        });

    }


    /* ENTER KEY */

    const input =
        document.getElementById("destinationSearch");

    if (input) {

        input.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                searchDestination();

            }

        });

    }


    /* POPULAR BUTTONS */

    document.querySelectorAll(".popular-chip").forEach(function (button) {

        button.addEventListener("click", function () {

            const destination =
                button.getAttribute("data-destination");

            quickSearch(destination);

        });

    });


    /* MOBILE MENU */

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");


    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", function () {

            mainNav.classList.toggle("open");

            menuToggle.classList.toggle("active");

        });


        mainNav.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                mainNav.classList.remove("open");

                menuToggle.classList.remove("active");

            });

        });

    }


    /* HEADER SCROLL */

    const header =
        document.getElementById("siteHeader");

    if (header) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 20) {

                header.classList.add("scrolled");

            } else {

                header.classList.remove("scrolled");

            }

        });

    }


    /* CURRENT YEAR */

    const year =
        document.getElementById("currentYear");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

});
