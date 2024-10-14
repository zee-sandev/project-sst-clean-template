import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/*
step 1: download credentials.json from google cloud console

step 2: generate token.json by command:
node <node_modules>/gmail-tester/init.js <path-to-credentials.json> <path-to-token.json> <target-email>
example: node node_modules/gmail-tester/init.js ./src/utils/gmail/credentials.json ./src/utils/gmail/token.json suphachok.dev@gmail.com

*/

// config.js
export default {
  credentialsPath: path.resolve(__dirname, 'credentials.json'),
  tokenPath: path.resolve(__dirname, 'token.json')
}
