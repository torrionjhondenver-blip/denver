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