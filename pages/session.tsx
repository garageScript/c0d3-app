import { signOut, useSession } from 'next-auth/client'
import React from 'react'

export default function Page() {
  const [session, loading] = useSession()

  if (loading) return <h1>Loading</h1>

  return (
    <main>
      <h1>Session</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <button onClick={() => signOut()}>Sign out</button>
    </main>
  )
}
