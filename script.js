import { usedCars } from "./usedCars.js";

// Reference to the container element
const carListContainer = document.getElementById("car-list");

// Function to create a car component
function createCarComponent(car) {
  const carComponent = document.createElement("div");
  carComponent.classList.add("car-component");

  // Create the HTML structure for the car component
  carComponent.innerHTML = `
    <div class="car-listing">
    <img src="./images/images/${car.image}" alt="${car.make}" />
    <h2>${car.year} ${car.make} ${car.model}</h2>
    <p>Price: $${car.price}</p>
    <p>Color: ${car.color}</p>
    <p>Mileage: ${car.mileage}</p>
    <button> View more </button>
    </div>
  `;

  return carComponent;
}

// Filtering car logic
const minYearInput = document.getElementById("minYear");
const maxYearInput = document.getElementById("maxYear");
const maxMilageInput = document.getElementById("maxMilage");
const maxPriceInput = document.getElementById("maxPrice");
const colorFilterCheckboxes = document.querySelectorAll(
  'input[name="colorFilter"]'
);
const makeFilterCheckboxes = document.querySelectorAll('input[name="make"]');

function filterCars() {
  let minYear = minYearInput.value || 0;
  let maxYear = maxYearInput.value || Infinity;
  let maxMilage = maxMilageInput.value || Infinity;
  let maxPrice = maxPriceInput.value || Infinity;
  // Collect the selected colors from the checkboxes
  const selectedColors = Array.from(colorFilterCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);
  const selectedMake = Array.from(makeFilterCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  // Clear the existing car list by removing all child elements
  while (carListContainer.firstChild) {
    carListContainer.removeChild(carListContainer.firstChild);
  }

  // Loop through the cars and create components

  usedCars.forEach((car) => {
    if (
      car.mileage <= maxMilage &&
      car.year >= minYear &&
      car.year <= maxYear &&
      car.price <= maxPrice &&
      (selectedColors.length === 0 || selectedColors.includes(car.color) ) &&
      (selectedMake.length === 0 || selectedMake.includes(car.make))
    ) {
      const carComponent = createCarComponent(car);
      carListContainer.appendChild(carComponent);
    }
  });
  // If no car elements, tell user there is no cars to display and try again
  if (!carListContainer.firstChild) {
    const emptyText = document.createElement("h1");
    emptyText.innerHTML = "No cars match that criteria.. try again";
    emptyText.style.color = "red";
    carListContainer.appendChild(emptyText);
  }
}

// Reset button logic
function resetFilters() {
  // Reset all filters
  colorFilterCheckboxes.forEach((checkbox) => (checkbox.checked = false));
  minYearInput.value = "";
  maxYearInput.value = "";
  maxMilageInput.value = "";
  maxPriceInput.value = "";

  // Show all cars
  filterCars();
}

// DOM INTERACTION
// Reset event listener
resetButton.addEventListener("click", resetFilters);
// Filter Event listener
filterForm.addEventListener("click", filterCars);
// Just the first time.. Show everything.
filterCars();
