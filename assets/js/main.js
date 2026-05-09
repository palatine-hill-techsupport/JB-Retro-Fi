const sectionButtons = document.querySelectorAll("[data-section]");
const pages = document.querySelectorAll(".page");
const storeTabs = document.querySelector(".store-state-tabs");
const storeList = document.querySelector(".store-list");
const remoteDisplay = document.querySelector(".remote-display");
const chartRows = document.querySelector("[data-chart-rows]");
const musicStatus = document.querySelector("[data-music-status]");
const albumStatus = document.querySelector("[data-album-status]");
const albumArt = document.querySelector("[data-album-art]");
const albumTitle = document.querySelector("[data-album-title]");
const albumArtist = document.querySelector("[data-album-artist]");
const albumCopy = document.querySelector("[data-album-copy]");

const sectionLabels = {
    welcome: "",
    charts: "Charts",
    album: "AOTW",
    about: "About",
    tvs: "TVs",
    "new-at-jb": "New JB",
    audio: "Audio",
    computers: "Comput.",
    "computer-parts": "PC Parts",
    gaming: "Gaming",
    mobile: "Mobile",
    movies: "Movies + TV",
    music: "Music",
    appliances: "Applian.",
    "smart-home": "Smart Home",
    collectibles: "Collect.",
    "office-tech": "Office Tech",
    "extra-care": "Extra Care",
    "mobile-services": "Mobile Srv.",
    "trade-in": "Trade In",
    installations: "Installs",
    stores: "Stores"
};

const storesByState = {
    ACT: ["Belconnen", "Canberra City", "Fyshwick", "Tuggeranong", "Woden"],
    NSW: [
        "Albury", "Artarmon", "Bankstown", "Bathurst", "Belrose", "Blacktown",
        "Bondi Junction", "Broadway", "Brookvale", "Campbelltown", "Caringbah",
        "Castle Hill", "Chatswood", "Coffs Harbour", "Dubbo", "Erina", "Glendale",
        "Gosford", "Hornsby", "Kotara", "Liverpool", "Macarthur", "Macquarie",
        "Miranda", "Newcastle", "North Sydney", "Orange", "Parramatta", "Penrith",
        "Rouse Hill", "Shellharbour", "Sydney City", "Tamworth", "Taren Point",
        "Tweed City", "Wagga Wagga", "Warringah Mall", "Wetherill Park", "Wollongong"
    ],
    NT: ["Berrimah", "Darwin", "Palmerston"],
    QLD: [
        "Bald Hills", "Biggera Waters", "Brisbane City", "Broadbeach", "Browns Plains",
        "Buddina", "Bundaberg", "Burleigh Heads", "Cairns", "Capalaba", "Carindale",
        "Chermside", "Garden City", "Helensvale", "Ipswich", "Kawana", "Loganholme",
        "Mackay", "Maroochydore", "Morayfield", "Mount Gravatt", "Noosa", "Robina",
        "Rockhampton", "Springfield", "Toowoomba", "Townsville", "Underwood"
    ],
    SA: [
        "Adelaide", "Adelaide Airport", "Cavan", "Colonnades", "Elizabeth",
        "Gepps Cross", "Marion", "Modbury", "Munno Para", "Noarlunga", "Rundle Mall",
        "West Lakes"
    ],
    TAS: ["Devonport", "Hobart", "Launceston", "Rosny"],
    VIC: [
        "Airport West", "Altona North", "Ballarat", "Bendigo", "Brighton", "Broadmeadows",
        "Chadstone", "Cheltenham", "Cranbourne", "Dandenong", "Doncaster", "Eastland",
        "Epping", "Essendon", "Fountain Gate", "Frankston", "Geelong", "Glen Waverley",
        "Heidelberg", "Highpoint", "Hoppers Crossing", "Keilor", "Knox", "Maribyrnong",
        "Melbourne Central", "Melton", "Mildura", "Moorabbin", "Mornington", "Nunawading",
        "Prahran", "Preston", "Richmond", "Ringwood", "South Wharf", "Springvale",
        "Sunbury", "Traralgon", "Watergardens", "Werribee"
    ],
    WA: [
        "Armadale", "Belmont", "Booragoon", "Bunbury", "Cannington", "Carousel",
        "Claremont", "Cockburn", "Geraldton", "Joondalup", "Karrinyup", "Mandurah",
        "Midland", "Morley", "Osborne Park", "Perth City", "Rockingham", "Whitford"
    ],
    NZ: ["Albany", "Auckland CBD", "Botany", "Christchurch", "Hamilton", "Manukau", "Newmarket", "Wellington"]
};

const fallbackTracks = [
    { strTrack: "Yellow", strArtist: "Coldplay", strAlbum: "Parachutes" },
    { strTrack: "Harder, Better, Faster, Stronger", strArtist: "Daft Punk", strAlbum: "Discovery" },
    { strTrack: "Everlong", strArtist: "Foo Fighters", strAlbum: "The Colour And The Shape" },
    { strTrack: "No One Knows", strArtist: "Queens of the Stone Age", strAlbum: "Songs For The Deaf" },
    { strTrack: "Teardrop", strArtist: "Massive Attack", strAlbum: "Mezzanine" }
];

const fallbackAlbum = {
    strAlbum: "Discovery",
    strArtist: "Daft Punk",
    strAlbumThumb: "assets/products/music.jpg",
    strGenre: "Electronic",
    strReleaseDate: "2001",
    strDescriptionEN: "A JB-ready classic for the Album Of The Week slot while the music chart feed is unavailable."
};

function normaliseFeedEntries(entry) {
    if (!entry) {
        return [];
    }

    return Array.isArray(entry) ? entry : [entry];
}

function largestItunesImage(entry) {
    const images = entry["im:image"] || [];
    return images.length ? images[images.length - 1].label : "assets/products/music.jpg";
}

function normaliseItunesTrack(entry) {
    return {
        strTrack: entry["im:name"]?.label,
        strArtist: entry["im:artist"]?.label,
        strAlbum: entry["im:collection"]?.["im:name"]?.label || entry.category?.attributes?.label || "Single"
    };
}

function normaliseItunesAlbum(entry) {
    return {
        strAlbum: entry["im:name"]?.label,
        strArtist: entry["im:artist"]?.label,
        strAlbumThumb: largestItunesImage(entry),
        strGenre: entry.category?.attributes?.label || "Music",
        strReleaseDate: entry["im:releaseDate"]?.attributes?.label || entry["im:releaseDate"]?.label,
        strDescriptionEN: `${entry["im:name"]?.label || "This album"} is currently sitting at the top of the Australian iTunes albums feed.`
    };
}

function renderCharts(tracks, sourceLabel) {
    if (!chartRows) {
        return;
    }

    chartRows.innerHTML = tracks.slice(0, 10).map((track, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${track.strTrack || "Untitled"}</td>
            <td>${track.strArtist || "Unknown artist"}</td>
            <td>${track.strAlbum || "Album TBA"}</td>
        </tr>
    `).join("");

    if (musicStatus) {
        musicStatus.textContent = sourceLabel;
    }
}

function renderAlbum(album, sourceLabel) {
    if (albumTitle) {
        albumTitle.textContent = album.strAlbum || "Album Of The Week";
    }
    if (albumArtist) {
        albumArtist.textContent = album.strArtist || "Various Artists";
    }
    if (albumArt) {
        albumArt.src = album.strAlbumThumb || "assets/products/music.jpg";
        albumArt.alt = `${album.strAlbum || "Album"} cover`;
    }
    if (albumCopy) {
        const detail = [album.strGenre, album.strReleaseDate].filter(Boolean).join(" / ");
        albumCopy.textContent = detail
            ? `${detail}. ${album.strDescriptionEN}`
            : album.strDescriptionEN || "A charting album pulled into the old JB frame for a modern Album Of The Week.";
    }
    if (albumStatus) {
        albumStatus.textContent = sourceLabel;
    }
}

async function initialiseMusicPanels() {
    try {
        const [trackResponse, albumResponse] = await Promise.all([
            fetch("https://itunes.apple.com/au/rss/topsongs/limit=10/json"),
            fetch("https://itunes.apple.com/au/rss/topalbums/limit=1/json")
        ]);

        if (!trackResponse.ok || !albumResponse.ok) {
            throw new Error("Music chart request failed");
        }

        const [trackData, albumData] = await Promise.all([
            trackResponse.json(),
            albumResponse.json()
        ]);

        const tracks = normaliseFeedEntries(trackData.feed?.entry).map(normaliseItunesTrack);
        const albums = normaliseFeedEntries(albumData.feed?.entry).map(normaliseItunesAlbum);

        renderCharts(tracks.length ? tracks : fallbackTracks, "Australian top songs, loaded from the iTunes chart feed.");
        renderAlbum(albums[0] || fallbackAlbum, "Album picked from the Australian iTunes top albums feed.");
    } catch (error) {
        renderCharts(fallbackTracks, "Offline fallback chart. The live chart feed can fill this when online.");
        renderAlbum(fallbackAlbum, "Offline fallback album. The live chart feed can fill this when online.");
    }
}

function showSection(sectionId) {
    pages.forEach((page) => {
        page.classList.toggle("active", page.id === sectionId);
    });

    sectionButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.section === sectionId);
    });

    if (remoteDisplay) {
        remoteDisplay.value = sectionLabels[sectionId] || "";
    }

    window.scrollTo(0, 0);
}

function renderStores(state = "VIC") {
    if (!storeTabs || !storeList) {
        return;
    }

    storeTabs.querySelectorAll("button").forEach((button) => {
        button.classList.toggle("active", button.dataset.state === state);
    });

    const stores = storesByState[state] || [];
    const fontSize = stores.length > 30 ? 14 : stores.length > 18 ? 16 : 19;
    const rowGap = stores.length > 30 ? 31 : stores.length > 18 ? 33 : 36;
    const firstStoreY = 118;
    const orbitHeight = Math.max(560, firstStoreY + stores.length * rowGap + 110);

    const links = stores.map((store, index) => {
        const progress = stores.length > 1 ? index / (stores.length - 1) : 0;
        const left = 250 + Math.sin(progress * Math.PI) * 250;
        const top = firstStoreY + index * rowGap;

        return `<a class="store-orbit-link" style="left:${left.toFixed(1)}px; top:${top.toFixed(1)}px; font-size:${fontSize}px" href="https://www.jbhifi.com.au/pages/store-finder/" target="_blank" rel="noreferrer">${store}</a>`;
    }).join("");

    storeList.innerHTML = `
        <div class="store-orbit" style="--orbit-height:${orbitHeight}px">
            <img class="store-orbit-logo" src="assets/images/JB-Logo.png" alt="JB Hi-Fi">
            <div class="store-product store-product-screen"><img src="assets/catalog/tv-oled.jpg" alt=""></div>
            <div class="store-product store-product-stack"><img src="assets/catalog/audio-speaker.jpg" alt=""></div>
            <svg class="store-arc" viewBox="0 0 260 720" preserveAspectRatio="none" aria-hidden="true">
                <path d="M18 16 C312 82 310 632 18 704"></path>
            </svg>
            <div class="store-orbit-state">${state} stores</div>
            ${links}
        </div>
    `;
}

function initialiseStores() {
    if (!storeTabs || !storeList) {
        return;
    }

    storeTabs.innerHTML = Object.keys(storesByState)
        .map((state) => `<button type="button" data-state="${state}">${state}</button>`)
        .join("");

    storeTabs.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-state]");
        if (button) {
            renderStores(button.dataset.state);
        }
    });

    renderStores("VIC");
}

sectionButtons.forEach((button) => {
    button.addEventListener("click", () => {
        showSection(button.dataset.section);
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        showSection("welcome");
    }
});

initialiseStores();
initialiseMusicPanels();
showSection("welcome");
