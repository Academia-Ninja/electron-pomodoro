/**
 * Returns a countdown timer
 * @param {number} countdownTime
 * @param {Object} options
 * @returns {NodeJS.Timer}
 */
export const countdownTimer = (countdownTimeInMinutes, { onCounting, onFinished }) => {
  const countdownDateTime = _getCountdownDateTime(countdownTimeInMinutes)

  const countdown = setInterval(() => {
    const now = new Date().getTime()

    const timeRemaining = countdownDateTime - now

    const minutes = String(Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0')
    const seconds = String(Math.floor((timeRemaining % (1000 * 60)) / 1000)).padStart(2, '0')

    onCounting({ minutes, seconds })

    if (parseInt(minutes) === 0 && parseInt(seconds) === 0) {
      clearInterval(countdown)
      onFinished()
    }
  }, 1000)

  return countdown
}

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
