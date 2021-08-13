#!/usr/bin/env node

const { execSync } = require('child_process')
const { writeFileSync } = require('fs')
const path = require('path')

const ARGS = {
  BASELINE: 'baseline',
  MIGRATE: 'migrate',
  ROLLBACK: 'rollback',
  SETUP: 'setup'
}

const migrationsToRollback = ['20210724143149_is_passed_to_datetime']

;(function main() {
  const args = process.argv.slice(2)
  for (arg of args) {
    switch (arg) {
      case ARGS.BASELINE:
        if (isProd()) resolve('20210323001623_init')
        break
      case ARGS.MIGRATE:
        if (isProd()) run(`yarn prisma migrate deploy`)
        break
      case ARGS.ROLLBACK:
        if (isProd()) {
          migrationsToRollback.forEach(migration => {
            run(`yarn prisma migrate resolve --rolled-back ${migration}`)
          })
        }
        break
      case ARGS.SETUP:
        setupPrisma()
        break
      default:
        console.error('Invalid argument')
        break
    }
  }
})()

// Environment variable values from https://vercel.com/docs/environment-variables#system-environment-variables
function isVercel() {
  const VERCEL = process.env.VERCEL
  return VERCEL && VERCEL === '1'
}

function isProd() {
  const VERCEL_ENV = process.env.VERCEL_ENV
  return VERCEL_ENV && VERCEL_ENV === 'production'
}

function run(command) {
  try {
    execSync(command, { stdio: 'inherit' })
  } catch (error) {
    console.error(error.message)
  }
}

/**
 * Generate a `.env` file for Prisma from the current database connection
 * environment variables, because Prisma requires an URL connection string
 * like `postgresql://user:pw@host:port/db`
 */
function setupPrisma() {
  if (!isVercel()) return // do this only when running on Vercel servers
  const file = path.join(process.cwd(), 'prisma/.env')
  const user = process.env.DB_USER
  const pw = process.env.DB_PW
  const host = process.env.DB_HOST
  const port = process.env.DB_PORT || 5432
  const db = process.env.DB_NAME
  const url = `postgresql://${user}:${pw}@${host}:${port}/${db}?connection_limit=1`
  writeFileSync(file, `DB_URL=${url}`, 'utf-8')
}

/**
 * Resolves the migration as applied on the database
 * @param {string} migration Migration name
 */
function resolve(migration) {
  try {
    execSync(`yarn prisma migrate resolve --applied "${migration}"`, {
      stdio: ['inherit', 'inherit', 'pipe']
    })
  } catch (error) {
    const msg = error.stderr.toString()
    if (/P3008/g.test(msg)) {
      // P3008 is the error code
      // ignore if migration already was applied
      console.log(`Migration ${migration} already applied.`)
    } else throw new Error(msg)
  }
}
