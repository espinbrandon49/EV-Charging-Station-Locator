//https://developer.nrel.gov/docs/transportation/alt-fuel-stations-v1/all/
const apikey = '2RWEmIH2pRUJZcqZ1v5HIAPtokWgcKHxrzrK8GK2'

  function getApi(zipcode) {
  var zipcode = 90710  
  var requestUrl = `https://developer.nrel.gov/api/alt-fuel-stations/v1.json?limit=5&fuel_type=ELEC&zip=${zipcode}&api_key=${apikey}`

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Use the console to examine the response
        console.log(data);
        
        console.log(data.fuel_stations[0].city)
        // TODO: Loop through the data and generate your HTML
      });
  }

getApi();

//h2 - city name, state, zipcode
//div - 5 cards w/
  //p - retailer name
  //p - address
  //p - ev network
  //p - ev connector type
  //p - payment types selected

//input zipcode parameter for 5 numbers only