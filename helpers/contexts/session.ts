import { createContext } from 'react'
import { SessionData } from '../useSession'

const SessionContext = createContext<SessionData>({ session: null })

export default SessionContext
