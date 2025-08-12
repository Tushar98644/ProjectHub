"use client";

import {
    PageNavbarIconButton,
    PageNavbarLeftContent,
    PageNavbarRightContent,
} from "@/components/layout/navbar/page-navbar";
import { Add, Notification, SearchNormal1, Setting4 } from "iconsax-reactjs";
import PageContent from "@/components/layout/navbar/page-content";
import Tabs from "@/features/integrations/components/tabs";
import IntegrationsList from "@/features/integrations/components/integrations-list";
import Navbar from "@/components/layout/navbar/navbar";
import { PrimaryButton } from "@/components/ui/Buttons";

const Integrations = () => {
    return (
        <div>
            <Navbar>
                <PageNavbarLeftContent>
                    <div className="border border-gray-300 dark:border-gray-600 rounded-full w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-800 transition-colors">
                        {" "}
                        {/* ✅ Added proper centering */}
                        <Setting4
                            size={18}
                            className="text-gray-700 dark:text-gray-200"
                        />
                    </div>
                    <div>
                        <h1 className="text-sm font-semibold text-gray-800 dark:text-white">
                            Integrations
                        </h1>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            Manage your integrations to enhance workflow
                        </p>
                    </div>
                </PageNavbarLeftContent>

                <PageNavbarRightContent>
                    <PageNavbarIconButton className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <SearchNormal1
                            size={16}
                            className="text-gray-700 dark:text-gray-200"
                        />
                    </PageNavbarIconButton>
                    <PageNavbarIconButton className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Notification
                            size={16}
                            className="text-gray-700 dark:text-gray-200"
                        />
                    </PageNavbarIconButton>
                    <PrimaryButton className="flex items-center gap-2">
                        {" "}
                        <Add size={16} />
                        <span className="hidden md:inline">
                            Add integration
                        </span>
                    </PrimaryButton>
                </PageNavbarRightContent>
            </Navbar>

            <PageContent>
                <div className="flex items-center justify-between">
                    <Tabs
                        minWidth={300}
                        option1="All apps"
                        option2="Connected"
                        option3="Disconnected"
                    />
                </div>

                {/* Header Section */}
                <div className="space-y-2">
                    {" "}
                    <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Available integrations
                    </h1>{" "}
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {" "}
                        Access the integrated tools and apps ready for your HR
                        tasks
                    </p>
                </div>
                <IntegrationsList />
            </PageContent>
        </div>
    );
};

export default Integrations;
