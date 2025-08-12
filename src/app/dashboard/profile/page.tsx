"use client";

import Navbar from "@/components/layout/navbar/navbar";
import PageContent from "@/components/layout/navbar/page-content";
import {
    PageNavbarLeftContent,
    PageNavbarRightContent,
    PageNavbarIconButton,
} from "@/components/layout/navbar/page-navbar";
import { PrimaryButton } from "@/components/ui/Buttons";
import { Setting4, SearchNormal1, Add, Notification } from "iconsax-reactjs";

export default function ProfileViewPage() {
    return (
        <div className="flex w-full flex-col">
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
                        {/* ✅ Added flex styling */}
                        <Add size={16} />
                        <span className="hidden md:inline">
                            Add integration
                        </span>
                    </PrimaryButton>
                </PageNavbarRightContent>
            </Navbar>
            <PageContent>
                hi
                {/* <UserProfile /> */}
            </PageContent>
        </div>
    );
}
