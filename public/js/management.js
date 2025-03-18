//ADMIN VERIFICATION
window.addEventListener("load", async () => {
  try {
    const responseConfig = await axios.get("/admin/config");
    const config = await responseConfig.data;

    const response = await axios.get(`/admin${config.auther}`, {
      withCredentials: true,
    });
    const data = await response.data;

    const codeFormContainer = document.getElementById("codeFormContainer");
    const adminContent = document.getElementById("adminContent");

    if (data.isAuthenticated) {
      codeFormContainer.style.display = "none";
      adminContent.style.display = "block";
      loadPassengerData();
    } else {
      codeFormContainer.style.display = "block";
      adminContent.style.display = "none";
    }
  } catch (error) {
    console.error("Error al verificar autenticación");
  }
});

const codeFormContainer = document.getElementById("codeFormContainer");
const codeForm = document.getElementById("codeForm");
const message = document.getElementById("message");
const adminContent = document.getElementById("adminContent");

codeForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const code = document.getElementById("code").value;

  try {
    const responseConfig = await axios.get("/admin/config");
    const config = responseConfig.data;

    const response = await axios.post(`/admin${config.validator}`, {
      code: code,
    });

    if (response.status === 200) {
      adminContent.style.display = "block";
      codeFormContainer.style.display = "none";

      loadPassengerData();
    } else {
      message.textContent = response.data.message;
    }
  } catch (error) {
    if (error.response) {
      message.textContent =
        error.response.data.message || "Error al validar el código";
    } else {
      message.textContent = "Error de conexión";
    }
    console.error("Error al validar el código:", error);
  }
});

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
  if (window.innerWidth < 768) {
    document.querySelectorAll(".month-payment").forEach((month) => {
      month.style.display = "none";
    });

    document.querySelectorAll(".container-pass").forEach((container) => {
      const currentMonthElement = container.querySelector(`#${monthId}`);
      if (currentMonthElement) {
        currentMonthElement.style.display = "flex";
      }
    });
  }

  document.getElementById("currentMonth").textContent = `${monthName} ${year}`;
}

// Inicializa el slider
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

    // Actualiza la visualización del mes
    updateMonthDisplay(monthId, monthName, year);
  }

  // Evento para el botón "Anterior"
  prevMonthButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    handleMonthChange();
  });

  // Evento para el botón "Siguiente"
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

      const passengerModifier = document.createElement("div");
      const passEdit = document.createElement("button");
      const passDel = document.createElement("button");

      passengerModifier.setAttribute("data-passenger-id", pasajero._id);

      passengerModifier.classList.add("passenger-modifier-box");
      passEdit.classList.add("passenger-edit");
      passDel.classList.add("passenger-delete");

      passEdit.innerHTML = "Editar";
      passDel.innerHTML = "Eliminar";

      passengerModifier.append(passEdit);
      passengerModifier.append(passDel);
      passengerName.append(passengerModifier);

      // Verificar el turno y la ubicación del pasajero
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
    assignPaymentEvents();
    getContainers();
  } catch (error) {
    console.error("Error al cargar los datos del pasajero:", error);
  }
}

// <-- REGISTRAR PASAJERO -->
const registerButton = document.getElementById("register");

// Evento para Registrar
const passengerRegister = () => {
  // INPUTS
  const nameValue = document.getElementById("name").value;
  const shiftValue = document.getElementById("shift");

  // Obtener los checkboxes
  const cityCheckbox = document.getElementById("city");
  const colonyCheckbox = document.getElementById("colony");

  // Crear un array para almacenar las selecciones
  const selections = [];

  // Verificar si el checkbox de "Ciudad" está seleccionado
  if (cityCheckbox.checked) {
    selections.push("ciudad");
  }

  // Verificar si el checkbox de "Colonia" está seleccionado
  if (colonyCheckbox.checked) {
    selections.push("colonia");
  }

  console.log(selections);

  return {
    name: nameValue,
    shift: shiftValue.options[shiftValue.selectedIndex].value,
    location: selections,
  };
};

const passengerSend = async () => {
  const { name, shift, location } = passengerRegister();

  const PassengerToSend = {
    name,
    shift,
    location,
  };

  try {
    await axios.post("/admin/add-pasajero", PassengerToSend);
    console.log("Datos enviados correctamente");
  } catch (error) {
    console.log(
      "Error al enviar los datos:",
      error.response?.data || error.message
    );
  }
};

registerButton.addEventListener("click", (e) => {
  e.preventDefault();
  passengerSend();
  window.location.reload();
});
// <-- REGISTRAR PASAJERO --/>

//GET CONTAINER MODIFIER
const getContainers = () => {
  const containers = document.querySelectorAll(".container-pass");
  containers.forEach((container) => {
    if (container) {
      container.addEventListener("click", (e) => {
        if (e.target.classList.contains("passenger-delete")) {
          e.preventDefault();
          const passengerId = e.target
            .closest("[data-passenger-id]")
            .getAttribute("data-passenger-id");
          selectToRemove(passengerId);
        }
        if (e.target.classList.contains("passenger-edit")) {
          e.preventDefault();
          const passengerId = e.target
            .closest("[data-passenger-id]")
            .getAttribute("data-passenger-id");
          selectToEdit(passengerId);
        }
      });
    }
  });
};

// <-- ELIMINAR PASAJERO -->
async function selectToRemove(passengerId) {
  try {
    const response = await axios.get(`/admin/pasajero`);
    const pasajeros = response.data;
    const pasajero = pasajeros.find((p) => p._id === passengerId);

    if (pasajero) {
      const passengerName = pasajero.name;

      Swal.fire({
        title: `¿Deseas eliminar a ${passengerName} de la agenda?`,
        text: "El pasajero dejará de estar en la agenda",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar",
        cancelButtonText: "No Eliminar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await removePassenger(passengerId);

          const passengerContainer = document
            .querySelector(`[data-passenger-id="${passengerId}"]`)
            .closest(".container-pass");
          if (passengerContainer) {
            passengerContainer.remove();
          }
        }
      });
    }
  } catch (error) {
    console.error("No se pudo eliminar el pasajero:", error.message);
  }
}

async function removePassenger(passengerId) {
  try {
    await axios.delete(`/admin/pasajero/${passengerId}`);
    Swal.fire("Eliminado!", "El pasajero ha sido eliminado.", "success");
  } catch (error) {
    console.error("No se pudo eliminar el pasajero:", error.message);
    Swal.fire("Error!", "No se pudo eliminar el pasajero.", "error");
  }
}
// <-- ELIMINAR PASAJERO --/>

// <-- EDITAR PASAJERO -->
async function selectToEdit(passengerId) {
  try {
    const response = await axios.get(`/admin/pasajero`);
    const pasajeros = response.data;
    const pasajero = pasajeros.find((p) => p._id === passengerId);

    if (pasajero) {

      Swal.fire({
        title: "Ingrese el nuevo nombre",
        input: "text",
        inputLabel: "Nombre completo",
        inputPlaceholder: "Ej: Juan Pérez",
        showCancelButton: true,
        confirmButtonText: "Editar",
        cancelButtonText: "Cancelar",
        inputValidator: (value) => {
          // Validación del input
          if (!value) {
            return "Debes ingresar un nombre";
          }
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          const name = result.value;
          await editPassenger(passengerId, name);
        }
      });
    }
  } catch (error) {
    console.error("No se pudo eliminar el pasajero:", error.message);
  }
}

async function editPassenger(passengerId, name) {
  try {
    await axios.post(`/admin/update-pasajero/${passengerId}`, {
      name
    });
    Swal.fire("El nombre ha sido cambiado", "Refresca la página para ver cambios.", "success");
  } catch (error) {
    console.error("No se pudo editar el pasajero:", error.message);
    Swal.fire("Error!", "No se pudo editar el pasajero.", "error");
  }
}
// <-- EDITAR PASAJERO --/>

// <-- EDITAR PAGO -->
async function assignPaymentEvents() {
  const paymentContainers = document.querySelectorAll(".passenger-payout");
  try {
    const response = await axios.get(`/admin/pasajero`);
    const pasajeros = response.data;

    paymentContainers.forEach((payment) => {
      payment.addEventListener("click", (event) => {
        if (event.target.classList.contains("month-payment")) {
          const month = event.target.id;
          const passengerId = payment.getAttribute("data-passenger-id");
          const pasajero = pasajeros.find((p) => p._id === passengerId);

          if (pasajero) {
            const passengerName = pasajero.name;

            Swal.fire({
              title: `¿${passengerName} ha pagado en ${month.toUpperCase()}?`,
              text: "La opción elegida será reflejada en el inicio (PAGOS)",
              icon: "question",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Pagó",
              cancelButtonText: "No Pagó",
            }).then(async (result) => {
              if (result.isConfirmed) {
                event.target.textContent = "PAGÓ";
                event.target.style.color = "green";
                event.target.classList.remove("not-paid");
                event.target.classList.add("paid");

                // Actualizar el pago en la base de datos
                await updatePaymentStatus(passengerId, month, true);
              } else {
                event.target.textContent = "NO PAGÓ";
                event.target.classList.remove("paid");
                event.target.classList.add("not-paid");

                // Actualizar el pago en la base de datos
                await updatePaymentStatus(passengerId, month, false);
                console.log(`El pasajero no pagó en el mes: ${month}`);
              }
            });
          }
        }
      });
    });
  } catch (error) {
    console.log("No se pudo cambiar el pago:" + error.message);
  }
}

// Función para actualizar el estado del pago en la base de datos
async function updatePaymentStatus(passengerId, month, hasPaid) {
  try {
    const response = await axios.put(`/admin/pasajero/${passengerId}/pagos`, {
      month,
      hasPaid,
    });
    console.log("Pago actualizado:", response.data);
  } catch (error) {
    console.error("Error al actualizar el pago:", error.message);
  }
}
// <-- EDITAR PAGO --/>
