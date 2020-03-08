let apiKey = "3d0cb4385570239c9c1d2ece1b6d5977"
let cityName = []
let forcast = []
let tempArray = []
let iconArray = []
let cityDisplay = $(".citydisplay")
let weatherDisplay = $(".weatherdisplay")
let search = $(".search")
let clear = $(".clear")
let historyDisplay = $(".searchhistory")
let m = moment()
let currentDay = parseInt(moment().format("DD"));

//Setting Days using moment
let dayOne = moment().day(currentDay).format("MMMM" + " DD");
let dayTwo = moment().day(currentDay +1).format("MMMM" + " DD");
let dayThree = moment().day(currentDay +2).format("MMMM" + " DD");
let dayFour = moment().day(currentDay +3).format("MMMM" + " DD");
let dayFive = moment().day(currentDay +4).format("MMMM" + " DD");

//Putting dates ito array
let dateArray = [dayOne, dayTwo, dayThree, dayFour, dayFive]

//Setting cityInput to the value of the form, setting cityName to the same value as city input
function input(){
  let cityInput = $("input").val()
  cityName = cityInput
  console.log(cityName)
}

$(search).click(function() {
    $.ajax({
      //Running the funcution input before calling ajax to prevent ajax from sending request before cityName is defied
        beforeSend: input(),
        url: "https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid="+apiKey,
        method: "GET"
      }).then(function(response) {
        // console.log(response);

      //For loop that prints the name of the city that was searched and emptys the div each time the button is clicked
        for (i = 0; i < cityName.length; i++){
          weatherDisplay.empty()
          cityDisplay.empty()
          let city = response.city.name
          cityDisplay.append(city)
      }

      //Fucution to convert temps
      function kelvinToF(temps) {
          return (((temps - 273.15) * (9 / 5)) + 32);
      }

      for (i = 0; i < 5; i++){
        //Grabs kelvin temps
        let temps = response.list[i].main.temp
        //grabs dte used to skip
        let dte = response.list[i].dt_txt
        //Cuts the hour out of the dte string so we can use it to check for repeat value
        dte = dte.substring(0, dte.indexOf(' '))        
        //Grabs small description of weather
        let weatherDescription = response.list[i].weather[0].description
        //Grabs weather icon
        let weatherIcon = response.list[i].weather[0].icon
        //grabs current day
        let currentDate = moment().format("dddd, MMMM Do YYYY")

        //Creating new divs to hold the seperate divs for the 5 day forcast
        let container = $("<div></div>")
        let forcastDisplay =$("<div></div>")
        let weather = $("<div></div>")
        let date = $("<div></div>")
        let iconDIV =$("<img></img>")

        //Appending new divs
        weatherDisplay.append(container)
        container.append(iconDIV)
        container.append(date)
        container.append(forcastDisplay)
        container.append(weather)

        //Adding a class to the new divs
        $(container).addClass("container col-md display")
        $(forcastDisplay).addClass("col-md temp")
        $(weather).addClass("col-md discrip")
        $(date).addClass("col-md date")

        //Converting from kelvin to fahrenheit
        let fahrenheit = kelvinToF(temps).toFixed(1);

        //Pushing data to each spefic array
        forcast.push(weatherDescription)
        tempArray.push(fahrenheit + "°F")
        iconArray.push(weatherIcon)
        dateArray.push(currentDate)
        
        //Prints the 5 day forcast
        $(date).html(dateArray[i])
        $(forcastDisplay).html(tempArray[i])
        $(weather).html(forcast[i])
        $(iconDIV).attr("src", "https://openweathermap.org/img/wn/" + iconArray[i] + "@2x.png")


        console.log(iconArray)

      }
      //Prits city name history
      let history = $("<button></button>")
      history.append(cityName)
      historyDisplay.append(history)
      history.addClass("history")

      //Funcution to empty the arrays so weather info displays correctly for each new click
      function clearArrays(){
        tempArray.length = 0
        forcast.length = 0
        iconArray.length = 0
      }
      //Clear after displaying
      clearArrays()

      //Grabs wind speed
      let windSpeed = response.list[0].wind.speed
      //Grabs humdity
      let humdity = response.list[i].main.humidity
      //Grabs search query lat
      let lat = response.city.coord.lat
      //grabs search query lon
      let lon = response.city.coord.lon

      //Appending wind speed
      let windDisplay = $("<div class=\"wind\"></div>")
      windDisplay.append("Wind Speed: "+ windSpeed)
      cityDisplay.append(windDisplay)

      //Appending humdity
      let humdityDisplay = $("<div class=\"humdity\"></div>")
      humdityDisplay.append("Humdity: "+ humdity)
      cityDisplay.append(humdityDisplay)

      //Another ajax call to get UV
      $.ajax(({
        url: "http://api.openweathermap.org/data/2.5/uvi?APPID="+apiKey+"&lat="+lat + "&lon=" + lon,
        method: "GET"
      })).then(function(UV){
        //setting UV value
        let uvValue = UV.value
        let uvDIV = $("<div class=\"uv\"></div>")
        //appending to display
        cityDisplay.append(uvDIV)
        uvDIV.append("UV Index: " + "<p class =il>" + uvValue + "</p")
  
        //chaning bg color of il based on value
        
        if ($(".il").text() <= 2.9){
          $(".il").css("background-color", "limegreen")
        }
        if ($(".il").text() >= 3 && $(".il").text() <= 5.9){
          $(".il").css("background-color", "yellow")
        }
        if ($(".il").text() >= 6 && $(".il").text() <= 7.9){
          $(".il").css("background-color", "orange")
        }
        if ($(".il").text() >= 8 && $(".il").text() <= 10.9){
          $(".il").css("background-color", "red")
        }
        if ($(".il").text() >= 11){
          $(".il").css("background-color", "violet")
        }
          console.log($(".il").text())
        })

      //Pointer for generated search history buttons
      let searchBTN = $(".history")


      $(searchBTN).click(function(){
        cityName = $(this).text()

        function searchinput(){
          cityName.length = 0
        }
  
        $.ajax({
          //Running the funcution input before calling ajax to prevent ajax from sending request before cityName is defied
            beforeSend: searchinput(),
            url: "https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid="+apiKey,
            method: "GET"
          }).then(function(se) {
            console.log(se);
                  //For loop that prints the name of the city that was searched and emptys the div each time the button is clicked
      for (i = 0; i < cityName.length; i++){
        weatherDisplay.empty()
        cityDisplay.empty()
        let city = se.city.name
        cityDisplay.append(city)
    }

    //Fucution to convert temps
    function kelvinToF(temps) {
        return (((temps - 273.15) * (9 / 5)) + 32);
    }

    for (i = 0; i < 5; i++){
      //Grabs kelvin temps
      let temps = se.list[i].main.temp
      //grabs dte used to skip
      let dte = se.list[i].dt_txt
      //Cuts the hour out of the dte string so we can use it to check for repeat value
      dte = dte.substring(0, dte.indexOf(' '))        
      //Grabs small description of weather
      let weatherDescription = se.list[i].weather[0].description
      //Grabs weather icon
      let weatherIcon = se.list[i].weather[0].icon
      //grabs current day
      let currentDate = moment().format("dddd, MMMM Do YYYY")

      //Creating new divs to hold the seperate divs for the 5 day forcast
              //Creating new divs to hold the seperate divs for the 5 day forcast
        let container = $("<div></div>")
        let forcastDisplay =$("<div></div>")
        let weather = $("<div></div>")
        let date = $("<div></div>")
        let iconDIV =$("<img></img>")

      //Appending new divs
      weatherDisplay.append(container)
      container.append(iconDIV)
      container.append(date)
      container.append(forcastDisplay)
      container.append(weather)

      //Adding a class to the new divs
      $(container).addClass("container col-md display")
      $(forcastDisplay).addClass("col-md temp")
      $(weather).addClass("col-md discrip")
      $(date).addClass("col-md date")

      //Converting from kelvin to fahrenheit
      let fahrenheit = kelvinToF(temps).toFixed(1);

      //Pushing data to each spefic array
      forcast.push(weatherDescription)
      tempArray.push(fahrenheit + "F°")
      iconArray.push(weatherIcon)
      dateArray.push(currentDate)
      
      //Prints the 5 day forcast
      $(date).html(dateArray[i])
      $(forcastDisplay).html(tempArray[i])
      $(weather).html(forcast[i])
      $(iconDIV).attr("src", "https://openweathermap.org/img/wn/" + iconArray[i] + "@2x.png")

      // console.log(dte)
    }

    //Funcution to empty the arrays so weather info displays correctly for each new click
    function clearArrays(){
      tempArray.length = 0
      forcast.length = 0
    }
    //Clear after displaying
    clearArrays()

    //Grabs wind speed
    let windSpeed = se.list[0].wind.speed
    //Grabs humdity
    let humdity = se.list[i].main.humidity
    //Grabs search query lat
    let lat = se.city.coord.lat
    //grabs search query lon
    let lon = se.city.coord.lon

    //Appending wind speed
    let windDisplay = $("<div class=\"wind\"></div>")
    windDisplay.append("Wind Speed: "+ windSpeed)
    cityDisplay.append(windDisplay)

    //Appending humdity
    let humdityDisplay = $("<div class=\"humdity\"></div>")
    humdityDisplay.append("Humdity: "+ humdity)
    cityDisplay.append(humdityDisplay)

    //Another ajax call to get UV
    $.ajax(({
      url: "http://api.openweathermap.org/data/2.5/uvi?APPID="+apiKey+"&lat="+lat + "&lon=" + lon,
      method: "GET"
    })).then(function(UV){
      $(".uv").empty()
        //setting UV value
        let uvValue = UV.value
        let uvDIV = $("<div class=\"uv\"></div>")
        //appending to display
        cityDisplay.append(uvDIV)
        uvDIV.append("UV Index: " + "<p class =il>" + uvValue + "</p")
        
      //Changing bg color of the UV display based on the value
      if ($(".il").text() <= 2.9){
        $(".il").css("background-color", "limegreen")
      }
      if ($(".il").text() >= 3 && $(".il").text() <= 5.9){
        $(".il").css("background-color", "yellow")
      }
      if ($(".il").text() >= 6 && $(".il").text() <= 7.9){
        $(".il").css("background-color", "orange")
      }
      if ($(".il").text() >= 8 && $(".il").text() <= 10.9){
        $(".il").css("background-color", "red")
      }
      if ($(".il").text() >= 11){
        $(".il").css("background-color", "violet")
      }
        console.log($(".il").text())
      })
          })
      
        })
  })

})

//setting button to clear search history
let clearbtn = $(".clear")
clearbtn.click(function(){
  historyDisplay.empty()
})
