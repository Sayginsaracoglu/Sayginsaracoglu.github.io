
let weather = {
    "apiKey" : "1226e6dc93cc2969a1c3841eae91cace",
}

function getWeatherByCoord(weatherApiUrl,city,lat,lon){

    fetch(weatherApiUrl).then((response)=> response.json()).then(function(weatherData){
        iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

        let title = Math.round(weatherData.main.temp) + "°C\n" +   weatherData.weather[0].description;
        initialize(lat,lon,iconUrl,title);

        let conIcon = document.getElementById('con-icon');
        conIcon.src = iconUrl;
        let cityName = document.getElementById('city'); 
        cityName.innerHTML = city;
        let temp = document.getElementById('temp') ;
        temp.innerHTML = Math.floor(weatherData.main.temp) + "°C";
        let condition = document.getElementById('condition');
        condition.innerHTML = weatherData.weather[0].description;
        let wind = document.getElementById('wind');
        wind.innerHTML = weatherData.wind.speed + " km/h";
        let windDir = document.getElementById('wind-direction');
        windDir.innerHTML = weatherData.wind.deg;
        //dynamic arrow size change by wind speed
        let arrowSize = Math.floor(weatherData.wind.speed / 2)  + 26;
        let windArrow = document.getElementById('wind-arrow');
        windArrow.style.fontSize = `${arrowSize}px`;
        let deg = weatherData.wind.deg;
        //dynamic arrow degree by wind direction
        windArrow.style.transform = "rotate(" + deg + "deg)";
    });


}





async function cityNameToImage(city){
  
  let googleApiKey = "AIzaSyDkucj2gPPLej04W8EzsUakrgxVru7meEc";
  //let urlForReference = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${city}&key=${googleApiKey}&inputtype=textquery&fields=name,photos`
  let urlForReference = "https://opensky-network.org/api/states/all?time=1458564121&icao24=3c6444";
  
  let response = await fetch(urlForReference);
   let responseJ = await response.json();
  


  return responseJ;



}






function getWeather(url,city){

  let data1;

    fetch(url).then((response)=> response.json())
    .then(function(data) {
        let lat = data[0].lat;
        let lon = data[0].lon;
       

        let weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&appid="+ weather.apiKey

        getWeatherByCoord(weatherApiUrl,city,lat,lon);

        




    }).catch(function() {
      console.log("Error");
    });
  
}   
    
    function search(city){
        
    
    let url = "https://api.openweathermap.org/geo/1.0/direct?q="+ city + "&appid=1226e6dc93cc2969a1c3841eae91cace";
    
    cityNameToImage(city);
    getWeather(url,city);
    printWeather();
    }
    

    document.querySelector("#search-button").addEventListener("click",function(){
        let city = document.getElementsByTagName("input")[0].value;
        
        search(city);
    })

    document.querySelector("#search-input").addEventListener("keyup",function(event){
        if(event.key == "Enter"){
            let city = document.getElementsByTagName("input")[0].value;
       
            search(city);
        }
    })

    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
          
        }
      }
      
      async function coordsToCity(apiForCityName){

        let response = await fetch(apiForCityName);
        let responseJ = await response.json();
        let data = await responseJ[0].name;
        return data;
      }

      async function setCurrentLocationToLocalVar(position){

        lat = position.coords.latitude;
        lon = position.coords.longitude;
        
        let weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&appid="+ weather.apiKey
        let apiForCityName = "https://api.openweathermap.org/geo/1.0/reverse?lat="+lat+"&lon="+lon+"&appid="+ weather.apiKey
        
        let city = await coordsToCity(apiForCityName);
      
        getWeatherByCoord(weatherApiUrl,city,lat,lon);
        
        search(city);
      }

      function searchShrink(){
        


      }
      
      function printWeather(){
        let weather_card = document.getElementById('weather-card');
        weather_card.classList.add('weather-card-shrink');
        weather_card.style.paddingTop = "15%";
        let weather_info = document.getElementById('weather-info');
        weather_info.classList.add('print-weather');
        }

    document.querySelector("#location-button").addEventListener("click",function(){
       
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setCurrentLocationToLocalVar);
            
            printWeather();
            document.getElementById("search-input").value = '';
              
          } else {
            
          }
    })


    var geocoder;
    var map;
    function initialize(lat,lon,icon,title) {
      geocoder = new google.maps.Geocoder();
      var lat_lng = new google.maps.LatLng(lat, lon);
      var mapOptions = {
        zoom: 6,
        center: lat_lng,
        disableDefaultUI: true,
        gestureHandling: "none"
        
      
      }
      map = new google.maps.Map(document.getElementById('map'), mapOptions);
      
      
      


      //image.style.transform = "rotate(" + hdg + "deg)";
      new google.maps.Marker({
        position: lat_lng,
        map,
        icon: icon,
        draggable: false,
        title: title
      });
    }

function getWeatherByCoord(weatherApiUrl,city,lat,lon){

    fetch(weatherApiUrl).then((response)=> response.json()).then(function(weatherData){
        iconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

        let title = Math.round(weatherData.main.temp) + "°C\n" +   weatherData.weather[0].description;
        initialize(lat,lon,iconUrl,title);

        let conIcon = document.getElementById('con-icon');
        conIcon.src = iconUrl;
        let cityName = document.getElementById('city'); 
        cityName.innerHTML = city;
        let temp = document.getElementById('temp') ;
        temp.innerHTML = Math.floor(weatherData.main.temp) + "°C";
        let condition = document.getElementById('condition');
        condition.innerHTML = weatherData.weather[0].description;
        let wind = document.getElementById('wind');
        wind.innerHTML = "Speed: "+weatherData.wind.speed + " km/h";
        let windDir = document.getElementById('wind-direction');
        windDir.innerHTML = "From: "+weatherData.wind.deg + "°";
        //dynamic arrow size change by wind speed
        let arrowSize = Math.floor(weatherData.wind.speed / 2)  + 26;
        let windArrow = document.getElementById('wind-arrow');
        windArrow.style.fontSize = `${arrowSize}px`;
        let deg = weatherData.wind.deg;
        //dynamic arrow degree by wind direction
        windArrow.style.transform = "rotate(" + deg + "deg)";
    });


}





async function cityNameToImage(city){
  
  let googleApiKey = "AIzaSyDkucj2gPPLej04W8EzsUakrgxVru7meEc";
  //let urlForReference = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${city}&key=${googleApiKey}&inputtype=textquery&fields=name,photos`
  let urlForReference = "https://opensky-network.org/api/states/all?time=1458564121&icao24=3c6444";
  
  let response = await fetch(urlForReference);
   let responseJ = await response.json();
  


  return responseJ;



}






function getWeather(url,city){

  let data1;

    fetch(url).then((response)=> response.json())
    .then(function(data) {
        let lat = data[0].lat;
        let lon = data[0].lon;
       

        let weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&appid="+ weather.apiKey

        getWeatherByCoord(weatherApiUrl,city,lat,lon);

        




    }).catch(function() {
      console.log("Error");
    });
  
}   
    
    function search(city){
        
    
    let url = "https://api.openweathermap.org/geo/1.0/direct?q="+ city + "&appid=1226e6dc93cc2969a1c3841eae91cace";
    
    cityNameToImage(city);
    getWeather(url,city);
    printWeather();
    }
    

    document.querySelector("#search-button").addEventListener("click",function(){
        let city = document.getElementsByTagName("input")[0].value;
        
        search(city);
    })

    document.querySelector("#search-input").addEventListener("keyup",function(event){
        if(event.key == "Enter"){
            let city = document.getElementsByTagName("input")[0].value;
       
            search(city);
        }
    })

    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
          
        }
      }
      
      async function coordsToCity(apiForCityName){

        let response = await fetch(apiForCityName);
        let responseJ = await response.json();
        let data = await responseJ[0].name;
        return data;
      }

      async function setCurrentLocationToLocalVar(position){

        lat = position.coords.latitude;
        lon = position.coords.longitude;
        
        let weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&appid="+ weather.apiKey
        let apiForCityName = "https://api.openweathermap.org/geo/1.0/reverse?lat="+lat+"&lon="+lon+"&appid="+ weather.apiKey
        
        let city = await coordsToCity(apiForCityName);
      
        getWeatherByCoord(weatherApiUrl,city,lat,lon);
        
        search(city);
      }

      function searchShrink(){
        


      }
      
      function printWeather(){
        let weather_card = document.getElementById('weather-card');
        weather_card.classList.add('weather-card-shrink');
        weather_card.style.paddingTop = "15%";
        let weather_info = document.getElementById('weather-info');
        weather_info.classList.add('print-weather');
        }

    document.querySelector("#location-button").addEventListener("click",function(){
       
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setCurrentLocationToLocalVar);
            
            printWeather();
            document.getElementById("search-input").value = '';
              
          } else {
            
          }
    })


    var geocoder;
    var map;
    function initialize(lat,lon,icon,title) {
      geocoder = new google.maps.Geocoder();
      var lat_lng = new google.maps.LatLng(lat, lon);
      var mapOptions = {
        zoom: 6,
        center: lat_lng,
        disableDefaultUI: true,
        gestureHandling: "none"
        
      
      }
      map = new google.maps.Map(document.getElementById('map'), mapOptions);
      
      
      


      //image.style.transform = "rotate(" + hdg + "deg)";
      new google.maps.Marker({
        position: lat_lng,
        map,
        icon: icon,
        draggable: false,
        title: title
      });
    }

