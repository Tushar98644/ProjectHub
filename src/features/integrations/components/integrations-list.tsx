import React from "react";
import Image from "next/image";
import ToggleSwitch from "./toggle-switch";
import { Setting2 } from "iconsax-reactjs";

function IntegrationsList() {
    const integrations = [
        {
            logo: "/assets/logos/msoffice.svg",
            name: "Microsoft Office 365",
            desc: "Seamless document management",
            isActive: true,
        },
        {
            logo: "/assets/logos/zoom.svg",
            name: "Zoom",
            desc: "For conducting virtual meetings and interviews",
            isActive: false,
        },
        {
            logo: "/assets/logos/slack.svg",
            name: "Slack",
            desc: "For team communication and real-time collaboration",
            isActive: false,
        },
        {
            logo: "/assets/logos/github.svg",
            name: "Github",
            desc: "For hosting and managing code",
            isActive: false,
        },
    ];

    return (
        <div className="text-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.map(({ logo, name, desc, isActive }, i) => (
                <div
                    key={name}
                    className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl flex flex-col justify-between p-3 space-y-2 transition-colors"
                >
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="p-2 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-white rounded-md w-9 h-9 flex items-center justify-center">
                                <Image
                                    src={logo}
                                    alt={name}
                                    width={18}
                                    height={18}
                                />
                            </div>
                            <ToggleSwitch isActive={isActive} />
                        </div>
                        <div>
                            <h1 className="text-gray-900 dark:text-white font-semibold">
                                {name}
                            </h1>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {desc}
                            </p>
                        </div>
                    </div>
                    <button className="flex text-xs group text-gray-700 dark:text-gray-200 font-medium rounded-lg w-full items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-2 py-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Setting2
                            size={16}
                            className="group-hover:rotate-90 duration-300 text-violet-500 dark:text-violet-400"
                        />
                        <span>Manage</span>
                    </button>
                </div>
            ))}
        </div>
    );
}

export default IntegrationsList;
