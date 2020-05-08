interface Token {
  cliToken: string
  isTokenValid: boolean
}

interface Credential {
  username: string
  password: string
}

type VerifyToken = (url: string) => Promise<Token>

type GetToken = (
  credentials: Credential,
  url: string
) => Promise<Token['cliToken']>

type SaveToken = (cliToken: Token['cliToken']) => Promise<void>

type CreateCredentialsFile = (cliToken: Token['cliToken']) => Promise<void>
