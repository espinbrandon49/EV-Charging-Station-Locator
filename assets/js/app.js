//https://developer.nrel.gov/docs/transportation/alt-fuel-stations-v1/all/
const apikey = '2RWEmIH2pRUJZcqZ1v5HIAPtokWgcKHxrzrK8GK2'

  function getApi() {
    //var requestUrl = `http://api/alt-fuel-stations/${apikey}`
  //var requestUrl = `http://api/alt-fuel-stations/v1.json?api_key=${apikey}`
    
  var requestUrl = `https://developer.nrel.gov/api/alt-fuel-stations/v1.json?limit=100&fuel_type=HY&api_key=2RWEmIH2pRUJZcqZ1v5HIAPtokWgcKHxrzrK8GK2`

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
 //MAP
 //PRICES
 //NAME and address
