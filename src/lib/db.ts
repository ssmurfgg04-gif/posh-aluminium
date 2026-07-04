import { PrismaClient } from '@prisma/client'
import path from 'path'
import fs from 'fs'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function resolveDatabaseUrl(): string {
  const envUrl = process.env.DATABASE_URL
  if (!envUrl || !envUrl.startsWith('file:')) {
    return envUrl || ''
  }
  // Prisma resolves file: URLs relative to the schema file's directory
  // at build time. On serverless runtimes (Netlify), the schema directory
  // doesn't exist. Compute an absolute path by searching likely locations.
  const candidates = [
    path.join(process.cwd(), 'db', 'custom.db'),
    path.join(process.cwd(), '..', 'db', 'custom.db'),
    path.join(process.cwd(), '..', '..', 'db', 'custom.db'),
    path.join(process.cwd(), '.next', 'db', 'custom.db'),
    path.join(process.cwd(), '..', '.next', 'db', 'custom.db'),
  ]
  for (const c of candidates) {
    try {
      if (fs.statSync(c).isFile()) {
        return `file:${c}`
      }
    } catch {}
  }
  // Fall back to the env var (works at build time, fails at runtime on Netlify)
  return envUrl
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: resolveDatabaseUrl(),
    log: process.env.NODE_ENV === 'production' ? [] : ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db