class Timer {
  constructor(durationInput, startButton, pauseButton, callBacks = {}) {
    this.durationInput = durationInput
    this.startButton = startButton
    this.pauseButton = pauseButton

    if (callBacks) {
      this.onStart = callBacks.onStart
      this.onTick = callBacks.onTick
      this.onComplete = callBacks.onComplete
    }

    this.startButton.addEventListener('click', this.start)
    this.pauseButton.addEventListener('click', this.pause)
  }

  start = () => {
    this.pause()
    this.onStart && this.onStart(this.timeRemaining)
    this.tick()
    this.interval = setInterval(this.tick, 20)
  }

  pause = () => {
    this.interval && clearInterval(this.interval)
  }

  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause()
      this.onComplete && this.onComplete()
      this.timeRemaining = 0
    } else {
      this.timeRemaining -= 0.02
      this.onTick && this.onTick(this.timeRemaining)
    }
  }

  get timeRemaining() {
    return parseFloat(this.durationInput.value)
  }

  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2)
  }
}
