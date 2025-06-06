const datepicker = document.getElementById("datepicker");
const dateInput = document.getElementById("date-input");
const yearInput = document.getElementById("year-input");
const monthInput = document.getElementById("month-input");
const cancelBtn = document.getElementById("cancel");
const applyBtn = document.getElementById("apply");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const dates = document.getElementById("dates");
const footer = document.getElementById("datepicker-footer");

let selectedDate = new Date();
let year = selectedDate.getFullYear();
let month = selectedDate.getMonth();

// show datepicker
dateInput.addEventListener("click", () => {
  datepicker.hidden = false;
});

// hide datepicker
cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  datepicker.hidden = true;
});

// handle apply button click event
applyBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // set the selected date to date input
  dateInput.value = selectedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });


  // hide datepicker
  datepicker.hidden = true;
});

// handle next month nav
nextBtn.addEventListener("click", () => {
  if (month === 11) year++;
  month = (month + 1) % 12;
  displayDates();
});

// handle prev month nav
prevBtn.addEventListener("click", () => {
  if (month === 0) year--;
  month = (month - 1 + 12) % 12;
  displayDates();
});

// handle month input change event
monthInput.addEventListener("change", () => {
  month = monthInput.selectedIndex;
  displayDates();
  restrictDates();
});

// handle year input change event
yearInput.addEventListener("change", () => {
  year = yearInput.value;
  displayDates();
});

const updateYearMonth = () => {
  monthInput.selectedIndex = month;
  yearInput.value = year;
};

const handleDateClick = (e) => {
  const button = e.target;

  // remove the 'selected' class from other buttons
  const selected = dates.querySelector(".selected");
  selected && selected.classList.remove("selected");

  // add the 'selected' class to current button
  button.classList.add("selected");

  // set the selected date
  selectedDate = new Date(year, month, parseInt(button.textContent));
};

// render the dates in the calendar interface
const displayDates = () => {
  // update year & month whenever the dates are updated
  updateYearMonth();

  // clear the dates
  dates.innerHTML = "";

  //* display the last week of previous month

  // get the last date of previous month
  const lastOfPrevMonth = new Date(year, month, 0);

  for (let i = 0; i <= lastOfPrevMonth.getDay(); i++) {
    const text = lastOfPrevMonth.getDate() - lastOfPrevMonth.getDay() + i;
    const button = createButton(text, true, -1);
    dates.appendChild(button);

  }

  //* display the current month

  // get the last date of the month
  const lastOfMOnth = new Date(year, month + 1, 0);

  for (let i = 1; i <= lastOfMOnth.getDate(); i++) {
    const button = createButton(i, false);
    button.addEventListener("click", handleDateClick);
    button.id = i;
    button.addEventListener('click', (e) =>{
      e.preventDefault();
    });
    dates.appendChild(button);
  }

  //* display the first week of next month

  const firstOfNextMonth = new Date(year, month + 1, 1);

  for (let i = firstOfNextMonth.getDay(); i < 7; i++) {
    const text = firstOfNextMonth.getDate() - firstOfNextMonth.getDay() + i;

    const button = createButton(text, true, 1);
    dates.appendChild(button);
  }
  restrictDates();
  //test();
};

const createButton = (text, isDisabled = false, type = 0) => {
  const currentDate = new Date();

  // determine the date to compare based on the button type
  let comparisonDate = new Date(year, month + type, text);

  // check if the current button is the date today
  const isToday =
    currentDate.getDate() === text &&
    currentDate.getFullYear() === year &&
    currentDate.getMonth() === month;

  // check if the current button is selected
  const selected = selectedDate.getTime() === comparisonDate.getTime();

  const button = document.createElement("button");
  button.textContent = text;
  button.disabled = isDisabled;
  button.classList.toggle("today", isToday && !isDisabled);
  button.classList.toggle("selected", selected);
  return button;
};

displayDates();

function restrictDates() {
    fetch('http://localhost:3000')
        .then((results) => {
            return results.json();
        })
        .then(data => {
            console.log(data);
        
            var month = monthInput.selectedIndex;
            var year = yearInput.value;
            var month = month + 1;
            var year = year - 2000;
            buttonDates = [];
            for (i=1; i<=9;i++) {
                buttonDate = `0${month}/0${i}/${year}`;
                buttonDates.push(buttonDate);
            }
            for (i=10; i<=31;i++) {
              buttonDate = `0${month}/${i}/25`;
              buttonDates.push(buttonDate);
          }
  
            for (i=0; i<=31;i++) {
                  //const button = document.getElementById(i);
                  if (data.includes(buttonDates[i])) {
                          const button = document.getElementById(i+1);
                          button.disabled = true;
                          console.log(button);
                    };
                  };
                });
            };
function test() {
  const buttons = document.getElementsByTagName("button");
  for (const button of buttons) {
    button.disabled = true;
  }
};
