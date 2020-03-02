let apiKey = "3d0cb4385570239c9c1d2ece1b6d5977"
let cityName = []
let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=London&appid="+apiKey
let cityDisplay = $(".citydisplay")
let weatherDisplay = $(".weatherdisplay")
//let form = $("#input").val()
let search = $(".btn")
let historyDisplay = $(".searchhistory")



$(search).click(function() {
    let cityInput = $("input").val()
    cityName.push(cityInput)
    console.log(cityInput);
    //Take text input push to array
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
    
    
    
    
        console.log(response);
        console.log(cityName)
      })
})


