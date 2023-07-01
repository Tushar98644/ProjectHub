/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import { Navbar } from '@/components'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div className='py-40'>
      <Link href='/project' className='cursor-pointer ml-20'>
        <button className='bg-blue-800 px-12 py-4 rounded-[5vw] shadow-lg'>Add project</button>
      </Link>
      <div className='mt-20 grid lg:grid-cols-3 lg:m-0 md:m-0 md:grid-cols-2 sm:grid-cols-1 sm:mx-12 xsm:p-12 gap-16 auto-rows-max'>
        {projects.map((project: Project) => (
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img className="rounded-t-lg" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt="" />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{project.title}</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{project.description}</p>
              <a href={project.github} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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