
const ctx = document.getElementById('bookingChart').getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Number of Bookings',
      data: [12, 19, 3, 5, 2, 3, 10],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
      
document.addEventListener("DOMContentLoaded", function () {
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