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
        console.log(response);

      //For loop that prints the name of the city that was searched and emptys the div each time the button is clicked
        for (i = 0; i < cityName.length; i++){
          weatherDisplay.empty()
          cityDisplay.empty()

          let city = response.city.name

          cityDisplay.append(city)
          
      }


      for (i = 0; i < 5; i++){


        //Grabs kelvin temps
        let temps = response.list[i].main.temp
        //Grabs small description of weather
        let weatherDescription = response.list[i].weather[0].description
        //Grabs weather icon
        let weatherIcon = response.list[i].weather[0].icon

        //Creating new divs to hold the seperate divs for the 5 day forcast
        let container = $("<div></div>")
        let forcastDisplay =$("<div></div>")

        //Appending new divs
        weatherDisplay.append(container)
        container.append(forcastDisplay)

        //Adding a class to the new divs
        $(container).addClass("container col-md")
        $(forcastDisplay).addClass("col-md temp")

        //Pushing data to each spefic array
        forcast.push(weatherDescription)
        tempArray.push(temps)
        iconArray.push(weatherIcon)
        
        $(".temp").html(tempArray[i])
      }

      let history = $("<div></div>")
      history.append(cityName)
      historyDisplay.append(history)
      history.addClass("history")

      function clearArray(){
        tempArray.length = 0
      }

      clearArray()



      console.log(forcast)
      console.log(tempArray)
      // console.table(response.list)
      // console.table(response.list[0].weather)
      })



})

$(clear).click(function(){
  historyDisplay.empty()
})