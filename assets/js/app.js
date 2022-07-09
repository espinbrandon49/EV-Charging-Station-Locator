//https://developer.nrel.gov/docs/transportation/alt-fuel-stations-v1/all/
const apikey = '2RWEmIH2pRUJZcqZ1v5HIAPtokWgcKHxrzrK8GK2'
let stationArr = JSON.parse(localStorage.getItem('station')) || [] 
const searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('searchBtn')
const bgLocationCard = document.getElementById('bgLocationCard')
const fiveCards = document.getElementById('fiveCards')
const cardBtns = document.getElementsByClassName('cardBtns')
const savedLocations = document.getElementById('savedLocations')

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
      bgLocationCard.innerHTML = dataDisplay1(dArray, 1)
      dataDisplay5(dArray, 5)
    });

}

// Attach your callback function to the `window` object
let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("mapDiv"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });
}
window.initMap = initMap;
// Attach your callback function to the `window` object


function dataDisplay5(arr, length) {
  const card = document.createElement('div')
  fiveCards.innerHTML = "";
  for (let i = 0; i< length; i++) {
    card.classList.add('card')
    const cardBtn = document.createElement('button')
    card.classList.add('cardBtns')
    cardBtn.textContent = arr[i].station_name

    cardBtn.addEventListener('click', ()=> {
      let cardContent = cardBtn.textContent
      if(!stationArr.includes(cardContent)){
        stationArr.push(cardContent)
        let stations = JSON.stringify(stationArr)
        localStorage.setItem('station', stations)
displaySearches()

      }
    })
    card.appendChild(cardBtn)
  }
  fiveCards.appendChild(card)
}

function dataDisplay1(arr, length, price) {
  let card = ''
  for (let i = 0; i < `${length}`; i++) {
    arr[i].ev_pricing == null ? price = 'free' : price = arr[i].ev_pricing
    card += (
      `<div class='card'>
      <h4 onclick="test()" id="card${i}" class='cardBtns'>${arr[i].station_name}</h4>
      <p>${arr[i].distance.toFixed(2)} MPH</p> 
      <p>${arr[i].street_address}</p> 
      <p>${arr[i].city}, ${arr[i].state}, ${arr[i].zip}</p> 
      <p>${arr[i].station_phone}</p> 
      <p>${arr[i].ev_connector_types}</p> 
      <p>${price}</p> 
      <div>`
    )
  }
  return card

}

function displaySearches () {
  let searches = JSON.parse(localStorage.getItem('station'))
  savedLocations.innerHTML=''
  for (let i=0; i< searches.length; i++) {
      let searchItem = document.createElement('button')
      searchItem.textContent = searches[i]
      searchItem.setAttribute('class', 'searchItem')
      savedLocations.appendChild(searchItem)
    }
}
displaySearches()

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





//David's javascript

document.getElementById("startBtn").addEventListener("click", function() {
    document.getElementById("main").classList.remove("hidden")
    document.getElementById("startBtn").classList.add("hidden")
    document.getElementById("the").classList.add("hidden")
    document.getElementById("find").classList.add("hidden")

});
//David's javascript