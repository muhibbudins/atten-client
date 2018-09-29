const form = document.getElementById('generator')
const formName = document.getElementById('fullName')

let current = {}

getLocation().then(function(result) {
  current = result
})

form.addEventListener('submit', function(e) {
  e.preventDefault();

  this.style.display = 'none'

  new QRCode('code', {
    text: JSON.stringify({
      name: formName.value,
      location: current
    }),
    width: 400,
    height: 400,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
  })
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