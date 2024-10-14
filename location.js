document.addEventListener("DOMContentLoaded", function() {
  const local          = Intl.DateTimeFormat().resolvedOptions().timeZone.split("/")[1].replace("_", " ");
  const timeNow        = new Date();
  const localTag       = document.getElementById("local-location");
  const localHour      = document.getElementById("local-hour");
  const localMinute    = document.getElementById("local-minute");
  const localTime      = document.getElementsByClassName("local-time")[0];
  const localFlag      = document.getElementById("local-flag");
  const tzButton       = document.getElementById("tz-button");
  const modal          = document.getElementById("modal");
  const modalBox       = document.getElementById("modal-box");
  const modalClose     = document.getElementById("x");
  const timeModalClose = document.getElementById("time-x");
  const timeModal      = document.getElementById("time-modal");
  const timeModalBox   = document.getElementById("time-modal-box");
  const setTimeButton  = document.getElementById("set-time-button");
  const setCurrentTimeButton = document.getElementById("set-current-time-button");
  const input          = document.getElementById("timezone-search");
  const tZOptions      = document.getElementById("timezone-options");
  const tZDropdown     = document.getElementById("timezone-dropdown");
  const locationList   = document.getElementById("location-list");


  //set the scene
  localTag.innerHTML        = local;
  localHour.innerHTML       = ("0" + timeNow.getHours()).slice(-2);
  localMinute.innerHTML     = ("0" + timeNow.getMinutes()).slice(-2);
  localMinute.parentNode.id = Intl.DateTimeFormat().resolvedOptions().timeZone;
  localFlag.src             = "flags/" + local.toLowerCase() +  ".svg";

  //populate dropdown with timezones
  const options = ["New York", "Seoul", "Copenhagen", "Budapest", "Tallinn", "Calcutta", "Berlin", "Dubai", "Buenos Aires", "Kabul",
                   "Andorra", "Tirane"];
  const values  = ["America/New_York", "Asia/Seoul", "Europe/Copenhagen", "Europe/Budapest",
                   "Europe/Tallinn", "Asia/Calcutta", "Europe/Berlin", "Asia/Dubai",
                   "America/Argentina/Buenos_Aires", "Asia/Kabul", "Europe/Andorra", "Europe/Tirane"];

  for(var i = 0; i < options.length; i++) {
    var el = document.createElement("option");
    el.textContent = options[i];
    el.value = values[i];
    el.classList.add("px-4", "py-2", "hover:bg-indigo-600", "hover:text-white", "cursor-pointer");
    tZOptions.appendChild(el);
  }

  //add new timezones
  tzButton.addEventListener("click", function() {
    modal.classList.toggle("hidden");
  });

  modalClose.addEventListener("click", function() {
    modal.classList.toggle("hidden");
  });

  timeModalClose.addEventListener("click", function() {
    timeModal.classList.toggle("hidden");
  });

  input.addEventListener("keyup", function() {
    let filter = input.value.toLowerCase();
    let ul = document.getElementById("timezone-options");
    let opt = ul.getElementsByTagName('option');

    for (let i = 0; i < opt.length; i++) {
      let textValue = opt[i].textContent || opt[i].innerText;
      if (textValue.toLowerCase().indexOf(filter) > -1) {
        opt[i].style.display = "";
      } else {
        opt[i].style.display = "none";
      }
    }
  });

  //change times
  localTime.addEventListener("click", function() {
    openTimeModal(Intl.DateTimeFormat().resolvedOptions().timeZone);
  });

  setCurrentTimeButton.addEventListener("click", function() {
    const currentTime = new Date();
    const timeFlag    = document.getElementById("time-flag");
    const locale      = timeFlag.alt;
    const element     = document.getElementById(locale);
    const hours       = currentTime.getHours();
    const minutes     = currentTime.getMinutes();

    timeModal.classList.toggle("hidden");
    setTime(hours, minutes, element);
  })

  setTimeButton.addEventListener("click", function() {
    const hoursInput   = document.getElementById("hours-input");
    const minutesInput = document.getElementById("minutes-input");
    const timeFlag     = document.getElementById("time-flag");
    const locale       = timeFlag.alt;
    const element      = document.getElementById(locale);
    const hours   = hoursInput.value;
    const minutes = minutesInput.value;

    timeModal.classList.toggle("hidden");
    setTime(hours, minutes, element);
  });

  function openTimeModal(location) {
    const timeFlag = document.getElementById("time-flag");

    timeModal.classList.toggle("hidden");
    timeFlag.src = "flags/" + location.split("/")[1].replace("_", " ").toLowerCase() +  ".svg";
    timeFlag.alt = location;
  }

  function setTime(hours, minutes, element) {
    const hourSpan   = element.querySelector('.hours');
    const minuteSpan = element.querySelector('.minutes');
    const time       = new Date();
    var regExp       = /[a-zA-Z]/g;

    if (!hours || regExp.test(hours)) {
      hours = "00";
    }

    if (!minutes || regExp.test(minutes)) {
      minutes = "00";
    }

    hourSpan.innerHTML = hours;
    minuteSpan.innerHTML = minutes;
    time.setHours(hours);
    time.setMinutes(minutes);

    updateOtherTimes(time, element);
  }

  //they're all getting updated in relation to the local time, instead of in relation to the time of the zone which triggered this update
  //so where are we telling them to update in relation to local time?

  //it's the creation of a Date object. They're always created using the local time zone.
  function updateOtherTimes(time, element) {
    let array = document.getElementsByClassName("time");

    for(let i = 0; i < array.length; i++) {
      if (array[i].id != element.id) {
        const newTime = new Date();
        newTime.setHours(time.getHours());
        newTime.setMinutes(time.getMinutes());

        newTimeString = time.toLocaleTimeString('en-UK', { timeZone: array[i].id })
        array[i].querySelector('.hours').innerHTML = newTimeString.split(":")[0];
        array[i].querySelector('.minutes').innerHTML = newTimeString.split(":")[1];
      }
    }
  }

  const opt = tZOptions.getElementsByTagName('option');
  for(let i = 0; i < opt.length; i++) {
    opt[i].addEventListener("click", function() {
      modal.classList.toggle("hidden");
    });

    opt[i].addEventListener("click", function(event) {
      addTimeZone(event.target.value); // Access the text or any attribute of the clicked li
    });
  }

  function addTimeZone(location) {
    let locationDiv    = document.createElement("div");
    let firstCol       = document.createElement("div");
    let midCol         = document.createElement("p");
    let secondCol      = document.createElement("div");
    let flag           = document.createElement("img");
    let locationString = document.createElement("p");
    let hourSpan       = document.createElement("span");
    let minuteSpan     = document.createElement("span");
    let colon          = document.createElement("p");
    const currentTime  = new Date();
    let array          = document.getElementsByClassName("time");
    let displayName    = location.split("/")[location.split("/").length - 1].replace("_", " "); //some countries have more than one slash and incl. continent

    //don't do anything (don't add another timezone) if one with this location already exists
    for (let i = 0; i < array.length; i++) {
      if (array[i].id == location) {
        return
      }
    }


    currentTime.setHours(localHour.innerHTML);
    currentTime.setMinutes(localMinute.innerHTML);

    locationDiv.classList.add("mt-6", "grid", "gap-x-4", "sm:gap-x-24", "grid-cols-3");
    firstCol.classList.add("inline-flex", "items-center");
    secondCol.classList.add("time", "inline-flex", "items-center");
    secondCol.id = location;
    // secondCol.addEventListener("click", function() {
    //   openTimeModal(location);
    // });
    flag.classList.add("h-6", "w-auto", "rounded-sm");
    flag.src = "flags/" + displayName.toLowerCase() +  ".svg";
    flag.alt = "flag";
    locationString.innerHTML = displayName;
    locationString.classList.add("ml-4", "text-2xl", "whitespace-nowrap");
    hourSpan.classList.add("hours", "mr-2", "inline-flex", "items-center", "rounded-md", "bg-purple-100", "px-2", "py-1", "text-lg", "font-medium", "text-purple-700");
    hourSpan.innerHTML = currentTime.toLocaleTimeString('en-UK', { timeZone: location }).split(":")[0];
    colon.innerHTML    = ":";
    colon.classList.add("text-lg", "font-bold");
    minuteSpan.classList.add("minutes", "ml-2", "inline-flex", "items-center", "rounded-md", "bg-purple-100", "px-2", "py-1", "text-lg", "font-medium", "text-purple-700");
    minuteSpan.innerHTML = currentTime.toLocaleTimeString('en-UK', { timeZone: location }).split(":")[1];
    firstCol.appendChild(flag);
    firstCol.appendChild(locationString);
    secondCol.appendChild(hourSpan);
    secondCol.appendChild(colon);
    secondCol.appendChild(minuteSpan);
    locationDiv.appendChild(firstCol);
    locationDiv.appendChild(midCol);
    locationDiv.appendChild(secondCol);
    locationList.appendChild(locationDiv);
  }

  input.addEventListener("click", function() {
    if (!tZDropdown.classList.contains("hidden")) {
      return;
    }
    tZDropdown.classList.toggle("hidden");
  });

  modalBox.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !tZDropdown.contains(e.target)) tZDropdown.classList.add('hidden');
  });

  document.addEventListener('click', (e) => {
    if (!modalBox.contains(e.target) && !tzButton.contains(e.target)) modal.classList.add('hidden');
  });

  // document.addEventListener('click', (e) => {
  //   if (!timeModalBox.contains(e.target) && !localTime.contains(e.target)) timeModal.classList.add('hidden');
  // });

});
