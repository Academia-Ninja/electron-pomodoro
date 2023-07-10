import fs from 'fs'
import Loki from 'lokijs'
import path from 'path'

/**
 * Returns the lokijs database instance
 * @returns {Loki}
 */
export const database = () => {
  const DATABASE_PATH = path.join(__dirname, 'data.db')

  if (!fs.existsSync(DATABASE_PATH)) { fs.openSync(DATABASE_PATH, 'w') }
  if (!database.instance) { database.instance = new Loki(DATABASE_PATH) }

  return database.instance
}

/**
 * Returns the collection reference by name
 * @param {string} collectionName
 * @returns {Collection<any>}
 */
export const query = (collectionName) => {
  if (!collectionName) { throw new Error(`The database "collectionName": ${collectionName} has not been defined`) }
  if (typeof collectionName !== 'string') { throw new Error('The parameter "collectionName" must be a string') }

  const collection = database().getCollection(collectionName) ?? database().addCollection(collectionName)
  return collection
}
