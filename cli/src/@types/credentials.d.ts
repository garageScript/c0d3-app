export interface Token {
  cliToken: string
  isTokenValid: boolean
}

export interface Credential {
  username: string
  password: string
}

export type VerifyToken = (url: string) => Promise<Token>

export type GetToken = (
  credentials: Credential,
  url: string
) => Promise<Token['cliToken']>

export type SaveToken = (cliToken: Token['cliToken']) => Promise<void>

export type CreateCredentialsFile = (
  cliToken: Token['cliToken']
) => Promise<void>
