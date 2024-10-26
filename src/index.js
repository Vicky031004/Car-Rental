function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  dropdown.classList.toggle("hidden");
}

function handleSelection(url) {
  if (url) {
    window.location.href = url;
  }
}

window.onclick = function (event) {
  const dropdown = document.getElementById("dropdown-menu");
  if (!event.target.matches(".dropdown-btn")) {
    if (!dropdown.classList.contains("hidden")) {
      dropdown.classList.add("hidden");
    }
  }
};

function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("hidden");
}

function areAllFieldsFilled() {
  const requiredFields = [
    "pickupLocation",
    "dropLocation",
    "pickupDate",
    "pickupTime",
    "returnDate",
    "returnTime",
  ];

  return requiredFields.every(
    (field) => document.getElementById(field).value.trim() !== ""
  );
}

function isDriverOptionSelected() {
  return (
    document
      .getElementById("withDriverBtn")
      .classList.contains("bg-gray-900") ||
    document
      .getElementById("withoutDriverBtn")
      .classList.contains("bg-gray-900")
  );
}

function handleDriverButtonClick(buttonId) {
  const buttons = [
    "withDriverBtn",
    "withoutDriverBtn",
    "driverOnlyBtn",
    "goodsBtn",
  ];
  buttons.forEach((btn) => {
    const button = document.getElementById(btn);
    if (btn === buttonId) {
      button.classList.remove("bg-white", "text-gray-900");
      button.classList.add("bg-gray-900", "text-white");
    } else {
      button.classList.remove("bg-gray-900", "text-white");
      button.classList.add("bg-white", "text-gray-900");
    }
    button.classList.add("border-2", "border-gray-900");
  });
}

function isDateTimeValid() {
  const pickupLocation = document.getElementById("pickupLocation").value.trim();
  const dropLocation = document.getElementById("dropLocation").value.trim();
  const pickupDate = new Date(document.getElementById("pickupDate").value);
  const pickupTime = document.getElementById("pickupTime").value;
  const returnDate = new Date(document.getElementById("returnDate").value);
  const returnTime = document.getElementById("returnTime").value;

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const pickupDateTime = new Date(pickupDate.getTime());
  pickupDateTime.setHours(...pickupTime.split(":").map(Number));

  const returnDateTime = new Date(returnDate.getTime());
  returnDateTime.setHours(...returnTime.split(":").map(Number));

  if (pickupLocation === dropLocation) {
    alert("Pickup and drop locations cannot be the same");
    return false;
  }

  if (pickupDate < now) {
    alert("Pickup date cannot be in the past");
    return false;
  }

  if (returnDate < pickupDate) {
    alert("Return date cannot be earlier than pickup date");
    return false;
  }

  if (pickupDateTime.getTime() === returnDateTime.getTime()) {
    alert("Pickup and return date/time cannot be exactly the same");
    return false;
  }

  if (
    returnDate.getTime() === pickupDate.getTime() &&
    returnTime <= pickupTime
  ) {
    alert("For same-day bookings, return time must be later than pickup time");
    return false;
  }

  return true;
}

function initAutocomplete() {
  const pickupInput = document.getElementById("pickupLocation");
  const dropInput = document.getElementById("dropLocation");

  [pickupInput, dropInput].forEach((input) => {
    input.addEventListener(
      "input",
      debounce(function () {
        const query = this.value;
        if (query.length > 2) {
          fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              query
            )}&countrycodes=in&limit=5`
          )
            .then((response) => response.json())
            .then((data) => {
              const suggestions = data.map((item) => item.display_name);
              showSuggestions(this, suggestions);
            })
            .catch((error) => {
              console.error("Error:", error);
              showSuggestions(this, []); // Clear suggestions on error
            });
        } else {
          showSuggestions(this, []); // Clear suggestions if input is too short
        }
      }, 300)
    );

    // Close suggestions when clicking outside
    document.addEventListener("click", function (e) {
      if (e.target !== input) {
        showSuggestions(input, []);
      }
    });
  });
}

function showSuggestions(input, suggestions) {
  let suggestionList = input.nextElementSibling;
  if (
    !suggestionList ||
    !suggestionList.classList.contains("suggestion-list")
  ) {
    suggestionList = document.createElement("ul");
    suggestionList.className = "suggestion-list";
    input.parentNode.insertBefore(suggestionList, input.nextSibling);
  }

  suggestionList.innerHTML = "";
  suggestions.forEach((suggestion) => {
    const li = document.createElement("li");
    li.textContent = suggestion;
    li.addEventListener("click", () => {
      input.value = suggestion;
      showSuggestions(input, []); // Clear suggestions after selection
    });
    suggestionList.appendChild(li);
  });

  // Show/hide the suggestion list
  if (suggestions.length > 0) {
    suggestionList.style.display = "block";
  } else {
    suggestionList.style.display = "none";
  }
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

document.addEventListener("DOMContentLoaded", function () {
  const signBtns = document.querySelectorAll(".sign-in-up-btn");
  const signModal = document.getElementById("signModal");
  const modalTitle = document.getElementById("modalTitle");
  const switchAuth = document.getElementById("switchAuth");
  const nameField = document.getElementById("nameField");
  const authForm = document.getElementById("authForm");

  let isSignUp = true;

  signBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      signModal.classList.remove("hidden");
    });
  });

  signModal.addEventListener("click", (e) => {
    if (e.target === signModal) {
      signModal.classList.add("hidden");
    }
  });

  switchAuth.addEventListener("click", (e) => {
    e.preventDefault();
    isSignUp = !isSignUp;
    if (isSignUp) {
      modalTitle.textContent = "Sign Up";
      switchAuth.textContent = "Already have an account? Sign In";
      nameField.style.display = "block";
    } else {
      modalTitle.textContent = "Sign In";
      switchAuth.textContent = "Don't have an account? Sign Up";
      nameField.style.display = "none";
    }
  });

  authForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(isSignUp ? "Sign Up" : "Sign In", "submitted");
    signModal.classList.add("hidden");
  });

  const searchBtn = document.getElementById("searchBtn");
  const hourlyBtn = document.getElementById("hourlyBtn");
  const roundTripBtn = document.getElementById("roundTripBtn");

  let tripType = "hourly";

  hourlyBtn.classList.add("bg-gray-900", "text-white");
  roundTripBtn.classList.add(
    "bg-white",
    "text-gray-900",
    "border-2",
    "border-gray-900"
  );

  hourlyBtn.addEventListener("click", () => {
    tripType = "hourly";
    hourlyBtn.classList.remove(
      "bg-white",
      "text-gray-900",
      "border-2",
      "border-gray-900"
    );
    hourlyBtn.classList.add("bg-gray-900", "text-white");
    roundTripBtn.classList.remove("bg-gray-900", "text-white");
    roundTripBtn.classList.add(
      "bg-white",
      "text-gray-900",
      "border-2",
      "border-gray-900"
    );
  });

  roundTripBtn.addEventListener("click", () => {
    tripType = "roundTrip";
    roundTripBtn.classList.remove(
      "bg-white",
      "text-gray-900",
      "border-2",
      "border-gray-900"
    );
    roundTripBtn.classList.add("bg-gray-900", "text-white");
    hourlyBtn.classList.remove("bg-gray-900", "text-white");
    hourlyBtn.classList.add(
      "bg-white",
      "text-gray-900",
      "border-2",
      "border-gray-900"
    );
  });

  const driverButtons = [
    "withDriverBtn",
    "withoutDriverBtn",
    "driverOnlyBtn",
    "goodsBtn",
  ];
  driverButtons.forEach((btn) => {
    const button = document.getElementById(btn);
    button.classList.add(
      "bg-white",
      "text-gray-900",
      "border-2",
      "border-gray-900"
    );
    button.addEventListener("click", function () {
      handleDriverButtonClick(btn);
    });
  });

  searchBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (areAllFieldsFilled() && isDateTimeValid()) {
      const pickupLocation = document
        .getElementById("pickupLocation")
        .value.trim();
      const dropLocation = document.getElementById("dropLocation").value.trim();
      const pickupDate = document.getElementById("pickupDate").value;
      const pickupTime = document.getElementById("pickupTime").value;
      const returnDate = document.getElementById("returnDate").value;
      const returnTime = document.getElementById("returnTime").value;

      if (pickupLocation === dropLocation) {
        alert("Pickup and drop locations cannot be the same");
        return;
      }

      let driverOption = "";
      if (
        document
          .getElementById("withDriverBtn")
          .classList.contains("bg-gray-900")
      ) {
        driverOption = "withDriver";
      } else if (
        document
          .getElementById("withoutDriverBtn")
          .classList.contains("bg-gray-900")
      ) {
        driverOption = "withoutDriver";
      } else if (
        document
          .getElementById("driverOnlyBtn")
          .classList.contains("bg-gray-900")
      ) {
        driverOption = "driverOnly";
      } else if (
        document.getElementById("goodsBtn").classList.contains("bg-gray-900")
      ) {
        driverOption = "goods";
      }

      localStorage.setItem(
        "searchData",
        JSON.stringify({
          pickupLocation,
          dropLocation,
          pickupDate,
          pickupTime,
          returnDate,
          returnTime,
          tripType: tripType,
          driverOption: driverOption,
        })
      );

      console.log(
        "Stored search data:",
        JSON.parse(localStorage.getItem("searchData"))
      );

      if (driverOption === "driverOnly") {
        window.location.href = "./Acting_Selection/acting_selection.html";
      } else if (
        driverOption === "withDriver" ||
        driverOption === "withoutDriver"
      ) {
        window.location.href = "./Car_Selection/car_selection_page.html";
      } else if (driverOption === "goods") {
        window.location.href = "./Goods_Selection/goods_page.html";
      } else {
        alert("Please select a driver option");
      }
    } else if (!areAllFieldsFilled()) {
      alert("Please fill in all fields");
    }
  });
  console.log("Search script loaded");

  initAutocomplete();
});
