function init() {
    const MONTH_LIST = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug",
                    "Sep", "Oct", "Nov", "Dec"];
    const START_YEAR = 1970;
    const END_YEAR = 2020;
    const WEEK = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

    let monthMenu = document.getElementById("months");
    let yearMenu = document.getElementById("years");
    let prevButton = document.getElementById("prev");
    let nextButton = document.getElementById("next");
    let calendar = document.getElementById("calendar");

    let createEntry = function(arg1, arg2) {
        let entry = document.createElement("option");
        entry.setAttribute("value", (arg2 !== undefined ? arg2 : arg1));
        entry.innerText = arg1;
        return entry;
    }

    // fill drop menus
    MONTH_LIST.forEach(function(elem, index) {
        monthMenu.appendChild(createEntry(elem, index));
    });

    for (let i = START_YEAR; i <= END_YEAR; i++) {
        yearMenu.appendChild(createEntry(i));
    }

    // event listeners
    monthMenu.onchange = function(event) {
        console.log("Date changed to " + yearMenu.value + " " + event.target.value);
        render(+yearMenu.value, +event.target.value);
    }
    yearMenu.onchange = function(event) {
        console.log("Date changed to " + event.target.value + " " + monthMenu.value);
        render(+event.target.value, +monthMenu.value);
    }

    prevButton.onclick = function() {
        if (monthMenu.value !== "0") {
            monthMenu.value--;
        } else if (monthMenu.value === "0" &&
                    yearMenu.value > START_YEAR) {
            monthMenu.value = "11";
            yearMenu.value--;
        }
        render(+yearMenu.value, +monthMenu.value);
    }

    nextButton.onclick = function() {
        if (monthMenu.value !== "11") {
            monthMenu.value++
        } else if (monthMenu.value === "11" &&
                    yearMenu.value < END_YEAR) {
            monthMenu.value = "0";
            yearMenu.value++;
        }
        render(+yearMenu.value, +monthMenu.value);
    }
    // Drawing table
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            row.appendChild(document.createElement("td"));
        }
        calendar.appendChild(row);
    }
    // Drawing calendar
    function render(year, month) {
        let newDate = new Date(year, month);
        let numberOfDays = new Date(year, month + 1, 0).getDate();
        let firstDay = new Date(year, month, 1).getDay();
        //console.log(newDate); // diagnostics
        console.log(year, month, numberOfDays); // diagnostics
        //console.log(firstDay); // diagnostics

        let dateCells = Array.from(document.querySelectorAll("#calendar td"));
        dateCells.forEach(function(elem, index) {
            elem.innerText = "";
            if (index >= firstDay && index < firstDay + numberOfDays) {
                elem.innerText = index - firstDay + 1;
            }
        });
    }

    let myDate = new Date();
    yearMenu.value = myDate.getFullYear();
    monthMenu.value = myDate.getMonth();
    render(+yearMenu.value, +monthMenu.value);
}

window.onload = init;
