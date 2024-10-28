import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// config.js
export default {
  credentialsPath: path.resolve(__dirname, 'credentials.json'),
  tokenPath: path.resolve(__dirname, 'token.json')
}
