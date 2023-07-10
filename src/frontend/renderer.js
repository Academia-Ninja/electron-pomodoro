import './assets/css/index.css'
import {
  countdownIsRunning,
  execCountdown,
  getCountdownTime,
  setCountdownTime,
  stopCountdown
} from './assets/js/countdown'

// * Elements object
const countdownMinuteSpan = document.getElementById('countdown-minute')
const countdownSecondSpan = document.getElementById('countdown-second')
const countdownStartButton = document.getElementById('countdown-start')
const countdownResetButton = document.getElementById('countdown-reset')
const countdownIncrementButton = document.getElementById('countdown-increment')
const countdownDecrementButton = document.getElementById('countdown-decrement')

// * Globals object
const _api = window.api

const resetCountdown = () => {
  if (!countdownIsRunning()) return

  stopCountdown()
  startCountdown()
}

const startCountdown = () => {
  if (countdownIsRunning()) return

  execCountdown({
    onCounting: ({ minutes, seconds }) => {
      countdownMinuteSpan.innerText = minutes
      countdownSecondSpan.innerText = seconds
    },
    onFinished: () => {
      _api.countdownFinished()

      setCountdownMinutesInHTML()
    }
  })
}

const incrementCountdown = () => {
  if (countdownIsRunning()) return

  const countdownIncrement = getCountdownTime() + 5
  if (countdownIncrement > 60) return

  setCountdownTime(countdownIncrement)
  setCountdownMinutesInHTML()
}

const decrementCountdown = () => {
  if (countdownIsRunning()) return

  const countdownDecrement = getCountdownTime() - 5
  if (countdownDecrement < 0) return

  setCountdownTime(countdownDecrement)
  setCountdownMinutesInHTML()
}

const setCountdownMinutesInHTML = () => {
  countdownMinuteSpan.innerText = String(getCountdownTime()).padStart(2, '0')
}

const setInitialData = () => {
  setCountdownTime(1)
  setCountdownMinutesInHTML()
}

const registerAPIEvents = () => {
  _api.onInit(() => setInitialData())
}

const registerDOMEvents = () => {
  countdownStartButton.addEventListener('click', () => startCountdown())
  countdownResetButton.addEventListener('click', () => resetCountdown())
  countdownIncrementButton.addEventListener('click', () => incrementCountdown())
  countdownDecrementButton.addEventListener('click', () => decrementCountdown())
}

const init = () => {
  registerAPIEvents()
  registerDOMEvents()
}

window.addEventListener('load', init)
