import { createContext } from 'react'
import { SessionData } from '../useSession'

const SessionContext = createContext<SessionData>({
  data: null,
  error: null
})

export default SessionContext
