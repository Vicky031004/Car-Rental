// Function to toggle dropdowns
function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.classList.toggle("hidden");
}

// Function to handle selection
function handleSelection(url) {
    if (url) {
        window.location.href = url;
    }
}

// Toggle menu function for mobile
function toggleMenu() {
    const menu = document.getElementById("menu");
    if (menu) {
        menu.classList.toggle("hidden");
    } else {
        console.error("Menu element not found");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Add event listener for menu toggle button
    const menuToggle = document.getElementById("menuToggle");
    if (menuToggle) {
        menuToggle.addEventListener("click", toggleMenu);
    } else {
        console.error("Menu toggle button not found");
    }

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

    // Close dropdowns when clicking outside
    window.onclick = function(event) {
        if (!event.target.matches('.dropdown-btn')) {
            const dropdowns = document.getElementsByClassName("absolute");
            for (let i = 0; i < dropdowns.length; i++) {
                const openDropdown = dropdowns[i];
                if (!openDropdown.classList.contains('hidden')) {
                    openDropdown.classList.add('hidden');
                }
            }
        }
    };
});

// Ensure toggleMenu is available in the global scope
window.toggleMenu = toggleMenu;