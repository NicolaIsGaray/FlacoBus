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

const testDiv = document.querySelectorAll(".month-payment");
testDiv.forEach(testing => {
    testing.addEventListener("click", () => {
        Swal.fire({
            title: "¿[NOMBRE PASAJERO] ha pagado?",
            text: "La opción elegida será reflejada en el inicio (PAGOS)",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Pagó",
            cancelButtonText: "No Pagó"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "¡Pago Realizado!",
                text: "El pasajero ha pagado.",
                icon: "success"
              });
            }
          });
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
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  return months[monthIndex];
}

// Función para actualizar la visualización de los meses
function updateMonthDisplay(monthClass, monthName, year) {
  // Oculta todos los meses en todos los pasajeros
  document.querySelectorAll('.month-payment').forEach(month => {
    month.classList.remove('active');
  });

  // Muestra el mes actual en todos los pasajeros
  document.querySelectorAll(`.${monthClass}`).forEach(month => {
    month.classList.add('active');
  });

  // Actualiza el texto del mes actual en el slider
  document.getElementById('currentMonth').textContent = `${monthName} ${year}`;
}

// Inicializa el slider
function initSlider() {
  const prevMonthButton = document.getElementById('prevMonth');
  const nextMonthButton = document.getElementById('nextMonth');

  let currentDate = new Date(); // Fecha inicial (mes actual)

  function handleMonthChange() {
    const monthIndex = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const monthClass = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'][monthIndex];
    const monthName = getMonthName(monthIndex);

    // Actualiza la visualización de los meses
    updateMonthDisplay(monthClass, monthName, year);
  }

  // Evento para el botón "Anterior"
  prevMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    handleMonthChange();
  });

  // Evento para el botón "Siguiente"
  nextMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    handleMonthChange();
  });

  // Inicializa la visualización del mes actual
  handleMonthChange();
}

// Inicializa el slider cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initSlider);
//< ARRAY DE MESES />

//< ARRAY DE TURNO >
const shift = ["Mañana", "Tarde"];

// Obtener elementos del DOM
const currentShiftElement = document.getElementById("currentShift");
const prevShiftButton = document.getElementById("prevShift");
const nextShiftButton = document.getElementById("nextShift");

let currentShiftIndex = 0;

// Función para actualizar el turno
const updateShift = () => {
  // Actualizar el texto del turno actual
  currentShiftElement.textContent = shift[currentShiftIndex];

  // Actualizar los IDs de los turnos
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

// Inicializar el turno al cargar la página
updateShift();
//< ARRAY DE TURNO />

//< ARRAY DE LOCALIDAD >
const locations = ["Ciudad", "Colonia"];

// Obtener elementos del DOM
const currentLocationElement = document.getElementById("currentLocation");
const prevLocationButton = document.getElementById("prevLocation");
const nextLocationButton = document.getElementById("nextLocation");

let currentLocationIndex = 0;

// Función para actualizar la localidad
const updateLocation = () => {
  // Actualizar el texto de la localidad actual
  currentLocationElement.textContent = locations[currentLocationIndex];

  // Actualizar los IDs de las localidades
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