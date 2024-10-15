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
  const values = [
  "Europe/Andorra", "Asia/Dubai", "Asia/Kabul", "Europe/Tirane", "Asia/Yerevan", "Antarctica/Casey",
  "Antarctica/Davis", "Antarctica/DumontDurville", "Antarctica/Mawson", "Antarctica/Palmer", "Antarctica/Rothera", "Antarctica/Syowa",
  "Antarctica/Troll", "Antarctica/Vostok", "America/Argentina/Buenos_Aires", "America/Argentina/Cordoba", "America/Argentina/Salta", "America/Argentina/Jujuy",
  "America/Argentina/Tucuman", "America/Argentina/Catamarca", "America/Argentina/La_Rioja", "America/Argentina/San_Juan", "America/Argentina/Mendoza", "America/Argentina/San_Luis",
  "America/Argentina/Rio_Gallegos", "America/Argentina/Ushuaia", "Pacific/Pago_Pago", "Europe/Vienna", "Australia/Lord_Howe", "Antarctica/Macquarie",
  "Australia/Hobart", "Australia/Currie", "Australia/Melbourne", "Australia/Sydney", "Australia/Broken_Hill", "Australia/Brisbane",
  "Australia/Lindeman", "Australia/Adelaide", "Australia/Darwin", "Australia/Perth", "Australia/Eucla", "Asia/Baku",
  "America/Barbados", "Asia/Dhaka", "Europe/Brussels", "Europe/Sofia", "Atlantic/Bermuda", "Asia/Brunei",
  "America/La_Paz", "America/Noronha", "America/Belem", "America/Fortaleza", "America/Recife", "America/Araguaina",
  "America/Maceio", "America/Bahia", "America/Sao_Paulo", "America/Campo_Grande", "America/Cuiaba", "America/Santarem",
  "America/Porto_Velho", "America/Boa_Vista", "America/Manaus", "America/Eirunepe", "America/Rio_Branco", "America/Nassau",
  "Asia/Thimphu", "Europe/Minsk", "America/Belize", "America/St_Johns", "America/Halifax", "America/Glace_Bay",
  "America/Moncton", "America/Goose_Bay", "America/Blanc-Sablon", "America/Toronto", "America/Nipigon", "America/Thunder_Bay",
  "America/Iqaluit", "America/Pangnirtung", "America/Atikokan", "America/Winnipeg", "America/Rainy_River", "America/Resolute",
  "America/Rankin_Inlet", "America/Regina", "America/Swift_Current", "America/Edmonton", "America/Cambridge_Bay", "America/Yellowknife",
  "America/Inuvik", "America/Creston", "America/Dawson_Creek", "America/Fort_Nelson", "America/Vancouver", "America/Whitehorse",
  "America/Dawson", "Indian/Cocos", "Europe/Zurich", "Africa/Abidjan", "Pacific/Rarotonga", "America/Santiago",
  "America/Punta_Arenas", "Pacific/Easter", "Asia/Shanghai", "Asia/Urumqi", "America/Bogota", "America/Costa_Rica",
  "America/Havana", "Atlantic/Cape_Verde", "America/Curacao", "Indian/Christmas", "Asia/Nicosia", "Asia/Famagusta",
  "Europe/Prague", "Europe/Berlin", "Europe/Copenhagen", "America/Santo_Domingo", "Africa/Algiers", "America/Guayaquil",
  "Pacific/Galapagos", "Europe/Tallinn", "Africa/Cairo", "Africa/El_Aaiun", "Europe/Madrid", "Africa/Ceuta",
  "Atlantic/Canary", "Europe/Helsinki", "Pacific/Fiji", "Atlantic/Stanley", "Pacific/Chuuk", "Pacific/Pohnpei",
  "Pacific/Kosrae", "Atlantic/Faroe", "Europe/Paris", "Europe/London", "Asia/Tbilisi", "America/Cayenne",
  "Africa/Accra", "Europe/Gibraltar", "America/Godthab", "America/Danmarkshavn", "America/Scoresbysund", "America/Thule",
  "Europe/Athens", "Atlantic/South_Georgia", "America/Guatemala", "Pacific/Guam", "Africa/Bissau", "America/Guyana",
  "Asia/Hong_Kong", "America/Tegucigalpa", "America/Port-au-Prince", "Europe/Budapest", "Asia/Jakarta", "Asia/Pontianak",
  "Asia/Makassar", "Asia/Jayapura", "Europe/Dublin", "Asia/Jerusalem", "Asia/Kolkata", "Indian/Chagos",
  "Asia/Baghdad", "Asia/Tehran", "Atlantic/Reykjavik", "Europe/Rome", "America/Jamaica", "Asia/Amman",
  "Asia/Tokyo", "Africa/Nairobi", "Asia/Bishkek", "Pacific/Tarawa", "Pacific/Enderbury", "Pacific/Kiritimati",
  "Asia/Pyongyang", "Asia/Seoul", "Asia/Almaty", "Asia/Qyzylorda", "Asia/Qostanay", "Asia/Aqtobe",
  "Asia/Aqtau", "Asia/Atyrau", "Asia/Oral", "Asia/Beirut", "Asia/Colombo", "Africa/Monrovia",
  "Europe/Vilnius", "Europe/Luxembourg", "Europe/Riga", "Africa/Tripoli", "Africa/Casablanca", "Europe/Monaco",
  "Europe/Chisinau", "Pacific/Majuro", "Pacific/Kwajalein", "Asia/Yangon", "Asia/Ulaanbaatar", "Asia/Hovd",
  "Asia/Choibalsan", "Asia/Macau", "America/Martinique", "Europe/Malta", "Indian/Mauritius", "Indian/Maldives",
  "America/Mexico_City", "America/Cancun", "America/Merida", "America/Monterrey", "America/Matamoros", "America/Mazatlan",
  "America/Chihuahua", "America/Ojinaga", "America/Hermosillo", "America/Tijuana", "America/Bahia_Banderas", "Asia/Kuala_Lumpur",
  "Asia/Kuching", "Africa/Maputo", "Africa/Windhoek", "Pacific/Noumea", "Pacific/Norfolk", "Africa/Lagos",
  "America/Managua", "Europe/Amsterdam", "Europe/Oslo", "Asia/Kathmandu", "Pacific/Nauru", "Pacific/Niue",
  "Pacific/Auckland", "Pacific/Chatham", "America/Panama", "America/Lima", "Pacific/Tahiti", "Pacific/Marquesas",
  "Pacific/Gambier", "Pacific/Port_Moresby", "Pacific/Bougainville", "Asia/Manila", "Asia/Karachi", "Europe/Warsaw",
  "America/Miquelon", "Pacific/Pitcairn", "America/Puerto_Rico", "Asia/Gaza", "Asia/Hebron", "Europe/Lisbon",
  "Atlantic/Madeira", "Atlantic/Azores", "Pacific/Palau", "America/Asuncion", "Asia/Qatar", "Indian/Reunion",
  "Europe/Bucharest", "Europe/Belgrade", "Europe/Kaliningrad", "Europe/Moscow", "Europe/Simferopol", "Europe/Kirov",
  "Europe/Astrakhan", "Europe/Volgograd", "Europe/Saratov", "Europe/Ulyanovsk", "Europe/Samara", "Asia/Yekaterinburg",
  "Asia/Omsk", "Asia/Novosibirsk", "Asia/Barnaul", "Asia/Tomsk", "Asia/Novokuznetsk", "Asia/Krasnoyarsk",
  "Asia/Irkutsk", "Asia/Chita", "Asia/Yakutsk", "Asia/Khandyga", "Asia/Vladivostok", "Asia/Ust-Nera",
  "Asia/Magadan", "Asia/Sakhalin", "Asia/Srednekolymsk", "Asia/Kamchatka", "Asia/Anadyr", "Asia/Riyadh",
  "Pacific/Guadalcanal", "Indian/Mahe", "Africa/Khartoum", "Europe/Stockholm", "Asia/Singapore", "America/Paramaribo",
  "Africa/Juba", "Africa/Sao_Tome", "America/El_Salvador", "Asia/Damascus", "America/Grand_Turk", "Africa/Mbabane",
  "America/Montevideo", "Asia/Samarkand", "Asia/Tashkent", "America/Caracas", "Asia/Ho_Chi_Minh", "Pacific/Efate",
  "Pacific/Wallis", "Pacific/Apia", "Africa/Johannesburg"
];


const options  = [
  "Andorra", "Dubai", "Kabul", "Tirane", "Yerevan", "Casey",
  "Davis", "DumontDurville", "Mawson", "Palmer", "Rothera", "Syowa",
  "Troll", "Vostok", "Buenos Aires", "Cordoba", "Salta", "Jujuy",
  "Tucuman", "Catamarca", "La Rioja", "San Juan", "Mendoza", "San Luis",
  "Rio Gallegos", "Ushuaia", "Pago Pago", "Vienna", "Lord Howe", "Macquarie",
  "Hobart", "Currie", "Melbourne", "Sydney", "Broken Hill", "Brisbane",
  "Lindeman", "Adelaide", "Darwin", "Perth", "Eucla", "Baku",
  "Barbados", "Dhaka", "Brussels", "Sofia", "Bermuda", "Brunei",
  "La Paz", "Noronha", "Belem", "Fortaleza", "Recife", "Araguaina",
  "Maceio", "Bahia", "Sao Paulo", "Campo Grande", "Cuiaba", "Santarem",
  "Porto Velho", "Boa Vista", "Manaus", "Eirunepe", "Rio Branco", "Nassau",
  "Thimphu", "Minsk", "Belize", "St Johns", "Halifax", "Glace Bay",
  "Moncton", "Goose Bay", "Blanc-Sablon", "Toronto", "Nipigon", "Thunder Bay",
  "Iqaluit", "Pangnirtung", "Atikokan", "Winnipeg", "Rainy River", "Resolute",
  "Rankin Inlet", "Regina", "Swift Current", "Edmonton", "Cambridge Bay", "Yellowknife",
  "Inuvik", "Creston", "Dawson Creek", "Fort Nelson", "Vancouver", "Whitehorse",
  "Dawson", "Cocos", "Zurich", "Abidjan", "Rarotonga", "Santiago",
  "Punta Arenas", "Easter", "Shanghai", "Urumqi", "Bogota", "Costa Rica",
  "Havana", "Cape Verde", "Curacao", "Christmas", "Nicosia", "Famagusta",
  "Prague", "Berlin", "Copenhagen", "Santo Domingo", "Algiers", "Guayaquil",
  "Galapagos", "Tallinn", "Cairo", "El Aaiun", "Madrid", "Ceuta",
  "Canary Islands", "Helsinki", "Fiji", "Stanley", "Chuuk", "Pohnpei",
  "Kosrae", "Faroe Islands", "Paris", "London", "Tbilisi", "Cayenne",
  "Accra", "Gibraltar", "Godthab", "Danmarkshavn", "Scoresbysund", "Thule",
  "Athens", "South Georgia", "Guatemala", "Guam", "Bissau", "Guyana",
  "Hong Kong", "Tegucigalpa", "Port-au-Prince", "Budapest", "Jakarta", "Pontianak",
  "Makassar", "Jayapura", "Dublin", "Jerusalem", "Kolkata", "Chagos",
  "Baghdad", "Tehran", "Reykjavik", "Rome", "Jamaica", "Amman",
  "Tokyo", "Nairobi", "Bishkek", "Tarawa", "Enderbury", "Kiritimati",
  "Pyongyang", "Seoul", "Almaty", "Qyzylorda", "Qostanay", "Aqtobe",
  "Aqtau", "Atyrau", "Oral", "Beirut", "Colombo", "Monrovia",
  "Vilnius", "Luxembourg", "Riga", "Tripoli", "Casablanca", "Monaco",
  "Chisinau", "Majuro", "Kwajalein", "Yangon", "Ulaanbaatar", "Hovd",
  "Choibalsan", "Macau", "Martinique", "Malta", "Mauritius", "Maldives",
  "Mexico City", "Cancun", "Merida", "Monterrey", "Matamoros", "Mazatlan",
  "Chihuahua", "Ojinaga", "Hermosillo", "Tijuana", "Bahia Banderas", "Kuala Lumpur",
  "Kuching", "Maputo", "Windhoek", "Noumea", "Norfolk Island", "Lagos",
  "Managua", "Amsterdam", "Oslo", "Kathmandu", "Nauru", "Niue",
  "Auckland", "Chatham Islands", "Panama", "Lima", "Tahiti", "Marquesas Islands",
  "Gambier Islands", "Port Moresby", "Bougainville", "Manila", "Karachi", "Warsaw",
  "Saint Pierre and Miquelon", "Pitcairn", "Puerto Rico", "Gaza", "Hebron", "Lisbon",
  "Madeira", "Azores", "Palau", "Asuncion", "Qatar", "Reunion",
  "Bucharest", "Belgrade", "Kaliningrad", "Moscow", "Simferopol", "Kirov",
  "Astrakhan", "Volgograd", "Saratov", "Ulyanovsk", "Samara", "Yekaterinburg",
  "Omsk", "Novosibirsk", "Barnaul", "Tomsk", "Novokuznetsk", "Krasnoyarsk",
  "Irkutsk", "Chita", "Yakutsk", "Khandyga", "Vladivostok", "Ust-Nera",
  "Magadan", "Sakhalin", "Srednekolymsk", "Kamchatka", "Anadyr", "Riyadh",
  "Guadalcanal", "Mahe", "Khartoum", "Stockholm", "Singapore", "Paramaribo",
  "Juba", "Sao Tome", "El Salvador", "Damascus", "Grand Turk", "Mbabane",
  "Montevideo", "Samarkand", "Tashkent", "Caracas", "Ho Chi Minh", "Efate",
  "Wallis", "Apia", "Johannesburg"
];

  for(var i = 0; i < options.length; i++) {
    var el = document.createElement("li");
    el.textContent = options[i];
    el.setAttribute('data-value', values[i]);
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
    let opt = ul.getElementsByTagName('li');

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

    hourSpan.innerHTML = ("0" + hours).slice(-2);
    minuteSpan.innerHTML = ("0" + minutes).slice(-2);;
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

  const opt = tZOptions.getElementsByTagName('li');
  for(let i = 0; i < opt.length; i++) {
    opt[i].addEventListener("click", function() {
      modal.classList.toggle("hidden");
    });

    opt[i].addEventListener("click", function(event) {
      addTimeZone(event.target.getAttribute('data-value')); // Access the text or any attribute of the clicked li
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
    let displayName    = location.split("/")[location.split("/").length - 1].replace(/_/g, " "); //some countries have more than one slash and incl. continent

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
    flag.src = "flags/" + location.split("/")[location.split("/").length - 1].toLowerCase() +  ".svg";
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
