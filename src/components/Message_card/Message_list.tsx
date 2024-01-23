/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import { Message } from "@/types/message";

const Message_list = ({ name, email, message }: Message) => {
    return (
        <div className="focus:outline-none card rounded-2xl p-6 shadow">
            <div className="flex items-center dark:border-gray-700  pb-6">
                <img
                    src="https://cdn.tuk.dev/assets/components/misc/doge-coin.png"
                    alt="coin avatar"
                    className="w-12 h-12 rounded-full"
                />
                <div className="flex items-start justify-between w-full">
                    <div className="pl-3 w-full">
                        <p
                            tabIndex={0}
                            className="focus:outline-none text-2xl font-medium leading-5 text-gray-800 dark:text-white "
                        >
                            {name}
                        </p>
                        <p
                            tabIndex={0}
                            className="focus:outline-none text-sm leading-normal pt-2 text-gray-500 dark:text-gray-500 "
                        >
                            {email}
                        </p>
                    </div>
                </div>
            </div>
            <div className="px-2">
                <p className="focus:outline-none text-sm leading-5 py-4 text-gray-500 dark:text-gray-400 ">
                    {message}
                </p>
            </div>
        </div>
    );
};

export default Message_list;
