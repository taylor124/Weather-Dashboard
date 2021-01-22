var searchBtn = document.querySelector('#searchBtn')
var inputField = document.querySelector('#cityInput');

searchBtn.addEventListener('click', function(e){
    e.preventDefault()
    var userInput = inputField.value
    console.log(userInput);
    weatherCall(userInput);
});

inputField.addEventListener('submit', function(e){
    e.preventDefault()
    var userInput = inputField.value
    console.log(userInput);
    weatherCall(userInput);
});

var weatherCall = function(cityName){
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=39428f6d41d40bd58ecee861a07b8de4"
    $.ajax({url:queryURL, method:'GET'}).then(function(weatherRes){
        //console.log(weatherRes, weatherRes.coord.lat, weatherRes.coord.lon)
        oneCall(weatherRes.coord.lat, weatherRes.coord.lon);
    });
};

var oneCall = function(Lat, Lon){
    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + Lat + "&lon=" + Lon +  "&exclude=minutely,hourly&units=metric&appid=39428f6d41d40bd58ecee861a07b8de4"
    $.ajax({url:queryURL, method:'GET'}).then(function(weatherResCord){
        console.log(weatherResCord);
        //Update HTML with current weather data with weatherResCord and forecast
    });
};

