$(document).ready(function() {
    var long;
    var lat;
    var fTemp;
    var cTemp;
    var kTemp;
    var icon;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {

        long = position.coords.longitude;
        lat = position.coords.latitude;

        // console.log(long);
        // console.log(lat);

        var api = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&APPID=33ae0b719c00fb27afcdf1981de535d6"

        $.getJSON(api, function(data) {
          var weatherType = data.weather[0].description;
          var kTemp = data.main.temp;
          var windspeed = data.wind.speed;
          var windDirection = degDirection(data.wind.deg);
          var city = data.name;
          var tempSwap = true;
          var icon = "/images/codes/"+(data.weather[0].id+".png");
          //console.log("/images/codes/"+(data.weather[0].id+".png"));
          var input = document.getElementById('icon')
          input.src = icon;
          //console.log(data.wind.deg);

          //Convert Kelvin to Fahrenheit/Celsius
          fTemp = (kTemp * (9 / 5) - 459.67).toFixed(0);
          cTemp = (kTemp - 273).toFixed(0);

          //Convert meters per second to miles per hour for wind windspeed
          wind = (windspeed * 2.2369).toFixed(0);

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
          $("#weatherType").html(weatherType);
          $("#fTemp").html(fTemp + "&#8457;");
          $("#fTemp").click(function() {
            if (tempSwap === false) {
              $("#fTemp").html(cTemp + "&#8451");
              tempSwap = true;
            } else {
              $("#fTemp").html(fTemp + "&#8457;");
              tempSwap = false;
            }
          });
          $("#windspeed").html(wind + " mph" + " " + windDirection);
        });
      });
    }
  });
