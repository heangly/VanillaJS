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

class App {
  #map
  #mapEvent
  #workouts = []

  constructor() {
    this._getPosition()
    form.addEventListener('submit', this._newWorkout.bind(this))
    inputType.addEventListener('change', this._toggleElevationField)
  }

  _getPosition() {
    navigator.geolocation?.getCurrentPosition(
      this._loadMap.bind(this),
      function (error) {
        alert('Could not get your position', error)
      }
    )
  }

  _loadMap(position) {
    const { latitude, longitude } = position.coords
    this.#map = L.map('map').setView([latitude, longitude], 15)
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.#map)

    this.#map.on('click', this._showForm.bind(this))
  }

  _showForm(e) {
    this.#mapEvent = e
    form.classList.remove('hidden')
    inputDistance.focus()
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
  }

  _newWorkout(e) {
    e.preventDefault()

    const validInputs = (...inputs) => {
      return inputs.every((input) => Number.isFinite(input))
    }

    const allPositive = (...inputs) => {
      return inputs.every((input) => input > 0)
    }

    const type = inputType.value
    const distance = +inputDistance.value
    const duration = +inputDuration.value
    const { lat, lng } = this.#mapEvent.latlng
    let workout

    if (type === 'running') {
      const candence = +inputCadence.value

      if (
        !validInputs(distance, duration, candence) ||
        !allPositive(distance, duration, candence)
      )
        return alert('Input have to be positive number!')

      workout = new Running([lat, lng], distance, duration, candence)
    }

    if (type === 'cycling') {
      const elevation = +inputElevation.value

      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('Input have to be positive number!')

      workout = new Cycling([lat, lng], distance, duration, elevation)
    }

    this.#workouts.push(workout)
    this.renderWorkoutMarker(workout)

    //clear input field
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        ''
  }

  renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 200,
          autoClose: false,
          className: `${workout.type}-popup`,
          closeOnClick: false
        })
      )
      .setPopupContent('Workout')
      .openPopup()
  }
}

const app = new App()

class Workout {
  date = new Date()
  id = (Date.now() + '').slice(-10)

  constructor(coords, distance, duration) {
    this.coords = coords
    this.distance = distance
    this.duration = duration
  }
}

class Running extends Workout {
  type = 'running'

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration)
    this.cadence = cadence
    this.calcPace()
  }

  calcPace() {
    this.pace = this.duration / this.distance
    return this.pace
  }
}

class Cycling extends Workout {
  type = 'cycling'

  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration)
    this.elevationGain = elevationGain
    this.calcSpeed()
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60)
    return this.speed
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 178)
// const cycling1 = new Running([39, -12], 27, 95, 523)

// console.log(run1, cycling1)
