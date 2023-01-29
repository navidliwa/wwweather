var searchHistory = [];

$(document).ready(function () {

    searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
    if (searchHistory === null) {
        searchHistory = []
    }

    var searchedCity;

    // Get searched city from input field
    function getSearchedCity() {
        return $("#city-search").val();
    }

    // Fill out page with searched city weather data once search button is clicked
    $('#searchBtn').on('click', function (event) {
        searchedCity = getSearchedCity();

        // Push searched city to searchHistory array
        searchHistory.push(searchedCity);
        // Save search history array to local storage
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        console.log(searchHistory);

        // Render search history to page
        var searchedCityDiv = document.getElementById('searched-city');
        var lastSearch = searchHistory[searchHistory.length - 1];
        var div = document.createElement('div');
        div.setAttribute("id", "city-container");
        div.innerHTML =
        `
        <div class="btn-container">
            <a class="waves-effect waves-light btn-large transparent" id="city">
                <h5>${lastSearch}</h5>
            </a>
        </div>
        `;
        searchedCityDiv.prepend(div);

        $('#city').on('click', function(event) {
            var clickedCity = event.target.innerHTML;
            // API url for current weather data
            var url = `https://api.openweathermap.org/data/2.5/weather?q=${clickedCity}&appid=a09ff729a95cbb2afe677c333b6cde65&units=imperial`;
            // API url for 5 day forecast
            var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${clickedCity}&appid=a09ff729a95cbb2afe677c333b6cde65&units=imperial`;

            clickedCityCurrent();
            clickedCityForecast();

            function clickedCityCurrent() {
                fetch(url)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        var currentTemp = data.main.temp;
                        var currentIcon = data.weather[0].icon;
                        var currentHumidity = data.main.humidity;
                        var currentWind = data.wind.speed;
                        // Add weather data to current-weather div
                        document.getElementById('current-weather').innerHTML =
                            `<div>
                            <h2>${clickedCity}</h2>
                        </div>
                        <div id="wthr-info">
                            <img src="http://openweathermap.org/img/wn/${currentIcon}@2x.png" class="forecast-icon" alt="current weather icon" />
                            <h3>Temp: ${currentTemp}°F</h3>
                            <h3>Wind: ${currentWind} MPH</h3>
                            <h3>Humidity: ${currentHumidity}%</h3>
                        </div>`;
                    });
            }

            function clickedCityForecast() {
                fetch(forecastUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    // var forecastData = data.list;
                    for (i = 0; i < 40; i += 8) {
                        var temp = data.list[i].main.temp;
                        var wind = data.list[i].wind.speed;
                        var humidity = data.list[i].main.humidity;
                        var icon = data.list[i].weather[0].icon
                        var date = data.list[i].dt_txt
                        console.log("------------", date);
                        // Add forecast data to tab and day elements
                        if (i === 0) {
                            document.getElementById('tab1').innerHTML = date
                            document.getElementById('day1').innerHTML =
                                `<div>
                                <h2>${clickedCity}</h2>
                            </div>
                            <div id="future-info">
                                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="forecast-icon" alt="forecast weather icon" />
                                <h3>Temp: ${temp}°F</h3>
                                <h3>Wind: ${wind} MPH</h3>
                                <h3>Humidity: ${humidity}%</h3>
                            </div>`;
                        }
                        if (i === 8) {
                            document.getElementById('tab2').innerHTML = date
                            document.getElementById('day2').innerHTML =
                                `<div>
                                <h2>${clickedCity}</h2>
                            </div>
                            <div id="future-info">
                                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="forecast-icon" alt="forecast weather icon" />
                                <h3>Temp: ${temp}°F</h3>
                                <h3>Wind: ${wind} MPH</h3>
                                <h3>Humidity: ${humidity}%</h3>
                            </div>`;
                        }
                        if (i === 16) {
                            document.getElementById('tab3').innerHTML = date
                            document.getElementById('day3').innerHTML =
                                `<div>
                                <h2>${clickedCity}</h2>
                            </div>
                            <div id="future-info">
                                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="forecast-icon" alt="forecast weather icon" />
                                <h3>Temp: ${temp}°F</h3>
                                <h3>Wind: ${wind} MPH</h3>
                                <h3>Humidity: ${humidity}%</h3>
                            </div>`;
                        }
                        if (i === 24) {
                            document.getElementById('tab4').innerHTML = date
                            document.getElementById('day4').innerHTML =
                                `<div>
                                <h2>${clickedCity}</h2>
                            </div>
                            <div id="future-info">
                                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="forecast-icon" alt="forecast weather icon" />
                                <h3>Temp: ${temp}°F</h3>
                                <h3>Wind: ${wind} MPH</h3>
                                <h3>Humidity: ${humidity}%</h3>
                            </div>`;
                        }
                        if (i === 32) {
                            document.getElementById('tab5').innerHTML = date
                            document.getElementById('day5').innerHTML =
                                `<div>
                                <h2>${clickedCity}</h2>
                            </div>
                            <div id="future-info">
                                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="forecast-icon" alt="forecast weather icon" />
                                <h3>Temp: ${temp}°F</h3>
                                <h3>Wind: ${wind} MPH</h3>
                                <h3>Humidity: ${humidity}%</h3>
                            </div>`;
                        }
                    }
                });
            }

        });

        // API url for current weather data
        var currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=a09ff729a95cbb2afe677c333b6cde65&units=imperial`;
        // API url for 5 day forecast
        var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&appid=a09ff729a95cbb2afe677c333b6cde65&units=imperial`;
        // Render current weather data to page
        renderCurrent();
        // Render 5 day forecast data to page
        renderForecast();

        function renderCurrent() {
            fetch(currentUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    var currentTemp = data.main.temp;
                    var currentIcon = data.weather[0].icon;
                    var currentHumidity = data.main.humidity;
                    var currentWind = data.wind.speed;
                    // Add weather data to current-weather div
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
        }

        function renderForecast() {
            fetch(forecastUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    // var forecastData = data.list;
                    for (i = 0; i < 40; i += 8) {
                        var temp = data.list[i].main.temp;
                        var wind = data.list[i].wind.speed;
                        var humidity = data.list[i].main.humidity;
                        var icon = data.list[i].weather[0].icon
                        var date = data.list[i].dt_txt
                        console.log("------------", date);
                        // Add forecast data to tab and day elements
                        if (i === 0) {
                            document.getElementById('tab1').innerHTML = date
                            document.getElementById('day1').innerHTML =
                                `<div>
                                <h2>${searchedCity}</h2>
                            </div>
                            <div id="future-info">
                                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="forecast-icon" alt="forecast weather icon" />
                                <h3>Temp: ${temp}°F</h3>
                                <h3>Wind: ${wind} MPH</h3>
                                <h3>Humidity: ${humidity}%</h3>
                            </div>`;
                        }
                        if (i === 8) {
                            document.getElementById('tab2').innerHTML = date
                            document.getElementById('day2').innerHTML =
                                `<div>
                                <h2>${searchedCity}</h2>
                            </div>
                            <div id="future-info">
                                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="forecast-icon" alt="forecast weather icon" />
                                <h3>Temp: ${temp}°F</h3>
                                <h3>Wind: ${wind} MPH</h3>
                                <h3>Humidity: ${humidity}%</h3>
                            </div>`;
                        }
                        if (i === 16) {
                            document.getElementById('tab3').innerHTML = date
                            document.getElementById('day3').innerHTML =
                                `<div>
                                <h2>${searchedCity}</h2>
                            </div>
                            <div id="future-info">
                                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="forecast-icon" alt="forecast weather icon" />
                                <h3>Temp: ${temp}°F</h3>
                                <h3>Wind: ${wind} MPH</h3>
                                <h3>Humidity: ${humidity}%</h3>
                            </div>`;
                        }
                        if (i === 24) {
                            document.getElementById('tab4').innerHTML = date
                            document.getElementById('day4').innerHTML =
                                `<div>
                                <h2>${searchedCity}</h2>
                            </div>
                            <div id="future-info">
                                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="forecast-icon" alt="forecast weather icon" />
                                <h3>Temp: ${temp}°F</h3>
                                <h3>Wind: ${wind} MPH</h3>
                                <h3>Humidity: ${humidity}%</h3>
                            </div>`;
                        }
                        if (i === 32) {
                            document.getElementById('tab5').innerHTML = date
                            document.getElementById('day5').innerHTML =
                                `<div>
                                <h2>${searchedCity}</h2>
                            </div>
                            <div id="future-info">
                                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="forecast-icon" alt="forecast weather icon" />
                                <h3>Temp: ${temp}°F</h3>
                                <h3>Wind: ${wind} MPH</h3>
                                <h3>Humidity: ${humidity}%</h3>
                            </div>`;
                        }
                    }
                });
        }
    })



    // Enables tab functionality for Materialize CSS framework
    $('.tabs').tabs();
});