var searchBtn = document.querySelector('#searchBtn');
var inputField = document.querySelector('#cityInput');
var formEl = document.querySelector('#localSearchesForm');
var localSearchEl = document.querySelector('.list-group-item');
var weatherBtn = document.querySelector('.weatherBtn');
var previousSearches = [];

//Creates buttons after submitting weather criteria

var DisplaySearch = function () {
    previousSearches = JSON.parse(localStorage.getItem('weatherCriteria'));


    if (previousSearches !== null) {

        weatherCall(previousSearches[previousSearches.length - 1]);
        for (var i = 0; i < previousSearches.length; i++) {
            var liResults = document.createElement('li');
            liResults.classList.add('list-group-item');
            liResults.textContent = "";
            formEl.appendChild(liResults);
            var weatherBtn = document.createElement('button');
            weatherBtn.textContent = previousSearches[i];
            weatherBtn.classList.add('btn', 'btn-light');
            liResults.appendChild(weatherBtn);

            weatherBtn.addEventListener('click', function (e) {
                e.preventDefault();
                console.log(e);
                weatherCall(this.innerText);
            });
        };
    }
    else {
        previousSearches = [];
    };
};

document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault()
    var userInput = inputField.value;
    console.log(userInput);
    weatherCall(userInput);
    console.log(e);

    var cityLocal = document.createElement('button');
    cityLocal.textContent = userInput;
    cityLocal.classList.add('list-group-item');


    var formEl = document.querySelector('#localSearchesForm');
    formEl.appendChild(cityLocal);

    console.log(previousSearches);
    previousSearches.push(userInput);
    SavedContent();

});

// Gathers Info from oneCall

var weatherCall = function (cityName) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=39428f6d41d40bd58ecee861a07b8de4"
    $.ajax({ url: queryURL, method: 'GET' }).then(function (weatherRes) {
        console.log(weatherRes, weatherRes.coord.lat, weatherRes.coord.lon)
        oneCall(weatherRes.coord.lat, weatherRes.coord.lon);
    });
};

// Applies Info into HTML from here

var oneCall = function (Lat, Lon) {
    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + Lat + "&lon=" + Lon + "&exclude=minutely,hourly&units=metric&appid=39428f6d41d40bd58ecee861a07b8de4"
    $.ajax({ url: queryURL, method: 'GET' }).then(function (weatherResCord) {
        console.log(weatherResCord);
        //Update HTML with current weather data with weatherResCord and forecast
        var divElDisplay1 = document.querySelector('.Description');
        var divElDisplay2 = document.querySelector('.Humidity');
        var divElDisplay3 = document.querySelector('.Tempature');
        var divElDisplay4 = document.querySelector('.Feels-Like');
        divElDisplay1.textContent = weatherResCord.current.weather[0].description;
        divElDisplay2.textContent = weatherResCord.current.humidity + "%";
        divElDisplay3.textContent = weatherResCord.current.temp + "C°";
        divElDisplay4.textContent = weatherResCord.current.feels_like + "C°";
    });
};

// localStorage Function

var SavedContent = function () {
    localStorage.setItem('weatherCriteria', JSON.stringify(previousSearches));
};

DisplaySearch();