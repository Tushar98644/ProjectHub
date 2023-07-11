/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import { Card } from '@/components'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Project } from '@/types/Project';

const Main = () => {
  const [projects, setProjects] = useState<Project[]>([]);

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

  return (
      <div className='py-44'>
        {/* <div className='text-center py-4'>
          <Link href='/project' className='cursor-pointer'>
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Add Project
              </span>
            </button>
          </Link>
        </div> */}
        <div className='grid lg:grid-cols-3 sm:grid-cols-2 justify-items-center items-center grid-cols-1 gap-12 auto-rows-max sm:mx-16 mx-6'>
          {projects.map((project: Project) => (
           <Card key={project._id} {...project} />
          ))}
        </div>
      </div>
  )
}

export default Main;