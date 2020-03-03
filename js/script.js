let apiKey = "3d0cb4385570239c9c1d2ece1b6d5977"
let cityName = []
let forcast = []
let cityDisplay = $(".citydisplay")
let weatherDisplay = $(".weatherdisplay")
let search = $(".btn")
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
      
      })
})


