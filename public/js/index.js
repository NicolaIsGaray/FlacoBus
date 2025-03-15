//LOCATION AND SHIFT SWITCH
const locationCity = document.querySelector(".city");
const locationColony = document.querySelector(".colony");

const cityLogo = document.getElementById("city-logo");
const colonyLogo = document.getElementById("colony-logo");

const sectionCity = document.querySelectorAll(".section-city");
const sectionColony = document.querySelectorAll(".section-colony");

const cityMorning = document.getElementById("morning-city");
const cityAfternoon = document.getElementById("afternoon-city");

const colonyMorning = document.getElementById("morning-colony");
const colonyAfternoon = document.getElementById("afternoon-colony");

const shiftMorning = document.querySelector(".morning");
const shiftAfternoon = document.querySelector(".afternoon");
const shiftClock = document.getElementById("shift-clock");

document.addEventListener("DOMContentLoaded", () => {
  sectionCity.forEach((sectionC) => {
    sectionC.style.display = "block";
    cityMorning.style.display = "block";
    cityAfternoon.style.display = "none";
  });
  sectionColony.forEach((sectionCol) => {
    sectionCol.style.display = "none";
    colonyMorning.style.display = "none";
    colonyAfternoon.style.display = "none";
  });
});

// Función para detectar y aplicar el cambio de localidad y turno
const Switcher = () => {
  if (locationCity.id === "active-location") {
    if (shiftMorning.id === "active-shift") {
      // Turno mañana en ciudad
      cityMorning.style.display = "block";
      cityAfternoon.style.display = "none";
      colonyMorning.style.display = "none";
      colonyAfternoon.style.display = "none";
    } else if (shiftAfternoon.id === "active-shift") {
      // Turno tarde en ciudad
      cityAfternoon.style.display = "block";
      cityMorning.style.display = "none";
      colonyMorning.style.display = "none";
      colonyAfternoon.style.display = "none";
    }
  } else if (locationColony.id === "active-location") {
    if (shiftMorning.id === "active-shift") {
      // Turno mañana en colonia
      colonyMorning.style.display = "block";
      colonyAfternoon.style.display = "none";
      cityMorning.style.display = "none";
      cityAfternoon.style.display = "none";
    } else if (shiftAfternoon.id === "active-shift") {
      // Turno tarde en colonia
      colonyAfternoon.style.display = "block";
      colonyMorning.style.display = "none";
      cityMorning.style.display = "none";
      cityAfternoon.style.display = "none";
    }
  }
};

//< LOCATION SWITCHING >
// Evento para cambiar a Ciudad
locationCity.addEventListener("click", () => {
  locationCity.id = "";
  locationColony.id = "active-location";
  Switcher();

  // Animaciones o estilos adicionales
  locationCity.style.transform = "translateY(30px)";
  locationColony.style.transform = "translateY(0px)";
  cityLogo.style.transform = "translateY(30px)";
  colonyLogo.style.transform = "translateY(0px)";
});

// Evento para cambiar a Colonia
locationColony.addEventListener("click", () => {
  locationCity.id = "active-location";
  locationColony.id = "";
  Switcher();

  // Animaciones o estilos adicionales
  locationCity.style.transform = "translateY(0px)";
  locationColony.style.transform = "translateY(-30px)";
  cityLogo.style.transform = "translateY(0px)";
  colonyLogo.style.transform = "translateY(-30px)";
});
//< LOCATION SWITCHING />

//< SHIFT SWITCHING >
// Evento para cambiar a turno mañana
shiftMorning.addEventListener("click", () => {
  shiftMorning.id = "";
  shiftAfternoon.id = "active-shift";
  Switcher();

  // Animaciones o estilos adicionales
  shiftMorning.style.transform = "translateY(30px)";
  shiftAfternoon.style.transform = "translateY(0px)";
  shiftClock.style.transform = "rotate(180deg)";
});

// Evento para cambiar a turno tarde
shiftAfternoon.addEventListener("click", () => {
  shiftMorning.id = "active-shift";
  shiftAfternoon.id = "";
  Switcher();

  // Animaciones o estilos adicionales
  shiftMorning.style.transform = "translateY(0px)";
  shiftAfternoon.style.transform = "translateY(-30px)";
  shiftClock.style.transform = "rotate(0deg)";
});
//< SHIFT SWITCHING />

Switcher();

//< ARRAY DE MESES >
// Función para obtener el nombre del mes en español
function getMonthName(monthIndex) {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  return months[monthIndex];
}

// Función para actualizar la visualización de los meses
function updateMonthDisplay(monthId, monthName, year) {
  // Verificar si estamos en modo móvil (ancho de pantalla menor a 768px)
  if (window.innerWidth < 768) {
    document.querySelectorAll(".month-payment").forEach((month) => {
      month.style.display = "none";
    });

    // Muestra solo el mes actual en todos los contenedores
    document.querySelectorAll(".container-pass").forEach((container) => {
      const currentMonthElement = container.querySelector(`#${monthId}`);
      if (currentMonthElement) {
        currentMonthElement.style.display = "flex";
      }
    });
  }

  document.getElementById("currentMonth").textContent = `${monthName} ${year}`;
}

function initSlider() {
  const prevMonthButton = document.getElementById("prevMonth");
  const nextMonthButton = document.getElementById("nextMonth");

  let currentDate = new Date();

  function handleMonthChange() {
    const monthIndex = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const monthId = [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ][monthIndex];
    const monthName = getMonthName(monthIndex);

    updateMonthDisplay(monthId, monthName, year);
  }

  prevMonthButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    handleMonthChange();
  });

  nextMonthButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    handleMonthChange();
  });

  handleMonthChange();
}
//< ARRAY DE MESES />

//< ARRAY DE TURNO >
const shift = ["Mañana", "Tarde"];

const currentShiftElement = document.getElementById("currentShift");
const prevShiftButton = document.getElementById("prevShift");
const nextShiftButton = document.getElementById("nextShift");

let currentShiftIndex = 0;

// Función para actualizar el turno
const updateShift = () => {
  currentShiftElement.textContent = shift[currentShiftIndex];

  if (shift[currentShiftIndex] === "Mañana") {
    shiftMorning.id = "active-shift";
    shiftAfternoon.id = "";
  } else if (shift[currentShiftIndex] === "Tarde") {
    shiftMorning.id = "";
    shiftAfternoon.id = "active-shift";
  }

  Switcher();
};

// Evento para el botón "Anterior"
prevShiftButton.addEventListener("click", () => {
  currentShiftIndex--;
  if (currentShiftIndex < 0) {
    currentShiftIndex = shift.length - 1;
  }
  updateShift();
});

// Evento para el botón "Siguiente"
nextShiftButton.addEventListener("click", () => {
  currentShiftIndex++;
  if (currentShiftIndex >= shift.length) {
    currentShiftIndex = 0;
  }
  updateShift();
});

updateShift();
//< ARRAY DE TURNO />

//< ARRAY DE LOCALIDAD >
const locations = ["Ciudad", "Colonia"];

const currentLocationElement = document.getElementById("currentLocation");
const prevLocationButton = document.getElementById("prevLocation");
const nextLocationButton = document.getElementById("nextLocation");

let currentLocationIndex = 0;

// Función para actualizar la localidad
const updateLocation = () => {
  currentLocationElement.textContent = locations[currentLocationIndex];

  if (locations[currentLocationIndex] === "Ciudad") {
    locationCity.id = "active-location";
    locationColony.id = "";
  } else if (locations[currentLocationIndex] === "Colonia") {
    locationCity.id = "";
    locationColony.id = "active-location";
  }

  Switcher();
};

// Evento para el botón "Anterior"
prevLocationButton.addEventListener("click", () => {
  currentLocationIndex--;
  if (currentLocationIndex < 0) {
    currentLocationIndex = locations.length - 1;
  }
  updateLocation();
});

// Evento para el botón "Siguiente"
nextLocationButton.addEventListener("click", () => {
  currentLocationIndex++;
  if (currentLocationIndex >= locations.length) {
    currentLocationIndex = 0;
  }
  updateLocation();
});

updateLocation();
//< ARRAY DE LOCALIDAD />

async function loadPassengerData() {
  try {
    const response = await axios.get(`/admin/pasajero`);
    const pasajeros = response.data;

    pasajeros.forEach((pasajero) => {
      const morningCity = document.getElementById("morning-city");
      const afternoonCity = document.getElementById("afternoon-city");
      const morningColony = document.getElementById("morning-colony");
      const afternoonColony = document.getElementById("afternoon-colony");

      const containerPass = document.createElement("div");
      containerPass.classList.add("container-pass");

      const passengerBox = document.createElement("div");
      passengerBox.classList.add("passenger");

      const paymentContainer = document.createElement("div");
      paymentContainer.classList.add("passenger-payout");
      paymentContainer.setAttribute("data-passenger-id", pasajero._id);

      const passengerName = document.createElement("div");
      passengerName.classList.add("passenger-name");
      passengerName.innerHTML = `<h3>${pasajero.name}</h3>`;

      if (pasajero.shift === "morning" || pasajero.shift === "afternoon") {
        let mainContainer;
        if (pasajero.location.includes("ciudad")) {
          mainContainer =
            pasajero.shift === "morning" ? morningCity : afternoonCity;
        } else if (pasajero.location.includes("colonia")) {
          mainContainer =
            pasajero.shift === "morning" ? morningColony : afternoonColony;
        }

        if (mainContainer) {
          passengerBox.append(passengerName);
          containerPass.append(passengerBox);
          containerPass.append(paymentContainer);
          mainContainer.append(containerPass);
        }
      }

      const months = [
        "ene",
        "feb",
        "mar",
        "abr",
        "may",
        "jun",
        "jul",
        "ago",
        "sep",
        "oct",
        "nov",
        "dic",
      ];
      months.forEach((month) => {
        const monthElement = document.createElement("div");

        monthElement.classList.add("month-payment");
        monthElement.id = month;

        if (pasajero.payments[month]) {
          monthElement.textContent = "PAGÓ";
          monthElement.style.color = "green";
          monthElement.classList.add("paid");
        } else {
          monthElement.innerHTML = "NO PAGÓ";
          monthElement.style.color = "red";
          monthElement.classList.add("not-paid");
        }

        paymentContainer.appendChild(monthElement);
      });
    });

    initSlider();
  } catch (error) {
    console.error("Error al cargar los datos del pasajero:", error);
  }
}

loadPassengerData();