'use strict'

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form')
const containerWorkouts = document.querySelector('.workouts')
const inputType = document.querySelector('.form__input--type')
const inputDistance = document.querySelector('.form__input--distance')
const inputDuration = document.querySelector('.form__input--duration')
const inputCadence = document.querySelector('.form__input--cadence')
const inputElevation = document.querySelector('.form__input--elevation')

let map = null
let mapEvent = null

navigator.geolocation?.getCurrentPosition(
  function (position) {
    const { latitude, longitude } = position.coords
    // console.log(`https://www.google.com/maps/@${latitude},${longitude}`)
    map = L.map('map').setView([latitude, longitude], 15)
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    // L.marker([latitude, longitude]).addTo(map).bindPopup(`Home`).openPopup()

    map.on('click', function (e) {
      mapEvent = e
      form.classList.remove('hidden')
      inputDistance.focus()
    })
  },
  function (error) {
    alert('Could not get your position', error)
  }
)

form.addEventListener('submit', (e) => {
  e.preventDefault()

  //clear input field
  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      ''

  const { lat, lng } = mapEvent.latlng
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 200,
        autoClose: false,
        className: 'running-popup',
        closeOnClick: false
      })
    )
    .openPopup()
    .setPopupContent('Workout')
})

inputType.addEventListener('change', () => {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
})
