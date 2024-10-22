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

    if (areAllFieldsFilled()) {
      const pickupLocation = document.getElementById("pickupLocation").value;
      const dropLocation = document.getElementById("dropLocation").value;
      const pickupDate = document.getElementById("pickupDate").value;
      const pickupTime = document.getElementById("pickupTime").value;
      const returnDate = document.getElementById("returnDate").value;
      const returnTime = document.getElementById("returnTime").value;

      let driverOption = "";
      if (document.getElementById("withDriverBtn").classList.contains("bg-gray-900")) {
        driverOption = "withDriver";
      } else if (document.getElementById("withoutDriverBtn").classList.contains("bg-gray-900")) {
        driverOption = "withoutDriver";
      } else if (document.getElementById("driverOnlyBtn").classList.contains("bg-gray-900")) {
        driverOption = "driverOnly";
      } else if (document.getElementById("goodsBtn").classList.contains("bg-gray-900")) {
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
        window.location.href = "acting-driver.html";
      } else if (driverOption === "withDriver" || driverOption === "withoutDriver") {
        window.location.href = "Selection-Page.html";
      } else if (driverOption === "goods") {
        window.location.href = "goods-page.html";
      } else {
        alert("Please select a driver option");
      }
    } else {
      alert("Please fill in all fields");
    }
  });
  console.log("Search script loaded");
});
