document.addEventListener("DOMContentLoaded", function () {
  // Retrieve search data from localStorage
  const searchData = JSON.parse(localStorage.getItem("searchData"));

  // Display search data on the page
  if (searchData) {
    const searchSummary = document.createElement("div");
    searchSummary.classList.add(
      "bg-white",
      "p-4",
      "rounded-lg",
      "shadow-md",
      "mb-6"
    );
    searchSummary.innerHTML = `
        <h2 class="font-semibold text-xl mb-2">Your Search</h2>
        <p><strong>Trip Type:</strong> ${searchData.tripType}</p>
        <p><strong>Pickup:</strong> ${searchData.pickupLocation}</p>
        <p><strong>Drop-off:</strong> ${searchData.dropLocation}</p>
        <p><strong>Date:</strong> ${searchData.pickupDate}</p>
        <p><strong>Time:</strong> ${searchData.pickupTime}</p>
      `;
    document
      .querySelector(".container")
      .insertBefore(
        searchSummary,
        document.querySelector(".container").firstChild
      );
  }

  // Log the retrieved data (for debugging)
  console.log("Retrieved search data:", searchData);

  // Add event listeners to all "Select" buttons
  const selectButtons = document.querySelectorAll(".bg-black");
  selectButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const carCard = this.closest(".bg-white");
      const carName = carCard.querySelector("h2").textContent;
      const carPrice = carCard.querySelector(".text-2xl").textContent;

      // Store selected car data
      localStorage.setItem(
        "selectedCar",
        JSON.stringify({
          name: carName,
          price: carPrice,
        })
      );

      // Redirect to a booking confirmation page (you'll need to create this)
      window.location.href = "booking-confirmation.html";
    });
  });

  // Add event listener to "Back to Search" button
  const backButton = document.querySelector("button:not(.bg-black)");
  backButton.addEventListener("click", function () {
    window.location.href = "index.html";
  });
});
const backButton = document.querySelector("#backToSearchBtn");
backButton.addEventListener("click", function () {
  window.location.href = "index.html";
});
document.getElementById("sign-btn-pop").addEventListener("click", function () {
  document.getElementById("signModal").classList.remove("hidden");
});
