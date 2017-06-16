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

    let myDate = new Date();
    let dateCell = {
        day: myDate.getDate(),
        dayOfWeek: myDate.getDay(),
        month: myDate.getMonth(),
        year: myDate.getFullYear(),
    };

    let createEntry = function(arg) {
        let entry = document.createElement("option");
        entry.setAttribute("value", arg);
        entry.innerText = arg;
        return entry;
    }

    // fill drop menus
    MONTH_LIST.forEach(function(elem) {
        monthMenu.appendChild(createEntry(elem));
    });

    for (let i = START_YEAR; i <= END_YEAR; i++) {
        yearMenu.appendChild(createEntry(i));
    }

    // event listeners
    monthMenu.onchange = function(event) {
        console.log("month changed to " + event.target.value);
    }
    yearMenu.onchange = function(event) {
        console.log("year changed to " + event.target.value);
    }

    prevButton.onclick = function() {
        if (monthMenu.value !== MONTH_LIST[0]) {
            let monthIndex = MONTH_LIST.indexOf(monthMenu.value);
            monthMenu.value = MONTH_LIST[monthIndex - 1];
        } else if (monthMenu.value === MONTH_LIST[0] &&
                    yearMenu.value > START_YEAR) {
            monthMenu.value = MONTH_LIST[11];
            yearMenu.value--;
        }
    }

    nextButton.onclick = function() {
        if (monthMenu.value !== MONTH_LIST[11]) {
            let monthIndex = MONTH_LIST.indexOf(monthMenu.value);
            monthMenu.value = MONTH_LIST[monthIndex + 1];
        } else if (monthMenu.value === MONTH_LIST[11] &&
                    yearMenu.value < END_YEAR) {
            monthMenu.value = MONTH_LIST[0];
            yearMenu.value++;
        }
    }
    // Drawing table
    for (let i = 0; i < 5; i++) {
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
        // console.log(newDate); // diagnostics
        // console.log(numberOfDays); // diagnostics
        // console.log(firstDay); // diagnostics

        let dateCells = Array.from(document.querySelectorAll("#calendar td"));
        dateCells.forEach(function(elem, index) {
            // elem.innerText = index;
        })
        console.log(dateCells); // diagnostics
    }

    render(2017, 5);
}

window.onload = init;
