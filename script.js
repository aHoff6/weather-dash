function render() {
  localStorage.removeItem("cities");

  const todaysDate = moment().format("MMM Do YYYY");
  const apiKey = "321d379de73c76df0aafca3395aff8e7";
  let cityList = JSON.parse(localStorage.getItem("cities")) || [];
  let searchedCity = "";
  console.log(searchedCity);

  function getBackgroundImage(weatherCondition) {
    
    const conditionToImage = {
      "Clear": "clear1.png",
      "Clouds": "clouds2.png",
      "Rain": "rain2.png",
      "Snow": "",
      "Thunderstorm": "thunderstorm1.png"
    };

    // Default image
    const defaultImage = "default-image.jpg";

    // Check if the condition exists in the mapping, if not, use the default image
    return conditionToImage[weatherCondition] || defaultImage;
  }

  function setWeatherBackground(weatherCondition) {
    // Get the background image file name based on the weather condition
    const backgroundImage = getBackgroundImage(weatherCondition);

    // Set the background image in the CSS
    $('#backgroundimage').css('background-image', `url('./pics/${backgroundImage}')`);
  }

  function getApi() {
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=imperial`;
  
    fetch(baseUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Check if the response has valid data
        if (data && data.weather && data.weather[0] && data.weather[0].main) {
          const weatherCondition = data.weather[0].main;
  
          // Set the background image based on the weather condition
          setWeatherBackground(weatherCondition);
        }
  
        $("#display").empty();
        let weatherData = data;
        let container = $("#display");
        let containerEl = $("<div>").appendTo(container);
  
        console.log(weatherData.weather[0].main);
  
        $("displayel").appendTo(containerEl);
        $("<h4>").text(todaysDate).appendTo(containerEl);
        $("<p>")
          .text("Weather for: " + searchedCity)
          .appendTo(containerEl);
        $("<p>")
          .text(Math.round(weatherData.main.temp) + "˚F")
          .appendTo(containerEl);
        $("<p>")
          .text("Humidity: " + weatherData.main.humidity + "%")
          .appendTo(containerEl);
        $("<p>")
          .text("Wind Speed: " + Math.round(weatherData.wind.speed) + " mph")
          .appendTo(containerEl);
        $("<img>")
          .addClass("rounded mx-auto d-block")
          .attr(
            "src",
            "http://openweathermap.org/img/wn/" +
              weatherData.weather[0].icon +
              "@2x.png"
          )
          .appendTo(containerEl);
        $("<p>").text(weatherData.weather[0].main).appendTo(containerEl);
        $("#displayel").append(container);
      })
      .catch(function (error) {
        console.error("Error fetching weather data:", error);
      });
  }
  

  function fiveDayForecast() {
    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&appid=${apiKey}&units=imperial`;

    fetch(urlForecast)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        $("#displayFiveDayEl").empty();
        let daysArray = data.list.filter(function (day, index) {
            console.log(index);
            // getting the data.list array and dividing it by 8 to get each of the 5 days to display
            return index % 8 === 0;
        });
        console.log(daysArray);
        daysArray.forEach(function (day) {
          //   console.log(day);
          let fiveDivCard = $("<div>").addClass("col-sm-2 fiveCard");
          $("<h4>").text(day.dt_txt.slice(0, 10)).appendTo(fiveDivCard);
          $("<p>")
            .text(Math.round(day.main.temp) + "˚F")
            .appendTo(fiveDivCard);
          $("<p>")
            .text("Humidity: " + day.main.humidity + "%")
            .appendTo(fiveDivCard);
          $("<p>").text("wind Speed: " + Math.round(day.wind.speed) + " mph");
          $("<img>")
            .attr(
              "src",
              "http://openweathermap.org/img/wn/" +
                day.weather[0].icon +
                "@2x.png"
            )
            .appendTo(fiveDivCard);
          $(fiveDivCard).appendTo("#displayFiveDayEl");
         
        });
      });
  }

  
function searchHistory() {
    $("#searchHistory").empty();
    cityList.forEach(function(city) {
    let displayHis = $("<div class='searchHis'>")
    .attr("data", city)
    .text(city);
    $("#searchHistory").append(displayHis);
 
    });
    }

    function loadDefaultWeather() {
      const defaultCity = "Jersey City"; 
  
      searchedCity = defaultCity;
      getApi();
      fiveDayForecast();
    }
  
    // Load default weather data
    $(document).ready(function () {
      loadDefaultWeather();
      searchHistory();
    });
  
  
  $(document).on("click", ".searchHis", function() {
    let = searchedCity = $(this).text();
    $(this).click(getApi);
    getApi();
    fiveDayForecast();
});

  $("#submitBtn").on("click", function (e) {
      e.preventDefault();
      searchedCity = $("#input").val().trim();
      if (!cityList.includes(searchedCity)) {
          cityList.push(searchedCity);
        }
        if (cityList.length > 5) {
            cityList.shift();
        }
        
        localStorage.setItem("cities", JSON.stringify(cityList));
        
        console.log(cityList);
        getApi();
        fiveDayForecast();
        searchHistory();
        
    });
}
$(document).ready(render);
