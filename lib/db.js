import { PrismaClient } from '@prisma/client'
import pkg from 'pg'
const { Pool } = pkg
import { PrismaPg } from '@prisma/adapter-pg'

const url = process.env.DATABASE_URL

if (!url) {
    throw new Error('DATABASE_URL is not set in environment variables')
}

const pool = new Pool({ connectionString: url })
const adapter = new PrismaPg(pool)

const globalForPrisma = global

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
