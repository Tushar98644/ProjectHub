/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import { Navbar } from '@/components'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const Main = () => {
  // returned object is being destructured to extract the data property. Then, the data property is being aliased as session.
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
    <>
      <Navbar />
      <div className='py-32'>
        <div className='text-center py-4'>
          <Link href='/project' className='cursor-pointer'>
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Add Project
              </span>
            </button>
          </Link>
        </div>
        <div className='grid lg:grid-cols-3 sm:grid-cols-2 justify-items-center items-center grid-cols-1 gap-12 auto-rows-max sm:mx-16 mx-6'>
          {projects.map((project: Project) => (
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <Link href="#">
                <img className="rounded-t-lg"
                  src={project.image}
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src = "/logo.png"
                  }}
                  alt="" width={400} height={250}/>
              </Link>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 sm:text-2xl text-base font-bold tracking-tight text-gray-900 dark:text-white">{project.title}</h5>
                </a>
                <p className="mb-3 font-normal sm:text-base text-sm text-gray-700 dark:text-gray-400 text-ellipsis overflow-auto">{project.description}</p>
                <a href={project.github} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  view github
                  <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Main;