
var addedCitiesList = [];

$(document).ready(function () {
    
    var addedCities = JSON.parse(localStorage.getItem("addedCities"));
    //Grabs cities from local storage and places them as buttons
    addCityButtons();

    // List of Cities on buttons.  Clicking willing bring up weather
    $(".cityButton").on("click", function () {
        var recentCity = [];
        var addedCities = JSON.parse(localStorage.getItem("addedCities"));
        var coordArray = [];

        var citySearchValue = $(this).text();
        console.log(citySearchValue);

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearchValue + "&appid=8b5240010baf177d08076b9cccba48c3";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            getCurrentDay();
            console.log(response);
            console.log(response.main.temp);
            var tempF = ((response.main.temp - 273.15) * (9 / 5) + 32);

            var iconId = response.weather[0].icon;

            $("#weatherIcon").attr("src", "http://openweathermap.org/img/wn/" + iconId + ".png");
            $("#cityToday").text(citySearchValue);
            $("#temp").text("Temperature: " + Math.floor(tempF) + "° F");
            $("#humidy").text("Humidity: " + response.main.humidity + "%");
            $("#wind-speed").text("Wind Speed: " + response.wind.speed + " mph");

            // Grab API for UV Index
            queryURL1 = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=503d1eeec1a82160fbba1e320befda5e";


            // 16-DAY FORECAST API REQUEST
            var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&exclude=minutely,hourly,alerts&appid=8b5240010baf177d08076b9cccba48c3";

            console.log(response.coord.lon);
            console.log(response.coord.lat);

            $.ajax({
                url: queryURL2,
                method: "GET",
            }).then(function (response) {
                console.log(response);
                $("#5day").empty();
                getCurrentDay();

                for (i = 0; i < 5; i++) {
                    var newDiv1 = $("<div>").attr("class", "col-sm-2 forecast-container");

                    var thisDay = currentDayArray[i];
                    var thisDayEl = $("<h3>").attr("id", "dayoftheweek" + i);
                    thisDayEl.text(thisDay);
                    newDiv1.append(thisDayEl);
                    console.log(thisDay);

                    forecastIconId = response.daily[i].weather[0].icon;
                    var foreCastIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + forecastIconId + ".png");
                    foreCastIcon.attr("class", "forecastIcon")
                    newDiv1.append(foreCastIcon);

                    var dailymin = $("<p>").attr("id", i + "day");
                    dailymin.text("Low: " + Math.floor(((response.daily[i].temp.min) - 273.15) * (9 / 5) + 32) + "° F");
                    newDiv1.append(dailymin);

                    var dailymax = $("<p>").attr("id", i + "day");
                    dailymax.text("High: " + Math.floor(((response.daily[i].temp.max) - 273.15) * (9 / 5) + 32) + "° F");
                    newDiv1.append(dailymax);

                    $("#5day").append(newDiv1);


                };
            });




            $.ajax({
                url: queryURL1,
                method: "GET",
            }).then(function (response) {
                console.log(response);
                $("#UV-index").text("UV Index: " + response.value);
            });
        });

        recentCity.push(
                 recentCityObj = {
                name: citySearchValue,
            },
        );
        localStorage.setItem("recentCity", JSON.stringify(recentCity));

    });


    //selectedCity = searchHistoryArray[searchHistoryArray.length-1]
    //mainWeather();


    // On click button which adds cities to the list
    $("#citySearchBtn").on("click", function () {
        var recentCity = [];

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
        );

        recentCity.push(
            newCityLower = {
                name: newCity,
            },
        );

        // Updates local storage under addedCities
        localStorage.setItem("addedCities", JSON.stringify(addedCitiesList));
        localStorage.setItem("recentCity", JSON.stringify(recentCity));

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + newCity + "&appid=8b5240010baf177d08076b9cccba48c3";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            getCurrentDay();
            console.log(response);
            console.log(response.main.temp);
            var tempF = ((response.main.temp - 273.15) * (9 / 5) + 32);

            var iconId = response.weather[0].icon;

            $("#weatherIcon").attr("src", "http://openweathermap.org/img/wn/" + iconId + ".png");
            $("#cityToday").text(newCity);
            $("#temp").text("Temperature: " + Math.floor(tempF) + "° F");
            $("#humidy").text("Humidity: " + response.main.humidity + "%");
            $("#wind-speed").text("Wind Speed: " + response.wind.speed + " mph");

            // Grab API for UV Index
            queryURL1 = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=503d1eeec1a82160fbba1e320befda5e";


            // 16-DAY FORECAST API REQUEST
            var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&exclude=minutely,hourly,alerts&appid=8b5240010baf177d08076b9cccba48c3";

            console.log(response.coord.lon);
            console.log(response.coord.lat);

            $.ajax({
                url: queryURL2,
                method: "GET",
            }).then(function (response) {
                console.log(response);
                $("#5day").empty();
                getCurrentDay();

                for (i = 0; i < 5; i++) {
                    var newDiv1 = $("<div>").attr("class", "col-sm-2 forecast-container");

                    var thisDay = currentDayArray[i];
                    var thisDayEl = $("<h3>").attr("id", "dayoftheweek" + i);
                    thisDayEl.text(thisDay);
                    newDiv1.append(thisDayEl);
                    console.log(thisDay);

                    forecastIconId = response.daily[i].weather[0].icon;
                    var foreCastIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + forecastIconId + ".png");
                    foreCastIcon.attr("class", "forecastIcon")
                    newDiv1.append(foreCastIcon);

                    var dailymin = $("<p>").attr("id", i + "day");
                    dailymin.text("Low: " + Math.floor(((response.daily[i].temp.min) - 273.15) * (9 / 5) + 32) + "° F");
                    newDiv1.append(dailymin);

                    var dailymax = $("<p>").attr("id", i + "day");
                    dailymax.text("High: " + Math.floor(((response.daily[i].temp.max) - 273.15) * (9 / 5) + 32) + "° F");
                    newDiv1.append(dailymax);

                    $("#5day").append(newDiv1);


                };
            });




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
        var recentCity = JSON.parse(localStorage.getItem("recentCity"));
        if (recentCity){
        

        var newCity = recentCity[0].name;

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + newCity + "&appid=8b5240010baf177d08076b9cccba48c3";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            getCurrentDay();
            console.log(response);
            console.log(response.main.temp);
            var tempF = ((response.main.temp - 273.15) * (9 / 5) + 32);

            var iconId = response.weather[0].icon;

            $("#weatherIcon").attr("src", "http://openweathermap.org/img/wn/" + iconId + ".png");
            $("#cityToday").text(newCity);
            $("#temp").text("Temperature: " + Math.floor(tempF) + "° F");
            $("#humidy").text("Humidity: " + response.main.humidity + "%");
            $("#wind-speed").text("Wind Speed: " + response.wind.speed + " mph");

            // Grab API for UV Index
            queryURL1 = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=503d1eeec1a82160fbba1e320befda5e";


            // 16-DAY FORECAST API REQUEST
            var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&exclude=minutely,hourly,alerts&appid=8b5240010baf177d08076b9cccba48c3";

            console.log(response.coord.lon);
            console.log(response.coord.lat);

            $.ajax({
                url: queryURL2,
                method: "GET",
            }).then(function (response) {
                console.log(response);
                $("#5day").empty();
                getCurrentDay();

                for (i = 0; i < 5; i++) {
                    var newDiv1 = $("<div>").attr("class", "col-sm-2 forecast-container");

                    var thisDay = currentDayArray[i];
                    var thisDayEl = $("<h3>").attr("id", "dayoftheweek" + i);
                    thisDayEl.text(thisDay);
                    newDiv1.append(thisDayEl);
                    console.log(thisDay);

                    forecastIconId = response.daily[i].weather[0].icon;
                    var foreCastIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + forecastIconId + ".png");
                    foreCastIcon.attr("class", "forecastIcon")
                    newDiv1.append(foreCastIcon);

                    var dailymin = $("<p>").attr("id", i + "day");
                    dailymin.text("Low: " + Math.floor(((response.daily[i].temp.min) - 273.15) * (9 / 5) + 32) + "° F");
                    newDiv1.append(dailymin);

                    var dailymax = $("<p>").attr("id", i + "day");
                    dailymax.text("High: " + Math.floor(((response.daily[i].temp.max) - 273.15) * (9 / 5) + 32) + "° F");
                    newDiv1.append(dailymax);

                    $("#5day").append(newDiv1);


                };
            });




            $.ajax({
                url: queryURL1,
                method: "GET",
            }).then(function (response) {
                console.log(response);
                $("#UV-index").text("UV Index: " + response.value);
            });
        });
    };

        // Grab my stored cities from local storage
        
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

    //This function grabs the current day and turn it to a string
    function getCurrentDay() {
        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var output = d;
        var outputStr = output.toString();




        //This grabs the current day and sets the next five days
        var currentDay = (outputStr[0] + outputStr[1] + outputStr[2])

        if (currentDay === "Sun") {
            currentDayArray = ["Mon", "Tue", "Wed", "Thu", "Fri",];

        } else if (currentDay === "Mon") {
            currentDayArray = ["Tue", "Wed", "Thu", "Fri", "Sat",];

        } else if (currentDay === "Tue") {
            currentDayArray = ["Wed", "Thu", "Fri", "Sat", "Sun",];

        } else if (currentDay === "Wed") {
            currentDayArray = ["Thu", "Fri", "Sat", "Sun", "Mon",];

        } else if (currentDay === "Thu") {
            currentDayArray = ["Fri", "Sat", "Sun", "Mon", "Tue",];

        } else if (currentDay === "Fri") {
            currentDayArray = ["Sat", "Sun", "Mon", "Tue", "Wed",];

        } else if (currentDay === "Sat") {
            currentDayArray = ["Sun", "Mon", "Tue", "Wed", "Thu",];
        };
    };






});

