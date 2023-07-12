/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import { Message } from "@/types/Message";

const Message_list = ({ name, email, message }: Message) => {
    return (
                <div className="focus:outline-none card rounded-2xl p-6 shadow">
                    <div className="flex items-center dark:border-gray-700  pb-6">
                        <img src="https://cdn.tuk.dev/assets/components/misc/doge-coin.png" alt="coin avatar" className="w-12 h-12 rounded-full" />
                        <div className="flex items-start justify-between w-full">
                            <div className="pl-3 w-full">
                                <p tabIndex={0} className="focus:outline-none text-2xl font-medium leading-5 text-gray-800 dark:text-white ">{name}</p>
                                <p tabIndex={0} className="focus:outline-none text-sm leading-normal pt-2 text-gray-500 dark:text-gray-500 ">{email}</p>
                            </div>
                            {/* <div role="img" aria-label="bookmark">
                                <svg className="focus:outline-none dark:text-white text-gray-800" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.5001 4.66667H17.5001C18.1189 4.66667 18.7124 4.9125 19.15 5.35009C19.5876 5.78767 19.8334 6.38117 19.8334 7V23.3333L14.0001 19.8333L8.16675 23.3333V7C8.16675 6.38117 8.41258 5.78767 8.85017 5.35009C9.28775 4.9125 9.88124 4.66667 10.5001 4.66667Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div> */}
                        </div>
                    </div>
                    <div className="px-2">
                        <p className="focus:outline-none text-sm leading-5 py-4 text-gray-500 dark:text-gray-400 ">{message}</p>
                    </div>
                </div>
    );
}

export default Message_list;