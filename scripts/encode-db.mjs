import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dir = dirname(fileURLToPath(import.meta.url))
const dbPath = join(__dir, '..', 'db', 'custom.db')
const outPath = join(__dir, '..', 'src', 'lib', 'db-binary.ts')

const b64 = readFileSync(dbPath).toString('base64')
const content = `// Auto-generated — encodes db/custom.db for serverless runtime
export const DB_BASE64 = ${JSON.stringify(b64)}
`
writeFileSync(outPath, content)
console.log(`[encode-db] wrote ${outPath} (${b64.length} bytes base64)`)
