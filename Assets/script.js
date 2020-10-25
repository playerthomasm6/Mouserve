
var addedCitiesList = [];

$(document).ready(function () {
    var addedCities = JSON.parse(localStorage.getItem("addedCities"));
    //Grabs cities from local storage and places them as buttons
    addCityButtons();

    // on click of button will add weather
    $(".cityButton").on("click", function () {
        var coordArray = [];

        var citySearchValue = $(this).text();

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearchValue + "&appid=8b5240010baf177d08076b9cccba48c3";

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            console.log(response);
            console.log(response.main.temp);
            var tempF = ((response.main.temp - 273.15) * (9 / 5) + 32);

            $("#cityToday").text(citySearchValue);
            $("#temp").text("Temperature: " + Math.floor(tempF) + "° F");
            $("#humidy").text("Humidity: " + response.main.humidity + "%");
            $("#wind-speed").text("Wind Speed: " + response.wind.speed + " mph");

            // Grab API for UV Index
            queryURL1 = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lon + "&lon=" + response.coord.lat + "&appid=503d1eeec1a82160fbba1e320befda5e";

            $.ajax({
                url: queryURL1,
                method: "GET",
            }).then(function (response) {
                console.log(response);
                $("#UV-index").text("UV Index: " + response.value);
            });
        });

    });

});

//test({
//   "coord":{"lon":-0.13,"lat":51.51},
//   "weather":[{"id":741,"main":"Fog","description":"fog","icon":"50n"}],"base":"stations",
//   "main":{"temp":284.04,"pressure":1011,"humidity":93,"tempmin":280.93,"tempmax":287.04},
//   "visibility":10000,
//   "wind":{"speed":1.5},
//   "clouds":{"all":20},
//   "dt":1570234102,
//   "sys":{"type":1,"id":1417,"message":0.0102,"country":"GB","sunrise":1570255614,"sunset":1570296659},"timezone":3600,
//  "id":2643743,
//  "name":"London",
//  "cod":200})




// On click button which adds cities to the list
$("#citySearchBtn").on("click", function () {
    // Create var which grabs the input text
    var newCity = $("#citySearch").val();
    // Creates a var which takes the space out of newCity
    var newCitySplit = newCity.split(" ").join("");
    // Creates a var which makes all letters lowercase
    var newCityLower = newCitySplit.toLowerCase();
    // Creates a var which adds a button
    var cityListAdd = $("<button>");
    // Adds the city entered as the id for the button
    cityListAdd.attr("id", newCityLower);
    // Adds the class cityButton to the button
    cityListAdd.attr("class", "cityButton");
    // Adds the button text which is the added city
    cityListAdd.text(newCity);
    // Appends the button to the HTML
    cityListAdd.appendTo("#cityList");
    $("<br>").appendTo("#cityList");

    // Pushes the added city into the array addedCities
    addedCitiesList.push(
        newCityLower = {
            name: newCity,
            id: newCityLower
        },
    )
    // Updates local storage under addedCities
    localStorage.setItem("addedCities", JSON.stringify(addedCitiesList));
    var coordArray = [];

    var citySearchValue = $(this).text();

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearchValue + "&appid=8b5240010baf177d08076b9cccba48c3";

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        console.log(response.main.temp);
        var tempF = ((response.main.temp - 273.15) * (9 / 5) + 32);

        $("#cityToday").text(citySearchValue);
        $("#temp").text("Temperature: " + Math.floor(tempF) + "° F");
        $("#humidy").text("Humidity: " + response.main.humidity + "%");
        $("#wind-speed").text("Wind Speed: " + response.wind.speed + " mph");

        // Grab API for UV Index
        queryURL1 = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lon + "&lon=" + response.coord.lat + "&appid=503d1eeec1a82160fbba1e320befda5e";

        $.ajax({
            url: queryURL1,
            method: "GET",
        }).then(function (response) {
            console.log(response);
            $("#UV-index").text("UV Index: " + response.value);
        });
    });





});

// function that pulls the stored city buttons from local storage and places them on the page
function addCityButtons() {
    // Grab my stored cities from local storage

    //Problem Child here
    var addedCities = JSON.parse(localStorage.getItem("addedCities"));
    if (addedCities) {
        // for loop to add the city buttons into the div
        for (i = 0; i < addedCities.length; i++) {
            var newCity = addedCities[i].name;
            var newCityId = addedCities[i].id;
            // Creates a var which adds a button
            var cityListAdd = $("<button>");
            // Adds the city entered as the id for the button
            cityListAdd.attr("id", newCityId);
            // Adds the class cityButton to the button
            cityListAdd.attr("class", "cityButton");
            // Adds the button text which is the added city
            cityListAdd.text(newCity);
            // Appends the button to the HTML
            cityListAdd.appendTo("#cityList");
            $("<br>").appendTo("#cityList");


            // Pushes the added city into the array addedCitiesList
            addedCitiesList.push(
                addedCities[i] = {
                    name: newCity,
                    id: newCityId
                },
            );

            // Updates local storage under addedCities
            localStorage.setItem("addedCities", JSON.stringify(addedCities));
        };
    } else {
        return;
    };
};