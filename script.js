function render() {
  localStorage.removeItem("cities");

  const todaysDate = moment().format("MMM Do YYYY");
  const apiKey = "321d379de73c76df0aafca3395aff8e7";
  let cityList = JSON.parse(localStorage.getItem("cities")) || [];
  let searchedCity = "";
  console.log(searchedCity);

  function getApi() {
    let baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=imperial`;
    fetch(baseUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        $("#display").empty();
        let weatherData = data;

        let container = $("#display");

        let containerEl = $("<div>").appendTo(container);

        let containerDisplay = $("displayel")
        .appendTo(containerEl);

        let dayOf = $("<h4>")
          .text(todaysDate)
          .appendTo(containerEl);

        let expCity = $("<p>")
          .text("Weather for: " + searchedCity)
          .appendTo(containerEl);

        let degree = $("<p>")
          .text(Math.round(weatherData.main.temp) + "˚F")
          .appendTo(containerEl);

        let humid = $("<p>")
          .text("Humidity: " + weatherData.main.humidity + "%")
          .appendTo(containerEl);

        let wind = $("<p>")
          .text("Wind Speed: " + Math.round(weatherData.wind.speed) + " mph")
          .appendTo(containerEl);

        let icon = $("<img>")
          .addClass("rounded mx-auto d-block")
          .attr(
            "src",
            "http://openweathermap.org/img/wn/" +
              weatherData.weather[0].icon +
              "@2x.png"
          )
          .appendTo(containerEl);

        let iconMain = $("<p>")
          .text(weatherData.weather[0].main)
    
          .appendTo(containerEl);

        $("#displayel").append(container);
      });
  }

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
  });
}
$(document).ready(render);
