/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import { Card } from '@/components'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Project } from '@/types/Project';

const Main = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  
  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios.get('/api/project', config)
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
        <div className='grid lg:grid-cols-3 sm:grid-cols-2 justify-items-center items-center grid-cols-1 gap-12 auto-rows-max sm:mx-16 mx-6'>
          {projects.map((project: Project) => (
           <Card key={project._id} {...project} />
          ))}
        </div>
      </div>
  )
}

export default Main;