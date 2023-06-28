/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import { useSession } from 'next-auth/react'
import { Landing, Home } from '@/components'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Main = () => {
  const { data: session } = useSession();
  // returned object is being destructured to extract the data property. Then, the data property is being aliased as session.
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('/api/project')
      .then(res => {
        console.log(res.data)
        setProjects(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])


  if (!session) {
    return <Landing />
  }

  return (
    <Home>
      <Link href='/project' className='mt-20 cursor-pointer'>
        <button>add project</button>
      </Link>
      {projects.map((project) => (
        <div className='pt-20'>
          <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full " src="https://v1.tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{project.title}</div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
            </div>
          </div>

        </div>
      ))
      }

    </Home>
  )
}

export default Main;