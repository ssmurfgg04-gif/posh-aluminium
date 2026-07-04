import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import { DB_BASE64 } from './db-binary'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function ensureDatabase(): string {
  const target = '/tmp/custom.db'
  try {
    if (fs.statSync(target).isFile()) {
      return `file:${target}`
    }
  } catch {}
  fs.writeFileSync(target, Buffer.from(DB_BASE64, 'base64'))
  return `file:${target}`
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: ensureDatabase(),
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db