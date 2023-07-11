import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const Form = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [github, setGithub] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const data = { title, description, image, github };
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        await axios.post('/api/project', data,config);
        console.log(data);
        router.push('/');
        notify();
    }

    const notify = () => {
        toast('Your project has been sent for approval.', {
            className: 'items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200',
            progressClassName: 'text-cyan-200',
            bodyClassName: "text-sm font-medium bg-cyan-800",
            closeButton: true,
            position: "top-right",
            autoClose: 4000,
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Project Title</label>
                <input type="text" id="title" onChange={(e) => setTitle(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="enter a project title" required />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Project Description</label>
                <input type="text" id="description" onChange={(e) => setDescription(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="enter a project description" required />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Github Link</label>
                <input type="text" id="github link" onChange={(e) => setGithub(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="enter the project's github link" required />
            </div>
            <div className="mb-6">
                <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image Link</label>
                <input type="url" onChange={(e) => setImage(e.target.value)} id="repeat-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="enter a image url" required />
            </div>
            <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                    <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                </div>
                <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
            </div>
            <div className='flex justify-center md:justify-start'>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send for Approval</button>
            </div>
        </form>
    );
}

export default Form;