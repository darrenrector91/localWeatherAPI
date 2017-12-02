$(document).ready(function() {
var long;
var lat;
var fTemp;
var cTemp;
var kTemp;
var icon;
var zip = prompt("What is you zip code?")

var api = "http://api.openweathermap.org/data/2.5/weather?zip=" + zip + "&APPID=33ae0b719c00fb27afcdf1981de535d6"

// var api = "http://api.openweathermap.org/data/2.5/weather?zip=55428,us&APPID=33ae0b719c00fb27afcdf1981de535d6"

$.getJSON(api, function(data) {
  var weatherType = capitalizeFirstLetter(data.weather[0].description);
  var kTemp = data.main.temp;
  var humidity = data.main.humidity;
  var windspeed = data.wind.speed;
  var windDirection = degDirection(data.wind.deg);
  var city = data.name;
  var imageCode = data.weather[0].id;
  var formatChange = true;
  var icon = "/images/codes/" + (data.weather[0].id + ".png");

  // function moon(string) {
  //   if (imageCode === 800 && imageCode > 19) {
  //     var icon = "/images/code/moon.jpg"
  //   } else {
  //     var icon = "/images/codes/" + (data.weather[0].id + ".png");
  //   }
  // }
  var input = document.getElementById('icon')
  var sunrise = unixConverter(data.sys.sunrise);
  var sunset = unixConverter(data.sys.sunset);
  input.src = icon;
  var dt = unixConverter(data.dt); // not updating often
  console.log("image code: " + imageCode);

  function unixConverter(number) {
    var date = new Date(number * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return formattedTime;
  }

  // function moon(string) {
//   if (imageCode === 800 && imageCode > 19) {
//     var icon = "/images/code/moon.jpg"
//   } else {
//     var icon = "/images/codes/" + (data.weather[0].id + ".png");
//   }
// }



  function switchMoon(imageCode) {
    if (imageCode === 800 && dt > 19 && dt < 6) {
      var icon = "/images/codes/moon.png"
    } else {
      var icon = "/images/codes/" + (imageCode + ".png");
    }
  }

  //Convert Kelvin to Fahrenheit/Celsius
  fTemp = (kTemp * (9 / 5) - 459.67).toFixed(0);
  cTemp = (kTemp - 273).toFixed(0);

  //Convert meters per second to miles per hour for wind windspeed
  wind = (windspeed * 2.2369).toFixed(0);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function degDirection(windDirection) {
    for (var i = 1; i <= 360; i++) {
      if (windDirection >= 348.75 && windDirection <= 11.25) {
        return windDirection = "N"
      } else if (windDirection > 11.25 && windDirection <= 33.75) {
        return windDirection = "NNE"
      } else if (windDirection > 33.75 && windDirection <= 56.25) {
        return windDirection = "NE"
      } else if (windDirection > 56.25 && windDirection <= 78.75) {
        return windDirection = "ENE"
      } else if (windDirection > 78.75 && windDirection <= 101.25) {
        return windDirection = "E"
      } else if (windDirection > 101.25 && windDirection <= 123.75) {
        return windDirection = "ESE"
      } else if (windDirection > 123.75 && windDirection <= 146.25) {
        return windDirection = "SE"
      } else if (windDirection > 146.25 && windDirection <= 168.75) {
        return windDirection = "SSE"
      } else if (windDirection > 168.75 && windDirection <= 191.25) {
        return windDirection = "S"
      } else if (windDirection > 191.25 && windDirection <= 213.75) {
        return windDirection = "SSW"
      } else if (windDirection > 213.75 && windDirection <= 236.25) {
        return windDirection = "SW"
      } else if (windDirection > 236.25 && windDirection <= 258.75) {
        return windDirection = "WSW"
      } else if (windDirection > 258.75 && windDirection <= 281.25) {
        return windDirection = "W"
      } else if (windDirection > 281.25 && windDirection <= 303.75) {
        return windDirection = "WNW"
      } else if (windDirection > 303.75 && windDirection <= 326.25) {
        return windDirection = "NW"
      } else windDirection = "NNW"
    }

  }

  $("#icon").html(icon)
  $("#city").html(city);
  $("#humidity").html(humidity);
  $("#weatherType").html(weatherType);
  $("#fTemp").html(fTemp + "&#8457;");
  $("#fTemp").click(function() {
    if (formatChange === false) {
      $("#fTemp").html(cTemp + "&#8451");
      formatChange = true;
    } else {
      $("#fTemp").html(fTemp + "&#8457;");
      formatChange = false;
    }
  });
  $("#windspeed").html(wind);
  $("#windDirection").html(windDirection);
});
});
