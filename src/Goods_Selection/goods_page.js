document.addEventListener("DOMContentLoaded", function () {
    // Load and display search data
    const searchData = JSON.parse(localStorage.getItem("searchData"));
    if (searchData) {
      document.getElementById("displayPickupLocation").textContent =
        searchData.pickupLocation || "Not specified";
      document.getElementById("displayDropLocation").textContent =
        searchData.dropLocation || "Not specified";
      document.getElementById("displayDate").textContent =
        searchData.pickupDate || "Not specified";
    }
  
    // Goods form submission
    document.getElementById("goodsForm").addEventListener("submit", function (e) {
        e.preventDefault();
        
        // Collect form data
        const goodsData = {
            type: document.getElementById("goods-type").value,
            weight: document.getElementById("weight").value,
            length: document.getElementById("length").value,
            width: document.getElementById("width").value,
            height: document.getElementById("height").value
        };
        
        // Store goods data in localStorage
        localStorage.setItem("goodsData", JSON.stringify(goodsData));
        
        // Redirect to the confirmation page
        window.location.href = "../Goods_Confirm_Page/goods_confirm_page.html";
    });
  
    // Sign-in/up modal functionality
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
  
    // Add this function to your goods-page.js file
    function setSampleGoodsData() {
      const sampleGoodsData = {
        type: "Electronics",
        weight: "25",
        length: "60",
        width: "40",
        height: "30"
      };

      localStorage.setItem("goodsData", JSON.stringify(sampleGoodsData));
    }

    // Call this function when the page loads or when you want to set sample data
    setSampleGoodsData();
});

  
  // Toggle mobile menu
  function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
  }
  
  // Toggle dropdown
  function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.classList.toggle("hidden");
  }
  
  // Handle selection in dropdown
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
