// Function to toggle dropdown visibility
function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  dropdown.classList.toggle("hidden");
}

// Function to handle selection and navigation
function handleSelection(url) {
  if (url) {
    window.location.href = url;
  }
}

// Close dropdown when clicking outside
window.onclick = function (event) {
  const dropdown = document.getElementById("dropdown-menu");
  if (!event.target.matches(".dropdown-btn")) {
    if (!dropdown.classList.contains("hidden")) {
      dropdown.classList.add("hidden");
    }
  }
};

// Function to toggle mobile menu
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("hidden");
}

// Function to check if all fields are filled
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

// Function to check if either "With Driver" or "Without Driver" is selected
function isDriverOptionSelected() {
  return (
    document.getElementById("withDriverBtn").classList.contains("bg-black") ||
    document.getElementById("withoutDriverBtn").classList.contains("bg-black")
  );
}

// Function to handle driver option button clicks
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
      button.classList.remove("bg-white", "text-black");
      button.classList.add("bg-black", "text-white");
    } else {
      button.classList.remove("bg-black", "text-white");
      button.classList.add("bg-white", "text-black");
    }
    button.classList.add("border-2", "border-black");
  });
}

function initializeAutocomplete() {
  const pickupInput = document.getElementById("pickupLocation");
  const dropInput = document.getElementById("dropLocation");

  [pickupInput, dropInput].forEach((input) => {
    let timeout = null;
    input.addEventListener("input", function () {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const query = this.value;
        if (query.length > 2) {
          fetchSuggestions(query, this);
        } else {
          clearSuggestions(this);
        }
      }, 300);
    });
  });

  function fetchSuggestions(query, inputElement) {
    const apiKey = 'e1667650735c48d09bd823db86badb4d';
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&limit=5&apiKey=${apiKey}`;

    console.log("Fetching suggestions for:", query);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Received data:", data);
        if (data.features && data.features.length > 0) {
          displaySuggestions(data.features, inputElement);
        } else {
          console.warn("No suggestions found or invalid response format");
          displaySuggestions([], inputElement);
        }
      })
      .catch((error) => {
        console.error("Error fetching suggestions:", error);
        displaySuggestions([], inputElement);
      });
  }

  function displaySuggestions(suggestions, inputElement) {
    let suggestionList = inputElement.nextElementSibling;
    if (!suggestionList || !suggestionList.classList.contains("suggestion-list")) {
      suggestionList = document.createElement("ul");
      suggestionList.className = "suggestion-list absolute z-10 bg-white border border-gray-300 w-full mt-1 max-h-60 overflow-y-auto";
      inputElement.parentNode.insertBefore(suggestionList, inputElement.nextSibling);
    }

    console.log("Displaying suggestions:", suggestions);

    suggestionList.innerHTML = "";
    if (suggestions && suggestions.length > 0) {
      suggestions.forEach((suggestion) => {
        const li = document.createElement("li");
        li.textContent = suggestion.properties.formatted;
        li.className = "px-4 py-2 hover:bg-gray-100 cursor-pointer";
        li.addEventListener("click", () => {
          inputElement.value = suggestion.properties.formatted;
          clearSuggestions(inputElement);
        });
        suggestionList.appendChild(li);
      });
    } else {
      const li = document.createElement("li");
      li.textContent = "No suggestions found";
      li.className = "px-4 py-2 text-gray-500";
      suggestionList.appendChild(li);
    }

    // Ensure the suggestion list is visible and positioned correctly
    suggestionList.style.display = "block";
    suggestionList.style.position = "absolute";
    suggestionList.style.zIndex = "1000";
    suggestionList.style.backgroundColor = "white";
    suggestionList.style.border = "1px solid black";
    suggestionList.style.width = inputElement.offsetWidth + "px";
    suggestionList.style.left = inputElement.offsetLeft + "px";
    suggestionList.style.top = inputElement.offsetTop + inputElement.offsetHeight + "px";
  }
  function clearSuggestions(inputElement) {
    const suggestionList = inputElement.nextElementSibling;
    if (
      suggestionList &&
      suggestionList.classList.contains("suggestion-list")
    ) {
      suggestionList.innerHTML = "";
      // Don't hide the list, just clear its contents
      // suggestionList.style.display = "none";
    }
  }

  document.addEventListener("click", function (e) {
    const suggestionLists = document.querySelectorAll(".suggestion-list");
    suggestionLists.forEach((list) => {
      if (
        !list.contains(e.target) &&
        !list.previousElementSibling.contains(e.target)
      ) {
        clearSuggestions(list.previousElementSibling);
      }
    });
  });

  console.log("Autocomplete initialized");
}

// Event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  // Sign in/up modal functionality
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

  // Search functionality
  const searchBtn = document.getElementById("searchBtn");
  const hourlyBtn = document.getElementById("hourlyBtn");
  const roundTripBtn = document.getElementById("roundTripBtn");

  // Set default trip type
  let tripType = "hourly";

  // Initialize button styles
  hourlyBtn.classList.add("bg-black", "text-white");
  roundTripBtn.classList.add(
    "bg-white",
    "text-black",
    "border-2",
    "border-black"
  );

  // Event listeners for trip type buttons
  hourlyBtn.addEventListener("click", () => {
    tripType = "hourly";
    hourlyBtn.classList.remove(
      "bg-white",
      "text-black",
      "border-2",
      "border-black"
    );
    hourlyBtn.classList.add("bg-black", "text-white");
    roundTripBtn.classList.remove("bg-black", "text-white");
    roundTripBtn.classList.add(
      "bg-white",
      "text-black",
      "border-2",
      "border-black"
    );
  });

  roundTripBtn.addEventListener("click", () => {
    tripType = "roundTrip";
    roundTripBtn.classList.remove(
      "bg-white",
      "text-black",
      "border-2",
      "border-black"
    );
    roundTripBtn.classList.add("bg-black", "text-white");
    hourlyBtn.classList.remove("bg-black", "text-white");
    hourlyBtn.classList.add(
      "bg-white",
      "text-black",
      "border-2",
      "border-black"
    );
  });

  // Event listeners for driver option buttons
  const driverButtons = [
    "withDriverBtn",
    "withoutDriverBtn",
    "driverOnlyBtn",
    "goodsBtn",
  ];
  driverButtons.forEach((btn) => {
    const button = document.getElementById(btn);
    // Set initial style with black text
    button.classList.add("bg-white", "text-black", "border-2", "border-black");
    button.addEventListener("click", function () {
      handleDriverButtonClick(btn);
    });
  });

  // Event listener for search button
  searchBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (areAllFieldsFilled()) {
      // Collect form data
      const pickupLocation = document.getElementById("pickupLocation").value;
      const dropLocation = document.getElementById("dropLocation").value;
      const pickupDate = document.getElementById("pickupDate").value;
      const pickupTime = document.getElementById("pickupTime").value;
      const returnDate = document.getElementById("returnDate").value;
      const returnTime = document.getElementById("returnTime").value;

      let driverOption = "";
      if (
        document.getElementById("withDriverBtn").classList.contains("bg-black")
      ) {
        driverOption = "withDriver";
      } else if (
        document
          .getElementById("withoutDriverBtn")
          .classList.contains("bg-black")
      ) {
        driverOption = "withoutDriver";
      } else if (
        document.getElementById("driverOnlyBtn").classList.contains("bg-black")
      ) {
        driverOption = "driverOnly";
      } else if (
        document.getElementById("goodsBtn").classList.contains("bg-black")
      ) {
        driverOption = "goods";
      }

      // Store form data in localStorage
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

      // Log the stored data (for debugging)
      console.log(
        "Stored search data:",
        JSON.parse(localStorage.getItem("searchData"))
      );

      // Check which driver option is selected
      if (driverOption === "driverOnly") {
        window.location.href = "acting-driver.html";
      } else if (
        driverOption === "withDriver" ||
        driverOption === "withoutDriver"
      ) {
        window.location.href = "Selection-Page.html";
      } else if (driverOption === "goods") {
        // For "goods" option, you might want to create a separate page or handle it differently
        alert(
          "Goods transportation option selected. This feature is not implemented yet."
        );
      } else {
        // If no option is selected, show an alert
        alert("Please select a driver option");
      }
    } else {
      alert("Please fill in all fields");
    }
  });

  // Initialize autocomplete for location inputs
  initializeAutocomplete();

  console.log("Search script loaded");
});
