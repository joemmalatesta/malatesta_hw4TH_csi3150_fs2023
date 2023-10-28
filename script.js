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
const colorFilterInput = document.getElementById("colorFilter");

function filterCars() {
  let minYear = minYearInput.value || 0;
  let maxYear = maxYearInput.value || Infinity;
  let maxMilage = maxMilageInput.value || Infinity;
  let maxPrice = maxPriceInput.value || Infinity;
  // Change this to a select box.
  let color = colorFilterInput.value;

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
      (color === "Any" || car.color == color)
    ) {
      const carComponent = createCarComponent(car);
      carListContainer.appendChild(carComponent);
    }
  });
  // If no car elements, tell user there is no cars to display and try again
  if (!carListContainer.firstChild){
    const emptyText = document.createElement("h1");
    emptyText.innerHTML = "No cars match that criteria.. try again"
    emptyText.style.color = "red"
    carListContainer.appendChild(emptyText)
  }
}

// Add event listener to the filter form when submit is clicked
// We could alternatively add an event listener to each input element to update each time a value is changed.
const filterForm = document.getElementById("filterForm");
filterForm.addEventListener("click", function (e) {
  filterCars();
});


// Just the first time.. Show everything.
usedCars.forEach((car) => {
  const carComponent = createCarComponent(car);
  carListContainer.appendChild(carComponent);
});
