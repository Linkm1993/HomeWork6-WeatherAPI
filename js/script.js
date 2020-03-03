let apiKey = "3d0cb4385570239c9c1d2ece1b6d5977"
let cityName = []
let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid="+apiKey
let cityDisplay = $(".citydisplay")
let weatherDisplay = $(".weatherdisplay")
//let form = $("#input").val()
let search = $(".btn")
let historyDisplay = $(".searchhistory")

function input(){
  let cityInput = $("input").val()
  cityName = cityInput
  console.log(cityName)
}

$(search).click(function() {
    $.ajax({
        beforeSend: input(),
        url: "https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid="+apiKey,
        method: "GET"
      }).then(function(response) {
        console.log(response);
      })
})