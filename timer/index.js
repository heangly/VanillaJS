const durationInput = document.querySelector('#duration')
const startButton = document.querySelector('#start')
const pauseButton = document.querySelector('#pause')
const circle = document.querySelector('circle')

const perimeter = circle.getAttribute('r') * 2 * Math.PI
circle.setAttribute('stroke-dasharray', perimeter)

let duration = null

const callBacks = {
  onStart(totalDuration) {
    duration = totalDuration
  },

  onTick(timeRemaining) {
    circle.setAttribute(
      'stroke-dashoffset',
      (perimeter * timeRemaining) / duration - perimeter
    )
  },

  onComplete() {
    console.log('Complete started')
  }
}

const timer = new Timer(durationInput, startButton, pauseButton, callBacks)