import { createContext } from 'react'
import { SessionData } from '../useSession'

const SessionContext = createContext<SessionData>({
  data: { success: false }
})

export default SessionContext
