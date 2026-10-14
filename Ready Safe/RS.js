/* =====================================
   MOBILE NAVIGATION
===================================== */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", function () {
    navMenu.classList.toggle("active");

    if (navMenu.classList.contains("active")) {
        menuBtn.textContent = "✕";
    } else {
        menuBtn.textContent = "☰";
    }
});


/* Close mobile menu after clicking a link */

const navLinks = document.querySelectorAll("#navMenu a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("active");

        menuBtn.textContent = "☰";

    });

});


/* =====================================
   DISASTER SAFETY TIPS
===================================== */

const disasterTips = {

    flood: {
        icon: "🌊",
        title: "Flood Safety",
        text:
            "Move to higher ground when flooding occurs. Never walk, swim, or drive through moving floodwater. Keep your emergency kit with you and follow official evacuation instructions."
    },

    earthquake: {
        icon: "🌋",
        title: "Earthquake Safety",
        text:
            "During an earthquake, Drop, Cover, and Hold On. Stay away from windows and objects that may fall. After the shaking stops, check for hazards and follow official instructions."
    },

    typhoon: {
        icon: "🌪️",
        title: "Typhoon Safety",
        text:
            "Monitor official weather updates and warnings. Secure loose objects around your home, prepare your emergency kit, and evacuate when authorities advise you to do so."
    },

    fire: {
        icon: "🔥",
        title: "Fire Safety",
        text:
            "Leave the building immediately when a fire occurs. Stay low if there is smoke and use the safest available exit. Never go back inside a burning building."
    },

    landslide: {
        icon: "⛰️",
        title: "Landslide Safety",
        text:
            "Stay away from steep slopes and areas showing signs of movement. If authorities issue an evacuation warning, leave immediately and move to a safer location."
    },

    storm: {
        icon: "⚡",
        title: "Thunderstorm Safety",
        text:
            "Stay indoors during severe thunderstorms. Avoid open areas, tall isolated objects, and unnecessary contact with electrical equipment. Monitor official warnings."
    }

};


function showTip(type) {

    const tip = disasterTips[type];

    document.getElementById("tipIcon").textContent = tip.icon;

    document.getElementById("tipTitle").textContent = tip.title;

    document.getElementById("tipText").textContent = tip.text;

    document.getElementById("tipModal").classList.add("show");

}


function closeModal() {

    document.getElementById("tipModal").classList.remove("show");

}


/* Close modal when clicking outside */

document.getElementById("tipModal").addEventListener("click", function (event) {

    if (event.target === this) {
        closeModal();
    }

});


/* =====================================
   EMERGENCY KIT CHECKLIST
===================================== */

const kitItems = document.querySelectorAll(".kit-item");

const progressNumber = document.getElementById("progressNumber");

const progressText = document.getElementById("progressText");

const progressFill = document.getElementById("progressFill");


function updateProgress() {

    const totalItems = kitItems.length;

    let completedItems = 0;

    kitItems.forEach(function (item) {

        if (item.checked) {
            completedItems++;
        }

    });

    const percentage =
        Math.round((completedItems / totalItems) * 100);


    progressNumber.textContent = percentage + "%";

    progressText.textContent =
        completedItems + " of " + totalItems + " items prepared";

    progressFill.style.width = percentage + "%";


    /* Save checklist to browser */

    const checkedItems = [];

    kitItems.forEach(function (item, index) {

        checkedItems[index] = item.checked;

    });

    localStorage.setItem(
        "readySafeChecklist",
        JSON.stringify(checkedItems)
    );

}


/* Update progress when checkbox changes */

kitItems.forEach(function (item) {

    item.addEventListener("change", updateProgress);

});


/* =====================================
   LOAD SAVED CHECKLIST
===================================== */

function loadChecklist() {

    const savedItems =
        localStorage.getItem("readySafeChecklist");


    if (!savedItems) {
        updateProgress();
        return;
    }


    const checkedItems =
        JSON.parse(savedItems);


    kitItems.forEach(function (item, index) {

        item.checked = checkedItems[index] || false;

    });


    updateProgress();

}


loadChecklist();


/* =====================================
   ESC KEY CLOSES MODAL
===================================== */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeModal();
    }

});