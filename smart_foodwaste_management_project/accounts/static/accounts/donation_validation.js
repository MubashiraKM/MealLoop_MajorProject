document.addEventListener("DOMContentLoaded", function () {

  let foodData = {};

  const categorySelect = document.getElementById("foodCategory");
  const foodSelect = document.getElementById("foodName");
  const unitSelect = document.getElementById("unit");
  const quantityInput = document.getElementById("quantity");
  const pickupDateInput = document.getElementById("pickupDate");
  const pickupTimeInput = document.getElementById("pickupTime");
  const form = document.getElementById("donationForm");

  // Hidden form fields
  const hiddenFoodCategory = document.getElementById("hiddenFoodCategory");
  const hiddenFoodName = document.getElementById("hiddenFoodName");
  const hiddenQuantity = document.getElementById("hiddenQuantity");
  const hiddenPickup = document.getElementById("hiddenPickup");


  // Load JSON dynamically
  fetch(FOOD_JSON_PATH)
    .then(res => res.json())
    .then(data => {
      foodData = data;
      populateCategories();
      setMinDate();
    })
    .catch(() => alert("⚠ Could not load food data file!"));


  function populateCategories() {
    Object.keys(foodData).forEach(category => {
      categorySelect.innerHTML += `<option value="${category}">${category}</option>`;
    });
  }

  categorySelect.addEventListener("change", () => {
    foodSelect.innerHTML = "<option value=''>Select Food</option>";
    unitSelect.innerHTML = "<option value=''>Select Unit</option>";
    foodSelect.disabled = true;
    unitSelect.disabled = true;

    if (!categorySelect.value) return;

    Object.keys(foodData[categorySelect.value]).forEach(food => {
      foodSelect.innerHTML += `<option value="${food}">${food}</option>`;
    });

    foodSelect.disabled = false;
  });

  foodSelect.addEventListener("change", () => {
    unitSelect.innerHTML = "<option value=''>Select Unit</option>";
    unitSelect.disabled = true;

    if (!foodSelect.value) return;

    foodData[categorySelect.value][foodSelect.value].forEach(unit => {
      unitSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
    });

    unitSelect.disabled = false;
  });


  // Minimum valid date
  function setMinDate() {
    pickupDateInput.min = new Date().toISOString().split("T")[0];
  }

  pickupDateInput.addEventListener("change", () => {
    const now = new Date();
    const selected = new Date(pickupDateInput.value);

    pickupTimeInput.min = (selected.toDateString() === now.toDateString())
      ? `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
      : "00:00";
  });


  // Phone validation
  document.getElementById("contact").addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 10);
  });

  // Quantity must be positive
  quantityInput.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "");
  });


  // Submit handler
  form.addEventListener("submit", (e) => {

    if (!form.checkValidity()) return;

    if (!categorySelect.value || !foodSelect.value || !unitSelect.value) {
      e.preventDefault();
      alert("Please complete all food selection fields.");
      return;
    }

    const pickupDateTime = new Date(`${pickupDateInput.value}T${pickupTimeInput.value}`);
    if (pickupDateTime < new Date()) {
      e.preventDefault();
      alert("Pickup date/time cannot be earlier than now.");
      return;
    }

    hiddenFoodCategory.value = categorySelect.value;
    hiddenFoodName.value = foodSelect.value;
    hiddenQuantity.value = `${quantityInput.value} ${unitSelect.value}`;
    hiddenPickup.value = `${pickupDateInput.value}T${pickupTimeInput.value}`;
  });

});
