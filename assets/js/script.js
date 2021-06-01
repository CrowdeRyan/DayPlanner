$(document).ready(() => {
  displayEvents();

  //Retrieving moment, applying format, and displaying time
  var now = moment().format("MM/DD/YYYY");
  var about = moment().format("hh:mm a");
  var date = $("#currentDay");
  date.text("Today is " + now + " & it's about " + about);

  // Modifying elements based on time
  var hour = moment().format("HH");
  var currentHour = Number.parseInt(hour);
  $(".event").each(function () {
    var inputHour = Number.parseInt(this.getAttribute("data-time"));
    if (inputHour < currentHour) {
      $(this).addClass("past");
    } else if (inputHour === currentHour) {
      $(this).removeClass("past");
      $(this).addClass("present");
    } else {
      $(this).removeClass("past");
      $(this).removeClass("present");
      $(this).addClass("future");
    }
  });

  // Save button functionality
  $(".btn").on("click", function (event) {
    event.preventDefault();
    var hour = this.getAttribute("data-time");
    var data = $("#event" + hour).val();
    var index = $("#event" + hour).attr("data-index");
    setLocalStorage(index, data);
  });

  // Local storage manipulation
  function setLocalStorage(index, data) {
    if (!getLocalStorage()) {
      localStorage.setItem("events", JSON.stringify([]));
    }
    var events = getLocalStorage();
    events[index] = data;
    localStorage.setItem("events", JSON.stringify(events));
    console.log(events);
  }

  // Retrieving Local storage data
  function getLocalStorage() {
    var events = localStorage.getItem("events");
    return JSON.parse(events);
  }

  // Displaying local storage data
  function displayEvents() {
    var events = getLocalStorage();
    for (var index in events) {
      var i = Number.parseInt(index) + 9;
      $("#event" + i).val(events[index]);
    }
    console.log(index);
    console.log(events);
  }
});
