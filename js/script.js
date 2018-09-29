const form = document.getElementById('generator')
const formName = document.getElementById('fullName')
let current = {}

getLocation().then(function(result) {
  current = result
})

form.addEventListener('submit', function(e) {
  e.preventDefault();
  console.log(formName.value, current)
}, false)

function getLocation() {
  return new Promise(function(resolve, reject) {
    if (!navigator.geolocation){
      reject('Geolocation is not supported by your browser');
      return;
    }

    function success(position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;
      
      resolve({
        latitude,
        longitude
      })
    }

    function error() {
      reject('Unable to retrieve your location');
    }

    navigator.geolocation.getCurrentPosition(success, error);
  })
}