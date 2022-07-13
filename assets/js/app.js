const apikey = '2RWEmIH2pRUJZcqZ1v5HIAPtokWgcKHxrzrK8GK2'
var geocodeKey = `M2IxMmQ0MGJmMzBlNDk0ZWFjNmMxYjY5NDg4NThkZDY6MmE5YmM2ZGUtMTc4My00OTFlLWFmMmQtNWUxZTMzZDNiM2Rm`

// saved searches array
let stationArr = JSON.parse(localStorage.getItem('station')) || []

// html definitions
const searchInput = document.getElementById('searchInput')
const bgLocationCard = document.getElementById('bgLocationCard')
const fiveCards = document.getElementById('fiveCards')
const cardBtns = document.getElementsByClassName('cardBtns')
const savedLocations = document.getElementById('savedLocations')
const mapDiv = document.getElementById('mapDiv')
let map;

// Click search_Button to find an electric vehichle charging station
const searchBtn = document.getElementById('searchBtn')
searchBtn.addEventListener('click', (e) => {
  e.preventDefault()
  getApi(searchInput.value)
  getApiByGeocode(searchInput.value)
  searchInput.value = ''
})

//1. Retrieve and display station location and retailer information from search bar
function getApi(location) {

  //https://developer.nrel.gov/docs/transportation/alt-fuel-stations-v1/nearest/

  var requestUrl = `https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?location=${location}&fuel_type_code='ELEC'&radius=5.0&api_key=${apikey}`

  fetch(requestUrl)
    .then(function (response) {
      if (!response.ok) {
        searchInput.value = `invalid city or zipcode`
        searchInput.setAttribute('style', 'color: red;')
        setTimeout(
          function clearSearch() {
            searchInput.value = ''
          }, 1000)
      }
      return response.json();
    })
    .then(function (data) {
      // Use the console to examine the response
      console.log(data);

      // TODO: Run functions

      // display station info for map view
      dataDisplay1(data.fuel_stations[0])
      // display nearby locations
      dataDisplay5(data.fuel_stations, 10)
    });
}

//2. Retrieve and display station location and retailer information with card buttons
function getApiByID(location) {
  //https://developer.nrel.gov/docs/transportation/alt-fuel-stations-v1/get/

  var requestUrl = ` https://developer.nrel.gov/api/alt-fuel-stations/v1/${location}.json?api_key=${apikey}`

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Use the console to examine the response
      console.log(data);

      // TODO: Run functions
      // display station info for map view
      dataDisplay1(data.alt_fuel_station)
      // display map
      latLon(data.alt_fuel_station.latitude, data.alt_fuel_station.longitude)
    });
}

//3. Retrieve and display station location and retailer information with saved search buttons
function getApiByZip(location) {

  //https://developer.nrel.gov/docs/transportation/alt-fuel-stations-v1/nearest/

  var requestUrl = `https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?location=${location}&fuel_type_code='ELEC'&radius=5.0&api_key=${apikey}`

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Use the console to examine the response
      console.log(data);

      // TODO: Run functions
      dataDisplay5(data.fuel_stations, 10)
      latLon(data.fuel_stations[1].latitude, data.fuel_stations[1].longitude)
    });
}

//4. Retrieve and display reverse geocode for map and marker
function getApiByGeocode(location) {

  // https://developer.myptv.com/Documentation/Geocoding%20API/QuickStart.htm

  var requestUrl = `https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${location}&apiKey=${geocodeKey}`
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Use the console to examine the response
      console.log(data);

      // TODO: Run functions
      latLon(data.locations[1].referencePosition.latitude, data.locations[1].referencePosition.longitude)
    });
}

// Load default map of Berkeley, California
map = L.map('mapDiv').setView([37.871, -122.259], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

// Create display for map of EV stations in the given (search parameter) region
function latLon(lat, lon) {
  if (map != undefined) { map.remove(); }
  map = L.map('mapDiv').setView([lat, lon], 15);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);
  var marker = L.marker([lat, lon]).addTo(map)
}

// Create display for station-info on map_Section
function dataDisplay1(arr, price) {
  bgLocationCard.innerHTML = ''
  const BLC = document.createElement('div')
  arr.ev_pricing == null ? price = 'free' : price = arr.ev_pricing
  BLC.innerHTML = `
      <h4 class='cardBtns'>${arr.station_name}</h4>
      <p>${arr.street_address}</p> 
      <p>${arr.city}, ${arr.state}, ${arr.zip}</p> 
      <p>${arr.station_phone}</p> 
      <p>🔌 ${arr.ev_connector_types}</p> 
      <p>${price}</p> 
      `
  bgLocationCard.appendChild(BLC)
  saveStation([arr.station_name, arr.id, arr.zip])//CHANGED
}

// Create display for station-info in nearby_Locations_section
function dataDisplay5(arr, length) {
  const card = document.createElement('div')
  fiveCards.innerHTML = "";

  for (let i = 1; i < length; i++) {
    arr[i].ev_pricing == null ? price = 'free' : price = arr[i].ev_pricing
    // create text
    const stationInfo = document.createElement('aside')
    stationInfo.setAttribute('class', 'card')
    stationInfo.innerHTML = `
    <p>🚘 ${arr[i].distance.toFixed(2)} mi.</p>
    <p>${arr[i].street_address}</p> 
    <p>${arr[i].city}, ${arr[i].state}, ${arr[i].zip}</p> 
    <p>${arr[i].station_phone}</p> 
    <p>🔌 ${arr[i].ev_connector_types}</p> 
    <p>${price}</p> 
    `
    card.appendChild(stationInfo)

    //create button
    const cardBtn = document.createElement('a')
    cardBtn.setAttribute('href', '#bgLocationCard')
    cardBtn.classList.add('cardBtns')
    cardBtn.textContent = arr[i].station_name
    cardBtn.setAttribute('value', `${arr[i].id}`)
    cardBtn.setAttribute('datazip', `${arr[i].zip}`)
    stationInfo.prepend(cardBtn)

    cardBtn.addEventListener('click', (event) => {
      let value = cardBtn.getAttribute('value') 
      getApiByID(value)
      console.log(cardBtn)
      saveStation([cardBtn.textContent, value, cardBtn.getAttribute('datazip')])
    })
  }
  fiveCards.appendChild(card)
}

//Create display for saved searches as buttons
function displaySearches() {
  if (!localStorage.station) { return }
  let searches = JSON.parse(localStorage.getItem('station'))

  //create location button
  savedLocations.innerHTML = ''
  for (let i = 0; i < searches.length; i++) {
    let buttonDiv = document.createElement('div')
    buttonDiv.setAttribute('class', 'buttonDiv')
    const searchItem = document.createElement('button')
    searchItem.textContent = searches[i][0]
    searchItem.setAttribute('class', 'searchItem')
    buttonDiv.appendChild(searchItem)
    searchItem.addEventListener('click', () => {
      bgLocationCard.scrollIntoView()
      getApiByID(searches[i][1])
      getApiByZip(searches[i][2])
    })

    //create delete button
    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'X'
    deleteBtn.setAttribute('class', 'deleteBtn')
    deleteBtn.id = i
    buttonDiv.appendChild(deleteBtn)
    deleteBtn.addEventListener('click', (event) => {
      let btnId = event.target.id
      //let btnContent = event.target.previousElementSibling.innerHTML
      deleteSearch(stationArr, btnId)
      //deleteSearch(stationArr, btnContent)
    })
    savedLocations.appendChild(buttonDiv)
  }
} displaySearches();

// Delete items from search history
function deleteSearch(arr, content) {
  arr.splice(content,1)
  // for (let i = 0; i < arr.length; i++) {
  //   let el = arr[i][0]
  //   console.log(el)
  //   if(el == content){
  //     arr.splice(i,1)
  //   }
  // }
  let stations = JSON.stringify(arr)
  localStorage.setItem('station', stations)
  displaySearches()
}

// Save searches in local storage
function saveStation(content) {
  let newArr = []
  stationArr.forEach(element => newArr.push(element[0]))
  if (!newArr.includes(content[0])) {
    stationArr.push(content)
    let stations = JSON.stringify(stationArr)
    localStorage.setItem('station', stations)
    displaySearches()
  }
}
