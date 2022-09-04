
let weather = {
    "apiKey" : "1226e6dc93cc2969a1c3841eae91cace",
}
/*  weather data response example  {
  "coord": {
    "lon": -122.08,
    "lat": 37.39
  },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 282.55,
    "feels_like": 281.86,
    "temp_min": 280.37,
    "temp_max": 284.26,
    "pressure": 1023,
    "humidity": 100
  },
  "visibility": 10000,
  "wind": {
    "speed": 1.5,
    "deg": 350
  },
  "clouds": {
    "all": 1
  },
  "dt": 1560350645,
  "sys": {
    "type": 1,
    "id": 5122,
    "message": 0.0139,
    "country": "US",
    "sunrise": 1560343627,
    "sunset": 1560396563
  },
  "timezone": -25200,
  "id": 420006353,
  "name": "Mountain View",
  "cod": 200
  }                         */



async function getAircraftByICAO24(url){

    await fetch(url).then((response)=> response.json()).then(function(aircraftData){
      
      if(aircraftData.states != null){
        
        let call_sign = document.getElementById('call-sign');
        call_sign.innerHTML = aircraftData.states[0][1];
       
        let altitude = document.getElementById('altitude');
        altitude.innerHTML = "<strong>Altitude</strong><br>" + Math.floor(aircraftData.states[0][7]) + " meters";
        let speed = document.getElementById('speed');
        speed.innerHTML = "<strong>Ground Speed</strong><br>"+ Math.floor(aircraftData.states[0][9] * 3.6) + " km/h";
        let squawk_code = document.getElementById('squawk');

        if(aircraftData.states[0][14] ===  null){
            squawk_code.innerHTML = "<strong>Squawk</strong><br>-----";
        }
        else{
            squawk_code.innerHTML = "<strong>Squawk</strong><br>" + aircraftData.states[0][14];
        }
      

        let hdg = document.getElementById('hdg');
        hdg.innerHTML = "<strong>Heading</strong><br>"+Math.floor(aircraftData.states[0][10]) + "°";
        
     
        initialize(aircraftData.states[0][6],aircraftData.states[0][5],aircraftData.states[0][10],aircraftData.states[0][1]);
        getWeather(aircraftData.states[0][6],aircraftData.states[0][5]);

        let flag = document.getElementById('flag');

        flag.src = `https://countryflagsapi.com/png/${aircraftData.states[0][2].toLowerCase()} `;
        return true;
      }

      else{
        let popup= document.getElementById("popup");
        popup.classList.add("open-pop");
        
        let weather_card = document.getElementById('aircraft-card');
        weather_card.classList.remove('aircraft-card-shrink');
        
        let weather_info = document.getElementById('aircraft-info');
        weather_info.classList.remove('print-aircraft');
        
        return false;
      }

       
    });
    }

    function close_pop(){
     
      
      popup.classList.remove("open-pop"); 
      location.reload();
      
      
    
    }
    
  
    // function codeAddress() {
    //   var address = document.getElementById('address').value;
    //   geocoder.geocode( { 'address': address}, function(results, status) {
    //     if (status == 'OK') {
    //       map.setCenter(results[0].geometry.location);
    //       var marker = new google.maps.Marker({
    //           map: map,
    //           position: results[0].geometry.location
    //       });
    //     } else {
    //       alert('Geocode was not successful for the following reason: ' + status);
    //     }
    //   });
    // }
  


    


/*  weather data response example  {
  "coord": {
    "lon": -122.08,
    "lat": 37.39
  },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 282.55,
    "feels_like": 281.86,
    "temp_min": 280.37,
    "temp_max": 284.26,
    "pressure": 1023,
    "humidity": 100
  },
  "visibility": 10000,
  "wind": {
    "speed": 1.5,
    "deg": 350
  },
  "clouds": {
    "all": 1
  },
  "dt": 1560350645,
  "sys": {
    "type": 1,
    "id": 5122,
    "message": 0.0139,
    "country": "US",
    "sunrise": 1560343627,
    "sunset": 1560396563
  },
  "timezone": -25200,
  "id": 420006353,
  "name": "Mountain View",
  "cod": 200
  }                         */

   





    function search(icao24){
        
    let icao24L = icao24.toLowerCase();
    let url = `https://opensky-network.org/api/states/all?&icao24=${icao24L}`;
     let result = getAircraftByICAO24(url);
   
    if(result){
      
      printAircraft();
    }
    else{
      alert("Aircraft information couldn't be retrieved from api services")
    }
    }
    

    document.querySelector("#search-button").addEventListener("click",function(){
    
        let icao24 = document.getElementsByTagName("input")[0].value;
        
        search(icao24);
    })

    document.querySelector("#search-input").addEventListener("keyup",function(event){
        if(event.key == "Enter"){
            let icao24 = document.getElementsByTagName("input")[0].value;
       
            search(icao24);
        }
    })

      
      function printAircraft(){
        let weather_card = document.getElementById('aircraft-card');
        weather_card.classList.add('aircraft-card-shrink');
        weather_card.style.paddingTop = "15%";
        let weather_info = document.getElementById('aircraft-info');
        weather_info.classList.add('print-aircraft');
        }

    document.querySelector("#location-button").addEventListener("click",function(){
       
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setCurrentLocationToLocalVar);
            
            printWeather();
            document.getElementById("search-input").value = '';
              
          } else {
            
          }
    })



    function getWeather(lat,lon){
       
      
        let weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&appid="+ weather.apiKey

        getWeatherByCoord(weatherApiUrl);

}   


    function getWeatherByCoord(weatherApiUrl){
        
        fetch(weatherApiUrl).then((response)=> response.json()).then(function(weatherData){
            let temp = document.getElementById('temp') ;
            temp.innerHTML = Math.floor(weatherData.main.temp) + "°C";
           
            let wind = document.getElementById('wind');
            wind.innerHTML ="<strong>Speed</strong><br>" +  weatherData.wind.speed + " km/h";
            let windDir =  document.getElementById('wind-direction');
            windDir.innerHTML ="<strong>Direction</strong><br>" +  weatherData.wind.deg  + "°";
            //dynamic arrow size change by wind speed
            let arrowSize = Math.floor(weatherData.wind.speed / 2)  + 26;
            let windArrow = document.getElementById('wind-arrow');
            windArrow.style.fontSize = `${arrowSize}px`;
            let deg = weatherData.wind.deg;
            //dynamic arrow degree by wind direction
            windArrow.style.transform = "rotate(" + deg + "deg)";
            let pressure = document.getElementById('pressure');
            pressure.innerHTML ="<strong>Altimeter</strong><br>" +  weatherData.main.pressure + " QHN";
        });
    
    
    }


    var geocoder;
    var map;
    function initialize(lat,lon,hdg,reg) {
      geocoder = new google.maps.Geocoder();
      var lat_lng = new google.maps.LatLng(lat, lon);
      var mapOptions = {
        zoom: 3,
        center: lat_lng,
        disableDefaultUI: true,
        styles: [{
          "elementType": "geometry",
          "stylers": [{
            "color": "#212121"
          }]
        },
        {
          "elementType": "labels.icon",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#757575"
          }]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#212121"
          }]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [{
            "color": "#757575"
          }]
        },
        {
          "featureType": "administrative.country",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#9e9e9e"
          }]
        },
        {
          "featureType": "administrative.land_parcel",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#bdbdbd"
          }]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#757575"
          }]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [{
            "color": "#181818"
          }]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#616161"
          }]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#1b1b1b"
          }]
        },
        {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#2c2c2c"
          }]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#8a8a8a"
          }]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [{
            "color": "#373737"
          }]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [{
            "color": "#3c3c3c"
          }]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [{
            "color": "#4e4e4e"
          }]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#616161"
          }]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#757575"
          }]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{
            "color": "#000000"
          }]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#3d3d3d"
          }]
        }
      ]
      }
      map = new google.maps.Map(document.getElementById('map'), mapOptions);
      
      
      const image = {
       

         path : "M 0 12 l -5 10 l 5 -3 l 5 3 z z",
         fillColor: "white",
         fillOpacity: 1,
         rotation: hdg,
         anchor:new google.maps.Point(1,22),
        
         scale: 2
        
      }


      //image.style.transform = "rotate(" + hdg + "deg)";
      new google.maps.Marker({
        position: lat_lng,
        map,
        title: reg,
        icon: image,
        draggable: false,

      });
    }

    function close_pop(){
     
      
      popup.classList.remove("open-pop"); 
      location.reload();
      
      
    
    }
    
  
    // function codeAddress() {
    //   var address = document.getElementById('address').value;
    //   geocoder.geocode( { 'address': address}, function(results, status) {
    //     if (status == 'OK') {
    //       map.setCenter(results[0].geometry.location);
    //       var marker = new google.maps.Marker({
    //           map: map,
    //           position: results[0].geometry.location
    //       });
    //     } else {
    //       alert('Geocode was not successful for the following reason: ' + status);
    //     }
    //   });
    // }
