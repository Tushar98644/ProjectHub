import { useSession } from 'next-auth/react'
import { Landing, Home } from '@/components'
import Link from 'next/link';

const Main = () => {
  const { data: session } = useSession();
  // returned object is being destructured to extract the data property. Then, the data property is being aliased as session.

  if (!session) {
    return <Landing />
  }

  return (
  <Home>
    <Link href='/project' className='mt-20 cursor-pointer'>
     <button>add project</button>
    </Link>
  </Home>
  )
}

export default Main;