document.addEventListener('DOMContentLoaded', function() {
    // Fetch and display booking requests
    fetchBookingRequests();

    // Fetch and display upcoming trips
    fetchUpcomingTrips();

    // Set up event listeners
    setupEventListeners();
});

function fetchBookingRequests() {
    // Simulated data - replace with actual API call
    const requests = [
        { id: 1, pickup: 'Airport', dropoff: 'City Center', date: '2024-03-15', time: '14:00' },
        { id: 2, pickup: 'Hotel Grand', dropoff: 'Beach Resort', date: '2024-03-16', time: '09:30' },
    ];

    const requestsContainer = document.getElementById('bookingRequests');
    requests.forEach(request => {
        const requestElement = createRequestElement(request);
        requestsContainer.appendChild(requestElement);
    });
}

function fetchUpcomingTrips() {
    // Simulated data - replace with actual API call
    const trips = [
        { id: 3, pickup: 'Central Station', dropoff: 'Shopping Mall', date: '2024-03-17', time: '11:00' },
        { id: 4, pickup: 'Conference Center', dropoff: 'Airport', date: '2024-03-18', time: '16:45' },
    ];

    const tripsContainer = document.getElementById('upcomingTrips');
    trips.forEach(trip => {
        const tripElement = createTripElement(trip);
        tripsContainer.appendChild(tripElement);
    });
}

function createRequestElement(request) {
    const element = document.createElement('div');
    element.className = 'bg-gray-50 p-4 rounded-md';
    element.innerHTML = `
        <h3 class="font-semibold">${request.pickup} to ${request.dropoff}</h3>
        <p>${request.date} at ${request.time}</p>
        <button class="mt-2 px-4 py-2 bg-gray-900 text-white rounded-md accept-request" data-id="${request.id}">Accept</button>
    `;
    return element;
}

function createTripElement(trip) {
    const element = document.createElement('div');
    element.className = 'bg-gray-50 p-4 rounded-md';
    element.innerHTML = `
        <h3 class="font-semibold">${trip.pickup} to ${trip.dropoff}</h3>
        <p>${trip.date} at ${trip.time}</p>
        <button class="mt-2 px-4 py-2 bg-gray-900 text-white rounded-md view-details" data-id="${trip.id}">View Details</button>
    `;
    return element;
}

function setupEventListeners() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('accept-request')) {
            const requestId = e.target.getAttribute('data-id');
            acceptRequest(requestId);
        } else if (e.target.classList.contains('view-details')) {
            const tripId = e.target.getAttribute('data-id');
            showTripDetails(tripId);
        }
    });

    document.getElementById('closeTripDetailsModal').addEventListener('click', closeTripDetailsModal);
}

function acceptRequest(requestId) {
    // Implement request acceptance logic
    console.log(`Accepted request ${requestId}`);
    // You would typically make an API call here and then update the UI
}

function showTripDetails(tripId) {
    // Fetch trip details - replace with actual API call
    const tripDetails = {
        id: tripId,
        pickup: 'Central Station',
        dropoff: 'Shopping Mall',
        date: '2024-03-17',
        time: '11:00',
        passengerName: 'John Doe',
        passengerPhone: '+1234567890',
        specialInstructions: 'Please wait at the north entrance.'
    };

    const modalContent = document.getElementById('tripDetailsContent');
    modalContent.innerHTML = `
        <p><strong>Pickup:</strong> ${tripDetails.pickup}</p>
        <p><strong>Dropoff:</strong> ${tripDetails.dropoff}</p>
        <p><strong>Date:</strong> ${tripDetails.date}</p>
        <p><strong>Time:</strong> ${tripDetails.time}</p>
        <p><strong>Passenger:</strong> ${tripDetails.passengerName}</p>
        <p><strong>Phone:</strong> ${tripDetails.passengerPhone}</p>
        <p><strong>Instructions:</strong> ${tripDetails.specialInstructions}</p>
    `;

    document.getElementById('tripDetailsModal').classList.remove('hidden');
}

function closeTripDetailsModal() {
    document.getElementById('tripDetailsModal').classList.add('hidden');
}