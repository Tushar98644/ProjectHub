/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { HI } from "@/shared";
import { Project } from "@/types/Project";
import axios from "axios";
import Lottie from "lottie-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Admin = () => {
    const { data: session } = useSession();
    const [projects, setProject] = useState<Project[]>([]);
    const [approvalStatus, setApprovalStatus] = useState<{ [key: string]: string }>({});

    const Approve_project = async (projectId: string) => {
        await axios.post('/api/admin', { projectId, approved: true })
            .then(res => {
                console.log(`project approved details:${res.data}`)
                setApprovalStatus(prevState => ({ ...prevState, [projectId]: 'Approved' }));
                toast.success('Project Approved',{theme:'dark',autoClose:3000,closeButton:true})
            })
            .catch(err => {
                console.log(err)
            })
    }

    const Reject_project = async (projectId: string) => {
        try {
            await axios.post('/api/admin', { projectId, approved: false })
            setApprovalStatus(prevState => ({ ...prevState, [projectId]: 'Rejected' }));
            toast.error('Project Rejected',{theme:'dark',autoClose:3000,closeButton:true})
        }
        catch (err) {
            console.log(err)
        }
        console.log('project rejected')
    }


    useEffect(() => {
        const fetchProjects = async () => {
            await axios.get('/api/admin')
                .then(res => {
                    console.log(res.data);
                    setProject(res.data);
                    // Set initial approval status
                    const initialApprovalStatus = res.data.reduce((accumulator: any, project: Project) => {
                        if (project.approved === undefined) {
                            accumulator[project._id] = undefined;
                        } else {
                            accumulator[project._id] = project.approved ? 'Approved' : 'Rejected';
                        }
                        return accumulator;
                    }, {});
                    setApprovalStatus(initialApprovalStatus);

                })
                .catch(err => {
                    console.log(err);
                })
        }
        fetchProjects();
    }, [])

    return (
        <div className="flex flex-col md:gap-4 gap-12">
            <div className="md:pt-28 pt-40 md:px-20 px-8 text-nav-text font-bold grid grid-cols-2 items-center">
                <div className="text-[#ff2bc1] lg:text-4xl md:text-3xl sm:text-2xl text-lg text-center justify-self-start">
                    <p className=" animate-pulse">Pending approval</p>
                </div>
                <div className="flex flex-row items-center gap-0 justify-self-end">
                    <div className="w-[15vw]">
                        <Lottie animationData={HI} height={50} width={50} className="" />
                    </div>
                    <p className="lg:text-4xl md:text-3xl sm:text-2xl text-lg">Welcome {session?.user?.name}</p>
                </div>
            </div>
            <div className=" md:px-20 px-4">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900 py-4 px-12">
                        <div>
                            <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                <span className="sr-only">Action button</span>
                                Action
                                <svg className="w-3 h-3 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            <div id="dropdownAction" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reward</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Promote</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Activate account</a>
                                    </li>
                                </ul>
                                <div className="py-1">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete User</a>
                                </div>
                            </div>
                        </div>
                        <label htmlFor="table-search" className="sr-only">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                            </div>
                            <input type="text" id="table-search-users" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for projects" />
                        </div>
                    </div>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                    </div>
                                </th>
                                <th scope="col" className="px-4 py-3 ">
                                    Project Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Project Description
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Github link
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        {projects.map((project) => (
                            <tbody>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td>
                                        {/* <div className="flex items-center">
                                            <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                        </div> */}
                                    </td>
                                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <img className="w-10 h-10 rounded-full" src={project.image} alt="Jese image" />
                                        <div className="pl-3">
                                            <div className="text-base font-semibold">{project.title}</div>
                                            {/* <div className="font-normal text-gray-500">{session?.user?.email}</div> */}
                                        </div>
                                    </th>
                                    <td className="px-6 py-4 overflow-auto whitespace-nowrap max-w-xs">
                                        {project.description}
                                    </td>
                                    <td className="px-6 py-4 cursor-pointer hover:underline overflow-auto whitespace-nowrap max-w-xs">
                                        <div className="flex items-center">
                                            <a href={project.github}>{project.github}</a>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {approvalStatus[project._id] ? (
                                            <span className={approvalStatus[project._id] === 'Approved' ? 'text-green-500' : 'text-red-500'}>
                                                {approvalStatus[project._id]}!
                                            </span>
                                        ) : (
                                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500">
                                                <div className=" text-sm text-gray-700  border-gray-200 gap-x-16 dark:border-gray-700 flex flex-row gap-0">
                                                    <div>
                                                        <a href="#" onClick={() => Approve_project(project._id)} className="text-white block w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-blue-900">Approve</a>
                                                    </div>
                                                    <div>
                                                        <a href="#" onClick={() => Reject_project(project._id)} className="text-white block w-full bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 hover:from-fuchsia-400 hover:to-indigo-800 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-6 py-2.5 text-center dark:focus:ring-blue-900">Reject</a>
                                                    </div>
                                                </div>
                                            </a>
                                        )}
                                    </td>

                                </tr>
                                <tr>
                                </tr>
                            </tbody>


                        ))}
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Admin;