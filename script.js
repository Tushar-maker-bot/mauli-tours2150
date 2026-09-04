// ================= TOUR PACKAGE SEARCH =================

const tourPackages = [

    // Popular Packages
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
        destination: "Goa",
        image: "goa.jpg.jpeg",
        duration: "5 Days / 4 Nights",
        title: "Goa",
        description: "Enjoy beaches, forts, sightseeing, shopping
                    and unforgettable moments in Goa.",
        link: "goabig.html"
    },

    // All Packages
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
        duration: "8 Days / 7 Nights",
        title: "Konkan",
        description: "Explore beautiful beaches, forts, temples,
                    waterfalls and the natural beauty of Konkan.",
        link: "konkanbig.html"
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
        destination: "Ashtavinayak Yatra",
        image: "ashtavinayak.jpg",
        duration: "2 Days / 1 Night",
        title: "Ashtavinayak Yatra",
        description: "Visit all eight sacred Ganpati temples
                    with a comfortable and well-planned journey.",
        link: "ashtavinayakbig.html"
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


// ================= SEARCH FUNCTION =================

function searchDestination() {

    const input = document.getElementById("destinationSearch");
    const result = document.getElementById("searchResult");

    if (!input || !result) {
        console.error("Search elements not found.");
        return;
    }

    const searchText = input.value.trim().toLowerCase();

    // Empty search
    if (searchText === "") {
        result.innerHTML = "";
        return;
    }

    // Search using TITLE and DESTINATION
    const matches = tourPackages.filter(function(tour) {

        return (
            tour.title.toLowerCase().includes(searchText) ||
            tour.destination.toLowerCase().includes(searchText)
        );

    });


    // No package found
    if (matches.length === 0) {

        result.innerHTML = `
            <div class="no-result">
                <h3>😔 No Tour Package Found</h3>
                <p>Please try another destination.</p>
            </div>
        `;

        return;
    }


    // Show search results
    result.innerHTML = `

        <div class="search-result-heading">

            <h2>🔎 Search Results</h2>

            <p>
                ${matches.length}
                tour package${matches.length > 1 ? "s" : ""} found
            </p>

        </div>


        <div class="packages-grid">

            ${matches.map(function(tour) {

                return `

                    <div class="package-card">

                        <img 
                            src="${tour.image}" 
                            alt="${tour.title}"
                        >

                        <div class="package-content">

                            <span class="package-duration">
                                🗓️ ${tour.duration}
                            </span>

                            <h3>${tour.title}</h3>

                            <p>${tour.description}</p>

                            <a href="${tour.link}" class="btn">
                                View Details
                            </a>

                        </div>

                    </div>

                `;

            }).join("")}

        </div>
    `;


    // Scroll to search results
    result.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


// ================= QUICK SEARCH =================

function quickSearch(destination) {

    const input = document.getElementById("destinationSearch");

    if (!input) {
        console.error("Search input not found.");
        return;
    }

    input.value = destination;

    searchDestination();
}


// ================= ENTER KEY SEARCH =================

document.addEventListener("DOMContentLoaded", function () {

    const input = document.getElementById("destinationSearch");

    if (input) {

        input.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                searchDestination();

            }

        });

    }

});
