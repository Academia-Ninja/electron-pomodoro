import { Notification } from 'electron'

/**
 * Shows a system notification
 * @param {string} title
 * @param {string} message
 */
export const notify = (title, message) => {
  if (!title || typeof title !== 'string') { throw new Error('The title has not been defined or it`s not a string') }
  if (!message || typeof message !== 'string') { throw new Error('The message has not been defined or it`s not a string') }

  new Notification({
    title, body: message
  }).show()
}
