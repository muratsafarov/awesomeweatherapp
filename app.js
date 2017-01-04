'use strict';

searchButton.addEventListener('click', searchWeather);

document.getElementById("city")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("button").click();
    }
});

String.prototype.capitalizeFirstLetter = function() {
    var wordsArray = this.split(' ');
    console.log(wordsArray);
    for (var i = 0; i < wordsArray.length; i++) {
      wordsArray[i] = wordsArray[i].charAt(0).toUpperCase() + wordsArray[i].slice(1);
     }
    console.log(wordsArray);
    return wordsArray.toString().replace(',', ' ');
} 

function searchWeather() {
  loadText.style.display = 'block';
  weatherBox.style.display = 'none';
  var cityName = searchCity.value.trim();
  if (cityName.trim().length === 0) {
    alert ('please enter a city name');
  }
  
  var apiKey = '5d55f516c7074f0a9cf22509170401';
  var url = 'https://api.worldweatheronline.com/premium/v1/weather.ashx?key=' + apiKey + '&q=' + cityName + '&format=JSON';
  var http = new XMLHttpRequest();
  
  http.open('GET', url);
  http.onreadystatechange = function() {
    if (http.readyState === http.DONE) {
      var data = JSON.parse(http.responseText);
      var weatherData = new Weather(cityName.capitalizeFirstLetter(), data.data.current_condition[0].weatherDesc[0].value.toUpperCase());
      weatherData.temperature = data.data.current_condition[0].temp_C;
      updateWeather(weatherData);
      loadText.style.display = 'none';
    } 
    setTimeout(function(){
      if (http.readyState !== http.DONE) {
      loadText.textContent = 'ERROR';
    }}, 3000);
    }
  http.send();
}

function updateWeather (weatherData) {
  weatherCity.textContent = weatherData.cityName;
  weatherDescription.textContent = weatherData.description;
  weatherTemperature.textContent = weatherData.temperature;

  weatherBox.style.display = 'block';
}