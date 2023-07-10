import './assets/css/index.css'
import { countdownTimer } from './assets/js/countdown'

// * elements object
const countdownMinuteSpan = document.getElementById('countdown-minute')
const countdownSecondSpan = document.getElementById('countdown-second')
const countdownStartButton = document.getElementById('countdown-start')
const countdownResetButton = document.getElementById('countdown-reset')
const countdownIncrementButton = document.getElementById('countdown-increment')
const countdownDecrementButton = document.getElementById('countdown-decrement')

// * globals object
const _api = window.api
const _data = {
  countdownTimeInMinutes: 1,
  countdownTimer: null
}

const resetCountdown = () => {
  if (_data.countdownTimer) {
    clearCountdown()
    startCountdown()
  }
}

const clearCountdown = () => {
  clearInterval(_data.countdownTimer)
  _data.countdownTimer = null
}

const startCountdown = () => {
  if (!_data.countdownTimer) {
    _data.countdownTimer = countdownTimer(_data.countdownTimeInMinutes,
      {
        onCounting: ({ minutes, seconds }) => {
          countdownMinuteSpan.innerText = minutes
          countdownSecondSpan.innerText = seconds
        },
        onFinished: () => {
          _api.countdownFinished()

          clearCountdown()
          setData()
        }
      }
    )
  }
}

const incrementCountdown = () => {
  const countdownIncrement = _data.countdownTimeInMinutes + 5
  if (countdownIncrement > 60) return

  _data.countdownTimeInMinutes = countdownIncrement

  setData()
}

const decrementCountdown = () => {
  const countdownDecrement = _data.countdownTimeInMinutes - 5
  if (countdownDecrement < 0) return

  _data.countdownTimeInMinutes = countdownDecrement

  setData()
}

function setData() {
  countdownMinuteSpan.innerText = String(_data.countdownTimeInMinutes).padStart(2, '0')
}

function registerDOMEvents() {
  countdownStartButton.addEventListener('click', () => startCountdown())
  countdownResetButton.addEventListener('click', () => resetCountdown())
  countdownIncrementButton.addEventListener('click', () => incrementCountdown())
  countdownDecrementButton.addEventListener('click', () => decrementCountdown())
}

function render() {
  setData()
  registerDOMEvents()
}

window.addEventListener('load', render)
