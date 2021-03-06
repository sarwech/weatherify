// Create and display timer
const startTime = () => {
  const today = new Date();
  let hour = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();

  hour = addZero(hour);
  min = addZero(min);
  sec = addZero(sec);
  
  document.getElementById('date').innerHTML =
    `${hour}:${min}:${sec}`;
  const t = setTimeout(() => startTime(), 500);

};
const addZero = i => {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
};

startTime();

const getWeather = () => {

  // Start by checking if geolocation is available
  if (navigator.geolocation) {

    // If available, request it from device
    navigator.geolocation.getCurrentPosition(position => {
      
      // Store lat, lon and api key as variables to use later
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      
      // Dark Sky and Google Maps keys
      const dskey = "85e107fb88c997ff4f65746dba923323"
      const mapskey = "AIzaSyAsW1o_tCCaDGH643RXZ0myxPCpfBxfovQ"
      
      // Magic happens here using Dark Sky API. ?exclude just does not ask API for M, H and flags
      $.getJSON(`https://crossorigin.me/https://api.darksky.net/forecast/${dskey}/${lat},${lon}?exclude=hourly,flags`, function(weather) {
        
        // In JSON retrieve 'currently' and then 'summary' which is actual current weather description
        const {summary} = weather.currently;
        let fahr = Math.floor(weather.currently.temperature);
        let celsius = Math.floor((fahr - 32) * (5/9));
        
        // findIcon("");
        
        const {icon} = weather.currently;
        console.log(icon);
        
        // Select colour, type of icon and play
        const skycons = new Skycons({color: "white"});
        skycons.add("icon1", icon);
        skycons.play();
        
        // Add this to h1
      
        $(".weather").html(summary.toLowerCase());
        $(".celsius").html(`${celsius}<span class='temptype'>&deg;C</span>`);
        $(".fahr").html(`${fahr}<span class='temptype'>&deg;F</span>`);
        $("#card").flip(); 

        // $(".fahrenheit").html(temp + "<span class='temptype'>F</span>")
        

        // $( "#change" ).click(function() {
          
        //   var degrees = $(".degrees").text();
          
        //   if (degrees.indexOf('C') > -1) {
        //     $(".degrees").html(fahr + "<span class='temptype'>&deg;F</span>");
        //   } else {
        //     $(".degrees").html(celsius + "<span class='temptype'>&deg;C</span>");
        //   }
         
        // });
        
        // Get city/town name from Google Maps - slightly dodgy implementation
        $.getJSON([`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${mapskey}`], map => {
          function place() {
            return map.results[0].address_components[3].long_name.toLowerCase() || "Unknown"         
          };
          $(".location").html(place);
        });

        const getBackground = () => {

          const backgrounds = {
            "clear-day": 'http://weatherify.scorpio.design/img/clear-day.png',
            "clear-night": 'http://weatherify.scorpio.design/img/clear-night.png',
            "partly-cloudy-day": 'http://weatherify.scorpio.design/img/partly-cloudy-day.png',
            "partly-cloudy-night": 'http://weatherify.scorpio.design/img/partly-cloudy-night.png',
            "cloudy": 'http://weatherify.scorpio.design/img/cloudy.png',
            "rain": 'http://weatherify.scorpio.design/img/rain.png',
            "sleet": 'img/sleet.png',
            "snow": 'https://codepen.io/sarwech/pen/gWRObV',
            "wind": 'img/wind.png',
            "fog": 'img/fog.png',
          };

          const toSearch = "cloudytwo";

          const searchObj = (obj, query) => {

              for (var key in obj) {
                  var value = obj[key];

                  if (typeof key === 'object') {
                      return value;
                  }

                  if (key === query) {
                      return value;
                  }

              }

          }

          console.log(searchObj(backgrounds, 'cloudy'));
          // Trying to build function for getting image based on icon
          // for (var i=0; i < backgrounds.length; i++) {
          //   if(backgrounds[i][key].indexOf(toSearch)!=-1) {
          //     console.log([i][key]);
          //     return backgrounds[i][value];
          //   } else {
          //       console.log([i][key]);
          //       return backgrounds[i][value];
          //   };
          // };

          $("body").css({
            "background-image": "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url("+searchObj(backgrounds, icon)+")",
            "background-repeat": "no-repeat",
            "background-size": "cover",
          });
        };

        getBackground();
      });
    });
  } else {
    x.innerHTML = "Geolocation is not supported by this browser :(";
  }
};

getWeather();


// Trying to get the right icon depending on the weather

// function findIcon() {
//   var string = "Mostly Cloudy".toLowerCase(),
//       substring = "cloudy";
//   if (string.includes(substring)) {
//     console.log("PARTLY_CLOUDY_DAY");
//   };
// };

// 1. Show time
// 2. Show location
// 3. Show Skycon image
// 4. Weather description below Skycon
// 5. Dark Sky messaging
// 6. Something cool? Background colour changes with weather? 

// London id = 2643743
// London latlon = 51.4882941,-0.0181573