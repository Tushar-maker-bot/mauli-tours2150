/* =====================================================
   TOUR DESTINATION SEARCH
   Search results appear separately above Popular Packages
   ===================================================== */

const tourPackages = [

    {
        name: "Mahabaleshwar",
        image: "mahabaleshwar.jpg",
        description: "Queen of Hills, Waterfalls & Beautiful Hill Station",
        link: "mahabaleshwar.html"
    },

    {
        name: "Lonavala",
        image: "lonavala.jpg",
        description: "Hill Station, Waterfalls, Lakes & Scenic Views",
        link: "lonavala.html"
    },

    {
        name: "Raigad Fort",
        image: "raigad.jpg",
        description: "Historic Fort, Shivaji Maharaj & Sahyadri Views",
        link: "raigad.html"
    },

    {
        name: "Shirdi",
        image: "shirdi.jpg",
        description: "Sai Baba Darshan & Spiritual Journey",
        link: "shirdi.html"
    },

    {
        name: "Matheran",
        image: "matheran.jpg",
        description: "Beautiful Hill Station & Peaceful Nature",
        link: "matheran.html"
    },

    {
        name: "Goa",
        image: "goa.jpg.jpeg",
        description: "Beaches, Forts, Water Sports & Nightlife",
        link: "goa.html"
    },

    {
        name: "Alibaug",
        image: "alibaug.jpg",
        description: "Beaches, Forts & Relaxing Coastal Experience",
        link: "alibaug.html"
    },

    {
        name: "Ganpatipule",
        image: "ganpatipule.jpg",
        description: "Beach, Temple & Beautiful Konkan Experience",
        link: "ganpatipule.html"
    },

    {
        name: "Tadoba",
        image: "tadoba.jpg",
        description: "Wildlife Safari & Tiger Reserve Adventure",
        link: "tadoba.html"
    },

    {
        name: "Panhala",
        image: "panhala.jpg",
        description: "Historic Fort & Scenic Mountain Views",
        link: "panhala.html"
    },

    {
        name: "Konkan",
        image: "konkan.jpg",
        description: "Beaches, Temples, Nature & Coastal Journey",
        link: "konkan.html"
    },

    {
        name: "Bhandardara",
        image: "bhandardara.jpg",
        description: "Lakes, Mountains, Waterfalls & Nature",
        link: "bhandardara.html"
    },

    {
        name: "Kaas Plateau",
        image: "kaas.jpg",
        description: "Valley of Flowers & Beautiful Natural Landscapes",
        link: "kaas.html"
    },

    {
        name: "Nashik",
        image: "nashik.jpg",
        description: "Temples, Vineyards & Trimbakeshwar",
        link: "nashik.html"
    },

    {
        name: "Panchgani",
        image: "panchgani.jpg",
        description: "Hill Station, Table Land & Scenic Views",
        link: "panchgani.html"
    },

    {
        name: "Murud Janjira",
        image: "murud-janjira.jpg",
        description: "Janjira Fort, Beach & Coastal Experience",
        link: "murud-janjira.html"
    },

    {
        name: "Harihareshwar",
        image: "harihareshwar.jpg",
        description: "Temple, Beach & Konkan Coastal Experience",
        link: "harihareshwar.html"
    },

    {
        name: "Diveagar",
        image: "diveagar.jpg",
        description: "Beautiful Beach & Peaceful Konkan Experience",
        link: "diveagar.html"
    },

    {
        name: "Pratapgad",
        image: "pratapgad.jpg",
        description: "Historic Fort & Sahyadri Mountain Views",
        link: "pratapgad.html"
    },

    {
        name: "Amboli Ghat",
        image: "amboli.jpg",
        description: "Waterfalls, Forests & Beautiful Western Ghats",
        link: "amboli.html"
    },

    {
        name: "Chikhaldara",
        image: "chikhaldara.jpg",
        description: "Hill Station, Waterfalls & Melghat Views",
        link: "chikhaldara.html"
    },

    {
        name: "Dapoli",
        image: "dapoli.jpg",
        description: "Beautiful Beaches & Konkan Nature",
        link: "dapoli.html"
    },

    {
        name: "Kolhapur",
        image: "kolhapur.jpg",
        description: "Mahalaxmi Temple, Forts & Cultural Experience",
        link: "kolhapur.html"
    },

    {
        name: "Igatpuri",
        image: "igatpuri.jpg",
        description: "Mountains, Waterfalls & Scenic Nature",
        link: "igatpuri.html"
    },

    {
        name: "Malshej Ghat",
        image: "malshej.jpg",
        description: "Waterfalls, Mountains & Monsoon Experience",
        link: "malshej.html"
    },

    {
        name: "Sinhagad",
        image: "sinhagad.jpg",
        description: "Historic Fort & Beautiful Sahyadri Views",
        link: "sinhagad.html"
    },

    {
        name: "Pandharpur",
        image: "pandharpur.jpg",
        description: "Vitthal Darshan & Spiritual Journey",
        link: "pandharpur.html"
    },


];


/* ================= SEARCH FUNCTION ================= */

function searchDestination() {

    const input = document.getElementById("destinationSearch");
    const result = document.getElementById("searchResult");

    if (!input || !result) {
        return;
    }

    const searchText = input.value.trim().toLowerCase();

    /* Empty search */
    if (searchText === "") {
        result.innerHTML = "";
        return;
    }

    /* Find matching destinations */
    const matches = tourPackages.filter(function(tour) {

        return tour.name.toLowerCase().includes(searchText);

    });


    /* No result */
    if (matches.length === 0) {

        result.innerHTML = `
            <div class="no-search-result">
                ❌ No tour package found for
                <strong>"${input.value}"</strong>.
            </div>
        `;

        return;
    }


    /* Create result cards */

    let html = `
        <div class="search-result-title">
            🔎 Search Results
        </div>
    `;


    matches.forEach(function(tour) {

        html += `
            <div class="search-result-card">

                <img
                    src="${tour.image}"
                    alt="${tour.name} Tour">

                <div class="search-result-content">

                    <h3>${tour.name}</h3>

                    <p>${tour.description}</p>

                    <a
                        href="${tour.link}"
                        class="btn">
                        View Details
                    </a>

                </div>

            </div>
        `;

    });


    result.innerHTML = html;


    /* Scroll slightly to search results */

    result.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}


/* ================= QUICK SEARCH ================= */

function quickSearch(destination) {

    const input = document.getElementById("destinationSearch");

    if (!input) {
        return;
    }

    input.value = destination;

    searchDestination();
}


/* ================= ENTER KEY SEARCH ================= */

document.addEventListener("DOMContentLoaded", function() {

    const input = document.getElementById("destinationSearch");

    if (input) {

        input.addEventListener("keypress", function(event) {

            if (event.key === "Enter") {

                searchDestination();

            }

        });

    }

});
