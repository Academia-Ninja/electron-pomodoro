import './assets/css/index.css'
import { countdownTimer } from './assets/js/countdown'

// * elements object
const countdownMinuteSpan = document.getElementById('countdown-minute')
const countdownSecondSpan = document.getElementById('countdown-second')
const countdownStartButton = document.getElementById('countdown-start')
const countdownResetButton = document.getElementById('countdown-reset')

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
        }
      }
    )
  }
}

function getData() {
  countdownMinuteSpan.innerText = String(_data.countdownTimeInMinutes).padStart(2, '0')
}

function registerDOMEvents() {
  countdownStartButton.addEventListener('click', () => startCountdown())
  countdownResetButton.addEventListener('click', () => resetCountdown())
}

function render() {
  getData()
  registerDOMEvents()
}

window.addEventListener('load', render)
