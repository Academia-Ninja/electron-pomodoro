let _countdownInstance = null
let _countdownTimeInMinutes = 0

/**
 * Execute a countdown timer
 * @param {number} countdownTime
 * @param {Object} options
 */
export const execCountdown = ({ onCounting, onFinished }) => {
  const countdownTime = getCountdownTime()

  if (countdownTime === 0) return
  const countdownDateTime = _getCountdownDateTime(countdownTime)

  _countdownInstance = setInterval(() => {
    const now = new Date().getTime()

    const timeRemaining = countdownDateTime - now

    const minutes = String(Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0')
    const seconds = String(Math.floor((timeRemaining % (1000 * 60)) / 1000)).padStart(2, '0')

    onCounting({ minutes, seconds })

    if (parseInt(minutes) === 0 && parseInt(seconds) === 0) {
      clearCountdown()
      onFinished()
    }
  }, 1000)
}

/**
 * Clear the countdown
 */
export const clearCountdown = () => {
  clearInterval(_countdownInstance)
  _countdownInstance = null
}

/**
 * Set the countdown time
 * @param {number} time
 */
export const setCountdownTime = (time) => {
  _countdownTimeInMinutes = parseInt(time)
}

/**
 * Returns the set countdown time
 * @returns {number}
 */
export const getCountdownTime = () => parseInt(_countdownTimeInMinutes)

/**
 * Returns true if the countdown is running
 * @returns {boolean}
 */
export const countdownIsRunning = () => !!_countdownInstance

/**
 * Returns the target time of countdown
 * @param {number} countdownTimeInMinutes
 * @returns {number}
 */
const _getCountdownDateTime = (countdownTimeInMinutes) => {
  // const countdownDate = new Date('Jul 08, 2023 02:23:50')
  const countdownDate = new Date()
  countdownDate.setMinutes(countdownDate.getMinutes() + countdownTimeInMinutes)

  return countdownDate.getTime()
}
