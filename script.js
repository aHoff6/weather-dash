function render() {
    localStorage.removeItem('cities');

  const apiKey = "321d379de73c76df0aafca3395aff8e7";
  let cityList = JSON.parse(localStorage.getItem("cities")) || [];
  let searchedCity = "";
  
      
      function getApi() {
          let baseUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&appid=${apiKey}`;
          fetch(baseUrl)
          .then(function (response) {
              return response.json();
            })
            .then(function (data) {
        console.log(data);
        $("#display").empty();
        let weatherData = data;
       
           //TODO start here, was working on how to display data to html
    });
}

$("#submitBtn").on("click", function (e) {
    e.preventDefault();
    searchedCity = $("#input").val().trim();
    if (!cityList.includes(searchedCity)) {
        (cityList).push(searchedCity);
    }
    if (cityList.length > 5) {
        cityList.shift();
    }
    
    localStorage.setItem("cities", JSON.stringify(cityList));
    
    
    console.log(cityList);
    getApi();
  });
}
$(document).ready(render);
