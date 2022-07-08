//https://developer.nrel.gov/docs/transportation/alt-fuel-stations-v1/all/
const apikey = '2RWEmIH2pRUJZcqZ1v5HIAPtokWgcKHxrzrK8GK2'
let stationArr = []
const searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('searchBtn')
const bgLocationCard = document.getElementById('bgLocationCard')

searchBtn.addEventListener('click', (e) => {
  e.preventDefault()
  getApi(searchInput.value)
})

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
      bgLocationCard.innerHTML = dataDisplay(dArray)
    });
}

/*function dataDisplay(arr) {
  let price;
  let card = ''
  arr.ev_pricing == null ? price = 'free': price = arr.ev_pricing 
  card = (
    `<h3>${arr.station_name}</h3>`+
    `<p>${arr.distance.toFixed(2)} MPH</p>`+
    `<p>${arr.street_address}</p>`+
    `<p>${arr.city}, ${arr.state}, ${arr.zip}</p>`+
    `<p>${arr.station_phone}</p>`+
    `<p>${arr.ev_connector_types}</p>`+
    `<p>${price}</p>`
    )
    return card
}*/

function dataDisplay(arr) {
  let price;
  let card = ''

  //arr.ev_pricing == null ? price = 'free' : price = arr.ev_pricing
  if (arr.ev_pricing == null) {
    price = 'free'
  } else {
    price = arr.ev_pricing
  }


  for (let i = 0; i <= 1; i++) {
    card = (
      `<h3>${arr[i].station_name}</h3>` +
      `<p>${arr[i].distance.toFixed(2)} MPH</p>` +
      `<p>${arr[i].street_address}</p>` +
      `<p>${arr[i].city}, ${arr[i].state}, ${arr[i].zip}</p>` +
      `<p>${arr[i].station_phone}</p>` +
      `<p>${arr[i].ev_connector_types}</p>` +
      `<p>${price[i]}</p>`
    )
  }
  console.log(card)
  return card
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


