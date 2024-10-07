/* eslint-disable @next/next/no-img-element */
'use client'
import { DashLayout } from "@/components/Layout/Layout";
import { useSession } from "next-auth/react";

const Profile = () => {
    const { data:session } = useSession(); 
    const image = session?.user?.image || 'https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar1.jpg';
    return (
        <DashLayout>
            <div className="ml-20 mt-40 relative flex flex-col w-full min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 draggable">
                <div className="px-9 pt-9 flex-auto min-h-[70px] pb-0 bg-transparent">
                    <div className="flex flex-wrap mb-6 xl:flex-nowrap">
                        <div className="mb-5 mr-5">
                            <div className="relative inline-block shrink-0 rounded-2xl">
                                <img className="inline-block shrink-0 rounded-2xl w-[80px] h-[80px] lg:w-[160px] lg:h-[160px]" src={image} alt="image" />
                                <div className="group/tooltip relative">
                                    <span className="w-[15px] h-[15px] absolute bg-success rounded-full bottom-0 end-0 -mb-1 -mr-2  border border-white"></span>
                                    <span className="text-xs absolute z-10 transition-opacity duration-300 ease-in-out px-3 py-2 whitespace-nowrap text-center transform bg-white rounded-2xl shadow-sm bottom-0 -mb-2 start-full ml-4 font-medium text-secondary-inverse group-hover/tooltip:opacity-100 opacity-0 block"> Status: Active </span>
                                </div>
                            </div>
                        </div>
                        <div className="grow">
                            <div className="flex flex-wrap items-start justify-between mb-2">
                                <div className="flex flex-col">
                                    <div className="flex items-center mb-2">
                                        <a className="text-secondary-inverse hover:text-primary transition-colors duration-200 ease-in-out font-semibold text-[1.5rem] mr-1" href="javascript:void(0)"> {session?.user?.name} </a>
                                    </div>
                                    <div className="flex flex-wrap pr-2 mb-4 font-medium">
                                        <a className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-primary" href="javascript:void(0)">
                                            <span className="mr-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                    <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                                                </svg>
                                            </span> New York, NY </a>
                                        <a className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-primary" href="javascript:void(0)">
                                            <span className="mr-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                                                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                                                </svg>
                                            </span> {session?.user?.email} </a>
                                    </div>
                                </div>
                                <div className="flex flex-wrap my-auto">
                                    <a href="javascript:void(0)" className="inline-block px-6 py-3 mr-3 text-base font-medium leading-normal text-center align-middle transition-colors duration-150 ease-in-out border-0 shadow-none cursor-pointer rounded-2xl text-muted bg-light border-light hover:bg-light-dark active:bg-light-dark focus:bg-light-dark "> Follow </a>
                                    <a href="javascript:void(0)" className="inline-block px-6 py-3 text-base font-medium leading-normal text-center text-white align-middle transition-colors duration-150 ease-in-out border-0 shadow-none cursor-pointer rounded-2xl bg-primary hover:bg-primary-dark active:bg-primary-dark focus:bg-primary-dark "> Hire </a>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-between">
                                <div className="flex flex-wrap items-center">
                                    <a href="javascript:void(0)" className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full opacity-50 bg-gray-800 hover:bg-gray-700 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal"> 320 Following </a>
                                    <a href="javascript:void(0)" className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-gray-700 hover:bg-gray-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal"> 2.5k Followers </a>
                                    <a href="javascript:void(0)" className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-gray-700 hover:bg-gray-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal"> 48 Deals </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="w-full h-px border-neutral-200"/>
                        <ul nav-tabs className="group flex flex-wrap items-stretch text-[1.15rem] font-semibold list-none border-b-2 border-transparent border-solid active-assignments">
                            <li className="flex mt-2 -mb-[2px]">
                                <a aria-controls="summary" className="py-5 mr-1 sm:mr-3 lg:mr-10 transition-colors duration-200 ease-in-out border-b-2 border-transparent group-[.active-summary]:border-primary group-[.active-summary]:text-primary text-muted hover:border-primary" href="javascript:void(0)"> Summary </a>
                            </li>
                            <li className="flex mt-2 -mb-[2px]">
                                <a aria-controls="assignments" className="py-5 mr-1 sm:mr-3 lg:mr-10 transition-colors duration-200 ease-in-out border-b-2 border-transparent group-[.active-assignments]:border-primary group-[.active-assignments]:text-primary text-muted hover:border-primary" href="javascript:void(0)"> Assignments </a>
                            </li>
                            <li className="flex mt-2 -mb-[2px]">
                                <a aria-controls="marketing" className="py-5 mr-1 sm:mr-3 lg:mr-10 transition-colors duration-200 ease-in-out border-b-2 border-transparent group-[.active-marketing]:border-primary group-[.active-marketing]:text-primary text-muted hover:border-primary" href="javascript:void(0)"> Marketing </a>
                            </li>
                            <li className="flex mt-2 -mb-[2px]">
                                <a aria-controls="followers" className="py-5 mr-1 sm:mr-3 lg:mr-10 transition-colors duration-200 ease-in-out border-b-2 border-transparent group-[.active-followers]:border-primary group-[.active-followers]:text-primary text-muted hover:border-primary" href="javascript:void(0)"> Followers </a>
                            </li>
                            <li className="flex mt-2 -mb-[2px] group">
                                <a aria-controls="history" className="py-5 mr-1 sm:mr-3 lg:mr-10 transition-colors duration-200 ease-in-out border-b-2 border-transparent group-[.active-history]:border-primary group-[.active-history]:text-primary text-muted hover:border-primary" href="javascript:void(0)"> History </a>
                            </li>
                        </ul>
                </div>
            </div>
        </DashLayout>
    );
};

export default Profile;