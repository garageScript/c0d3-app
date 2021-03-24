const fs = require('fs/promises')
const path = require('path')

const ENV_PATH = 'prisma/.env'

/**
 * This function is used to generate the file `prisma/.env` with the right
 * database connection URL from the current enviroment variables that are
 * already configured (username, password, host, port, and database) when
 * running the build script at Vercel servers.
 *
 * This was made to avoid having to add another environment variable,
 * and also because the existing envs can't be acessed through Vercel as
 * they are encrypted as secrets, being available only while deploying.
 */

export async function prismaEnv() {
  if (!process.env.VERCEL) return // do this only when running on Vercel servers
  const file = path.join(process.cwd(), ENV_PATH)
  const user = process.env.DB_USER
  const pw = process.env.DB_PW
  const host = process.env.DB_HOST
  const port = process.env.DB_PORT || 5432
  const db = process.env.DB_NAME
  const url = `postgresql://${user}:${pw}@${host}:${port}/${db}`
  console.log(`Writing DB_URL to ${file}`)
  await fs.writeFile(file, `DB_URL=${url}`, 'utf-8')
}

prismaEnv()
