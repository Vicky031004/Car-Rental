document.addEventListener("DOMContentLoaded", function () {
  fetchBookingRequests();
  fetchUpcomingTrips();
  setupEventListeners();
  debugElementVisibility("bookingRequests");
  debugElementVisibility("upcomingTrips");
});

function fetchBookingRequests() {
  const requests = [
    { id: 1, pickup: "Manhattan, New York", dropoff: "Times Square, New York", date: "2024-03-15", time: "14:00" },
    { id: 2, pickup: "Pondicherry, Tamil Nadu", dropoff: "Sathyabama University, Chennai", date: "2024-03-16", time: "09:30" },
  ];

  const requestsContainer = document.getElementById("bookingRequests");
  if (!requestsContainer) {
    console.error("Booking requests container not found");
    return;
  }
  requestsContainer.innerHTML = ''; // Clear existing content
  requests.forEach((request) => {
    requestsContainer.appendChild(createRequestElement(request));
  });
  console.log("Booking requests loaded:", requests.length);
}

function fetchUpcomingTrips() {
  const trips = [
    { id: 3, pickup: "Central Station", dropoff: "Shopping Mall", date: "2024-03-17", time: "11:00" },
    { id: 4, pickup: "Conference Center", dropoff: "Airport", date: "2024-03-18", time: "16:45" },
  ];

  const tripsContainer = document.getElementById("upcomingTrips");
  tripsContainer.innerHTML = ''; // Clear existing content
  trips.forEach((trip) => {
    tripsContainer.appendChild(createTripElement(trip));
  });
}

function createRequestElement(request) {
  const element = document.createElement("div");
  element.className = "bg-gray-50 p-4 rounded-md relative mb-4";
  element.innerHTML = `
    <div class="absolute top-2 right-2 cursor-pointer" onclick="showMapModal(${request.id})">
      <i class="fas fa-map-marker-alt text-gray-600" title="View on map"></i>
    </div>
    <h3 class="font-semibold">${request.pickup} to ${request.dropoff}</h3>
    <p>${request.date} at ${request.time}</p>
    <button class="mt-2 px-4 py-2 bg-gray-900 text-white rounded-md accept-request" data-id="${request.id}">Accept</button>
  `;
  return element;
}
function showMapModal(requestId) {
  const request = getRequestById(requestId);
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50';
  modal.innerHTML = `
    <div class="relative top-10 mx-auto p-4 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-lg font-medium text-gray-900">Route Details</h3>
        <span class="text-sm text-gray-500">${request.date} at ${request.time}</span>
      </div>
      
      <!-- Two-column layout for smaller screens -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Map column -->
        <div id="map-${requestId}" class="h-64 w-full rounded-lg"></div>
        
        <!-- Info column -->
        <div class="space-y-3">
          <div class="bg-gray-50 p-3 rounded-lg">
            <div class="text-sm">
              <div class="flex items-center mb-2">
                <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <div><strong>From:</strong> ${request.pickup}</div>
              </div>
              <div class="flex items-center">
                <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <div><strong>To:</strong> ${request.dropoff}</div>
              </div>
            </div>
          </div>
          
          <div id="route-info-${requestId}" class="bg-gray-50 p-3 rounded-lg text-sm"></div>
        </div>
      </div>

      <div class="mt-3 flex justify-end">
        <button onclick="closeModal(this)" class="px-4 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800">
          Close
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  initMap(request, `map-${requestId}`, `route-info-${requestId}`);
}

async function initMap(request, mapElementId, routeInfoId) {
  const mapElement = document.getElementById(mapElementId);
  const routeInfoElement = document.getElementById(routeInfoId);
  
  if (!mapElement || !routeInfoElement) return;

  // Show loading state
  routeInfoElement.innerHTML = '<p class="text-gray-600">Loading route information...</p>';

  // Initialize the map
  const map = L.map(mapElement, {
    zoomControl: false  // Remove zoom controls to save space
  });

  // Add the OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  try {
    const [pickupRes, dropoffRes] = await Promise.all([
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(request.pickup)}`),
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(request.dropoff)}`)
    ]);

    const [pickupData, dropoffData] = await Promise.all([
      pickupRes.json(),
      dropoffRes.json()
    ]);

    if (pickupData.length > 0 && dropoffData.length > 0) {
      const pickupCoords = [parseFloat(pickupData[0].lat), parseFloat(pickupData[0].lon)];
      const dropoffCoords = [parseFloat(dropoffData[0].lat), parseFloat(dropoffData[0].lon)];

      // Simple dot markers to save space
      const pickupIcon = L.divIcon({
        html: '<div class="w-3 h-3 bg-green-500 rounded-full border border-white"></div>',
        className: 'custom-div-icon'
      });

      const dropoffIcon = L.divIcon({
        html: '<div class="w-3 h-3 bg-red-500 rounded-full border border-white"></div>',
        className: 'custom-div-icon'
      });

      L.marker(pickupCoords, { icon: pickupIcon }).addTo(map);
      L.marker(dropoffCoords, { icon: dropoffIcon }).addTo(map);

      // Create a simple line between points
      L.polyline([pickupCoords, dropoffCoords], {
        color: '#3B82F6',
        weight: 3,
        opacity: 0.7
      }).addTo(map);

      // Fit map to show route
      const bounds = L.latLngBounds([pickupCoords, dropoffCoords]);
      map.fitBounds(bounds.pad(0.1));

      // Calculate route information
      const distance = turf.distance(
        turf.point([pickupCoords[1], pickupCoords[0]]),
        turf.point([dropoffCoords[1], dropoffCoords[0]]),
        { units: 'kilometers' }
      );

      const estimatedMinutes = Math.round((distance / 40) * 60); // 40 km/h avg speed


      // Compact route information display
      routeInfoElement.innerHTML = `
        <div class="grid grid-cols-2 gap-2 text-center">
          <div>
            <div class="font-semibold">${distance.toFixed(1)} km</div>
            <div class="text-xs text-gray-500">Distance</div>
          </div>
          <div>
            <div class="font-semibold">${estimatedMinutes} min</div>
            <div class="text-xs text-gray-500">Est. Time</div>
          </div>
        </div>
      `;
    } else {
      routeInfoElement.innerHTML = `
        <div class="text-red-600 text-sm">
          Could not locate addresses. Please check locations.
        </div>
      `;
    }
  } catch (error) {
    console.error('Error initializing map:', error);
    routeInfoElement.innerHTML = `
      <div class="text-red-600 text-sm">
        Error loading map. Please try again.
      </div>
    `;
  }
}

function closeModal(button) {
  const modal = button.closest('.fixed');
  if (modal) {
    modal.remove();
  }
}

// Helper function to get request data
function getRequestById(id) {
  const requests = [
    { 
      id: 1, 
      pickup: "Manhattan, New York", 
      dropoff: "Times Square, New York", 
      date: "2024-03-15", 
      time: "14:00" 
    },
    { 
      id: 2, 
      pickup: "Pondicherry, Tamil Nadu", 
      dropoff: "Sathyabama University, Chennai", 
      date: "2024-03-16", 
      time: "09:30" 
    }
  ];
  return requests.find(request => request.id === parseInt(id));
}

function createTripElement(trip) {
  const element = document.createElement("div");
  element.className = "bg-gray-50 p-4 rounded-md mb-4";
  element.innerHTML = `
    <h3 class="font-semibold">${trip.pickup} to ${trip.dropoff}</h3>
    <p>${trip.date} at ${trip.time}</p>
    <button class="mt-2 px-4 py-2 bg-gray-900 text-white rounded-md view-details" data-id="${trip.id}">View Details</button>
  `;
  return element;
}

function setupEventListeners() {
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("accept-request")) {
      const requestId = e.target.getAttribute("data-id");
      acceptRequest(requestId);
    } else if (e.target.classList.contains("view-details")) {
      const tripId = e.target.getAttribute("data-id");
      showTripDetails(tripId);
    }
  });

  const closeTripDetailsModalButton = document.getElementById("closeTripDetailsModal");
  if (closeTripDetailsModalButton) {
    closeTripDetailsModalButton.addEventListener("click", closeTripDetailsModal);
  }
}

function acceptRequest(requestId) {
  console.log(`Accepted request ${requestId}`);
  // Implement API call and UI update here
}

function showTripDetails(tripId) {
  const tripDetails = {
    id: tripId,
    pickup: "Central Station",
    dropoff: "Shopping Mall",
    date: "2024-03-17",
    time: "11:00",
    passengerName: "John Doe",
    passengerPhone: "123-456-7890",
    specialInstructions: "Please wait at the entrance.",
  };

  const modalContent = document.getElementById("tripDetailsContent");
  if (modalContent) {
    modalContent.innerHTML = `
      <p><strong>Pickup:</strong> ${tripDetails.pickup}</p>
      <p><strong>Dropoff:</strong> ${tripDetails.dropoff}</p>
      <p><strong>Date:</strong> ${tripDetails.date}</p>
      <p><strong>Time:</strong> ${tripDetails.time}</p>
      <p><strong>Passenger:</strong> ${tripDetails.passengerName}</p>
      <p><strong>Phone:</strong> ${tripDetails.passengerPhone}</p>
      <p><strong>Instructions:</strong> ${tripDetails.specialInstructions}</p>
    `;

    const tripDetailsModal = document.getElementById("tripDetailsModal");
    if (tripDetailsModal) {
      tripDetailsModal.classList.remove("hidden");
    }
  }
}

function closeTripDetailsModal() {
  const tripDetailsModal = document.getElementById("tripDetailsModal");
  if (tripDetailsModal) {
    tripDetailsModal.classList.add("hidden");
  }
}

function toggleMenu() {
  const menu = document.getElementById("menu");
  if (menu) {
    menu.classList.toggle("hidden");
  }
}

function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  if (dropdown) {
    dropdown.classList.toggle("hidden");
  }
}

window.onclick = function (event) {
  const dropdown = document.getElementById("dropdown-menu");
  if (dropdown && !event.target.matches(".dropdown-btn") && !dropdown.classList.contains("hidden")) {
    dropdown.classList.add("hidden");
  }
};
function debugElementVisibility(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    console.log(`Element ${elementId} is visible:`, !element.classList.contains('hidden'));
  } else {
    console.error(`Element ${elementId} not found`);
  }
}
let bookings = []; // This will store all bookings

function fetchBookings() {
  // Simulating an API call to fetch bookings
  // In a real application, replace this with an actual API call
  bookings = [
    { date: '2023-05-01', price: 50 },
    { date: '2023-05-01', price: 30 },
    { date: '2023-05-02', price: 45 },
    { date: '2023-05-03', price: 60 },
    { date: '2023-05-04', price: 55 },
    { date: '2023-05-05', price: 70 },
    { date: '2023-05-06', price: 80 },
    { date: '2023-05-07', price: 65 },
    // Add more bookings as needed
  ];
}

function calculateEarnings(timeRange) {
  const earnings = {};
  const today = new Date();
  const startDate = new Date(today);

  switch(timeRange) {
    case 'daily':
      startDate.setDate(today.getDate() - 7);
      break;
    case 'weekly':
      startDate.setDate(today.getDate() - 28);
      break;
    case 'monthly':
      startDate.setMonth(today.getMonth() - 3);
      break;
  }

  bookings.forEach(booking => {
    const bookingDate = new Date(booking.date);
    if (bookingDate >= startDate && bookingDate <= today) {
      let key;
      switch(timeRange) {
        case 'daily':
          key = booking.date;
          break;
        case 'weekly':
          const weekStart = new Date(bookingDate);
          weekStart.setDate(bookingDate.getDate() - bookingDate.getDay());
          key = weekStart.toISOString().split('T')[0];
          break;
        case 'monthly':
          key = `${bookingDate.getFullYear()}-${String(bookingDate.getMonth() + 1).padStart(2, '0')}`;
          break;
      }
      earnings[key] = (earnings[key] || 0) + booking.price;
    }
  });

  return earnings;
}

let earningsChart;

function createEarningsChart(timeRange) {
  const ctx = document.getElementById('earningsChart').getContext('2d');
  
  // Sample data
  const sampleData = {
    'daily': {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [50, 30, 45, 60, 55, 70, 65]
    },
    'weekly': {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      data: [300, 350, 280, 400]
    },
    'monthly': {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [1200, 1400, 1300, 1500, 1600, 1450]
    }
  };

  const { labels, data } = sampleData[timeRange];
  
  if (earningsChart) {
    earningsChart.destroy();
  }

  earningsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Earnings ($)',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Earnings ($)'
          }
        },
        x: {
          title: {
            display: true,
            text: timeRange === 'daily' ? 'Day' : (timeRange === 'weekly' ? 'Week' : 'Month')
          }
        }
      },
      plugins: {
        legend: {
          display: false // Hide legend as we only have one dataset
        },
        title: {
          display: true,
          text: `${timeRange.charAt(0).toUpperCase() + timeRange.slice(1)} Earnings`,
          font: {
            size: 16
          }
        }
      }
    }
  });
}
document.addEventListener("DOMContentLoaded", function () {
  fetchBookings();
  fetchBookingRequests();
  fetchUpcomingTrips();
  setupEventListeners();
  debugElementVisibility("bookingRequests");
  debugElementVisibility("upcomingTrips");
  const chartContainer = document.getElementById('earningsChart').parentElement;
  chartContainer.style.height = '300px'; // Adjust this value to change the chart height
  createEarningsChart('daily'); // Initial chart creation

  // Add event listener for time range selector
  document.getElementById('earningsTimeRange').addEventListener('change', function(e) {
    createEarningsChart(e.target.value);
  });
});
// Add this code near the top of your driver-dashboard.js file, after the existing imports and before any other code

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

});