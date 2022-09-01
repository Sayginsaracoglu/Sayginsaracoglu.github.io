
//////////////////////////////ISS////////////////////////////////

let weather = {
  "apiKey" : "1226e6dc93cc2969a1c3841eae91cace",
}


let url = "http://api.open-notify.org/iss-now.json"
let i = 0;

function displayNotification() {
 const notification  = new Notification("Right now Iss might be visible from your location");

}
function getNotification(){
Notification.requestPermission(function(status){
  console.log("Notification permission status:",status);
});

if(Notification.permission === "granted"){
  displayNotification();
}
}

var iss_position_latitude;
var iss_position_longitude;
function issApiRequest(url){

    fetch(url).then(function(response) {
      return response.json();
    }).then(function(data) {
      var x = document.getElementById("iss-latitude");
      var y = document.getElementById("iss-longitude");
      var t = document.getElementById('iss-title');
      var v = document.getElementById('iss-velocity');
      var a = document.getElementById('iss-altitude');

      x.innerHTML = "Latitude: " + data.latitude;
      y.innerHTML = "Longitude: " + data.longitude;
      v.innerHTML = "Speed: " + Math.round(data.velocity) + " km/h";
      a.innerHTML = "Altitude: " +data.altitude.toFixed(2) +  " km";

      
      
       iss_position_latitude = data.latitude;
       iss_position_longitude = data.longitude;


    }).catch(function() {
      console.log("Booo");
    });
   
}
//Get ISS position
function getIssPosition(){
  let url = "https://api.wheretheiss.at/v1/satellites/25544"
  const card = document.getElementById("card1");
  card.classList.toggle('is-flipped');

  issApiRequest(url);
  setInterval(async() => {
  let url = "https://api.wheretheiss.at/v1/satellites/25544"
	
  issApiRequest(url);
}, 5000);
}

var x = document.getElementById("your-latitude");
var y = document.getElementById("your-longitude");

//Get user location for distance calculator
function getLocation(){
  
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
        const card = document.getElementById("card2");
        card.classList.toggle('is-flipped');
        }
    else{
        alert("Your browser doesnt support geolocation services");
    }
}
//Print position 
function showPosition(position){
  
  var x = document.getElementById("your-latitude");
  var y = document.getElementById("your-longitude");
  var d = document.getElementById("current_distance");
  var v = document.getElementById("visible");

  const your_position_latitude = position.coords.latitude;
  const your_position_longitude = position.coords.longitude;
  



  x.innerHTML = "Latitude: " + position.coords.latitude;
  y.innerHTML = "Longitude: " + position.coords.longitude;

  let distance =getDistance(your_position_latitude,iss_position_latitude,your_position_longitude,iss_position_longitude);

  
  let notificationShown = false;
  v.innerHTML = "Please wait 5 seconds as we are checking ISS visibility from your location!"
  d.innerHTML = "Current distance from ISS: " + distance + " kilometers";
  setInterval(async() => {

    //weather api
  let weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?lat="+your_position_latitude+"&lon="+your_position_longitude+"&units=metric&appid="+ weather.apiKey
  
  let isNightTime = false;
  let isWeatherClear = false;

  await fetch(weatherApiUrl).then((response)=> response.json()).then(function(weatherData){
    if(weatherData.weather[0].icon[2] === 'n' && weatherData.visibility > 9000 && weatherData.clouds.all < 35){
      isNightTime = true;
      isWeatherClear = true;
    }



  })




    let distance =getDistance(your_position_latitude,iss_position_latitude,your_position_longitude,iss_position_longitude);
    d.innerHTML = "Current distance from ISS: " + distance + " kilometers";
    if(distance < 1669 && notificationShown === false && isNightTime && isWeatherClear){
      console.log("everything matches");
      getNotification();
      isVisible(distance);
      v.innerHTML = "CAUTION! ISS might be visible from your location"
      notificationShown = true;
    }
    else if(distance > 1670){
      isVisible(distance);
      notificationShown = false;
    }

    
  }, 10000);

   
}


function isVisible(distance){
  let your_cor = document.getElementById("your-coordinates");
  var v = document.getElementById("visible");
  let a = document.createElement('a');
 
  if(distance < 1669){
    
    
   }
   else{
    
    a.innerHTML = "";
    a.target ="";
    a.href = "";
    v.innerHTML = "ISS currently is not visible from your location but we will send you a push notification once it is visible.";
    
   }
}


// Distance calculator from 2 coordinates
 function getDistance(lat1,lat2,lon1,lon2){
  const R = 6371e3; // metres
  const φ1 = lat1 * Math.PI/180; // φ, λ in radians
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;
  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c;
  initialize(lat2,lon2,lat1,lon1);
 
  return Math.floor(d / 1000);
  }


  


var geocoder;
    var map; 
    var isInitialized = false;
    var marker;
    function initialize(iss_lat,iss_lon,user_lat, user_lon) {
      const image = "../media/iss.png"
      if(isInitialized === false){

      

      geocoder = new google.maps.Geocoder();
      var lat_lng = new google.maps.LatLng(iss_lat, iss_lon);
      var lat_lng2 = new google.maps.LatLng(user_lat, user_lon);
      var mapOptions = {
        zoom: 2,
        center: lat_lng,
        disableDefaultUI: true,
        
      }
      map = new google.maps.Map(document.getElementById('map'), mapOptions);
      
      

      marker = new google.maps.Marker({
        position: lat_lng,
        map,
        title: "International Space Station",
        icon: image,
        draggable: false,
       

      });

      marker2 = new google.maps.Marker({
        position: lat_lng2,
        map,
        title: "You",
        draggable: false,
       

      });
      isInitialized = true;
    }
    else{
      var lat_lng = new google.maps.LatLng(iss_lat, iss_lon);
      
      marker.setPosition(lat_lng);
    }

    }



   