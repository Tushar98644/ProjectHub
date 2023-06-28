import { useSession } from 'next-auth/react'
import { Landing, Home,Form } from '@/components'

const Main = () => {
  const { data: session } = useSession();
  // returned object is being destructured to extract the data property. Then, the data property is being aliased as session.

  if (!session) {
    return <Landing />
  }

  return (
  <Home>
    <Form/>
  </Home>
  )
}

export default Main;