import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

export function initDatabase() {
  // db.json file path
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const file = join(__dirname, '..', 'db.json')

  // Configure lowdb to write data to JSON file
  const adapter = new JSONFile(file)
  const defaultData = { posts: [] }
  const db = new Low(adapter, defaultData)
  return db
}
