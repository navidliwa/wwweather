$(document).ready(function(){
    // Enables tab functionality for Materialize CSS framework
    $('.tabs').tabs();

    // Get searched city from input field
    var searchedCity = $("#city-search").val();
    // API url for current weather data
    var currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=a09ff729a95cbb2afe677c333b6cde65&&units=imperial`;
    // API url for 5 day forecast
    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&appid=a09ff729a95cbb2afe677c333b6cde65&&units=imperial`;

    $("#searchBtn").on('click', function(event) {
        // Fetch current weather data
        fetch(currentUrl)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data);
                var currentTemp = data.main.temp;
                var currentIcon = data.weather[0].icon;
                var currentHumidity = data.main.humidity;
                var currentWind = data.wind.speed;
                // Add weather data to DOM
                document.getElementById('current-weather').innerHTML = 
                `<div>
                    <h2>${searchedCity}</h2>
                </div>
                <div id="wthr-info">
                    <img src="http://openweathermap.org/img/wn/${currentIcon}@2x.png" class="forecast-icon" alt="current weather icon" />
                    <h3>Temp: ${currentTemp}°F</h3>
                    <h3>Wind: ${currentWind} MPH</h3>
                    <h3>Humidity: ${currentHumidity}%</h3>
                </div>`;
            });
        
        // Fetch 5 day forecast data
        fetch(forecastUrl)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data);
                var forecastData = data.list;
                for(i = 0; i < 40; i += 8) {
                    var temp = data.list[i].main.temp;
                    var wind = data.list[i].wind.speed;
                    var humidity = data.list[i].main.humidity;
                    var icon = data.list[i].weather[0].icon
                    var date = data.list[i].dt_txt

                    for(n = 1; n < 6; n++) {
                        document.getElementById('tab' + n).innerHTML = date
                        document.getElementById('day' + n).innerHTML =
                        `<div>
                            <h2>${searchedCity}</h2>
                        </div>
                        <div id="future-info">
                            <img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="forecast-icon" alt="forecast weather icon" />
                            <h3>Temp: ${temp}°F</h3>
                            <h3>Wind: ${wind} MPH</h3>
                            <h3>Humididty: ${humidity}%</h3>
                        </div>`;
                    }
                }
            });
    })


  });