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
  const cwd = process.cwd()
  const candidates = [
    // Database bundled in .next/server/db/ (inside function bundle)
    path.join(cwd, '.next', 'server', 'db', 'custom.db'),
    path.join(cwd, '..', '.next', 'server', 'db', 'custom.db'),
    path.join(cwd, '..', '..', '.next', 'server', 'db', 'custom.db'),
    // Database at repo root (build-time location)
    path.join(cwd, 'db', 'custom.db'),
    path.join(cwd, '..', 'db', 'custom.db'),
    path.join(cwd, '..', '..', 'db', 'custom.db'),
    path.join(cwd, '..', '..', '..', 'db', 'custom.db'),
    // Database in .next/db/ (fallback)
    path.join(cwd, '.next', 'db', 'custom.db'),
    path.join(cwd, '..', '.next', 'db', 'custom.db'),
    path.join(cwd, '..', '..', '.next', 'db', 'custom.db'),
  ]
  for (const c of candidates) {
    try {
      if (fs.statSync(c).isFile()) {
        console.log('[db] found at', c)
        return `file:${c}`
      }
    } catch {}
  }
  console.log('[db] not found. cwd:', cwd, 'envUrl:', envUrl)
  return envUrl
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: resolveDatabaseUrl(),
    log: process.env.NODE_ENV === 'production' ? [] : ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db