import { Notification } from 'electron'

/**
 * Returns a Notification instance
 * @param {string} title
 * @param {string} message
 * @param {NotificationConstructorOptions} options
 * @returns {Notification}
 */
export const notify = (title, message = null, options = {}) => {
  if (!title || typeof title !== 'string') { throw new Error('The title has not been defined or it`s not a string') }
  if (message && typeof message !== 'string') { throw new Error('The message must be a string') }

  const notify = new Notification({
    title,
    body: message,
    silent: false,
    ...options
  })

  return notify
}
