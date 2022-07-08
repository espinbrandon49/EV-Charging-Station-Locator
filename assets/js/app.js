//https://developer.nrel.gov/docs/transportation/alt-fuel-stations-v1/all/
const apikey = '2RWEmIH2pRUJZcqZ1v5HIAPtokWgcKHxrzrK8GK2'
let stationArr = []
const searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('searchBtn')
const bgLocationCard = document.getElementById('bgLocationCard')
var mapApiKey = 'AIzaSyCwOpX2oKnyXKnYiW9qPF3jQ4cmQpmVxyY'
searchBtn.addEventListener('click', (e) => {
  e.preventDefault()
  getApi(searchInput.value)
})
var mapDiv = document.getElementById('mapDiv')

function getApi(location) {
  var requestUrl = `https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?location=${location}&fuel_type_code='ELEC'&radius=5.0&api_key=${apikey}`

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Use the console to examine the response
      console.log(data);

      // TODO: Run functions
      const dArray = data.fuel_stations
      BLCDisplay(dArray[0])
    });
}

// Create the script tag, set the appropriate attributes
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key='+ (mapApiKey) + '&callback=initMap';
script.async = true;

// Attach your callback function to the `window` object
window.initMap = function() {
  // JS API is loaded and available
  console.log('test map')
 mapDiv.innerHTML = initMap() 
 
};

// Append the 'script' element to 'head'
document.head.appendChild(script);

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("mapDiv"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

window.initMap = initMap;

function BLCDisplay(arr) {
  let price;
  arr.ev_pricing == null ? price = 'free': price = arr.ev_pricing 
  bgLocationCard.innerHTML = (
    `<h3>${arr.station_name}</h3>`+
    `<p>${arr.distance.toFixed(2)} MPH</p>`+
    `<p>${arr.street_address}</p>`+
    `<p>${arr.city, arr.state, arr.zip}</p>`+
    `<p>${arr.station_phone}</p>`+
    `<p>${arr.ev_connector_types}</p>`+
    `<p>${price}</p>`
    )
}





//returns ascending distance list
//default loads with last searched

//Search Buttons
//retailer Name
//Zip

//BLC
//h4 - retailer name 
//p - distance
  //p - address
  //p - City, State, Zip
  //p - phone
  //p - ev connector type
  //p - ev_pricing


//Nearby
//div - 5 cards w/
//h4 - retailer name 
//p - distance
  //p - address
  //p - City, State, Zip
  //p - phone
  //p - ev connector type
  //p - ev_pricing


