"use client";

import {
    PageNavbarIconButton,
    PageNavbarLeftContent,
    PageNavbarRightContent,
} from "@/components/layout/navbar/page-navbar";
import {
    Add,
    ExportCurve,
    Notification,
    Profile,
    SearchNormal1,
} from "iconsax-reactjs";
import PageContent from "@/components/layout/navbar/page-content";
import { PrimaryButton, OutlineButton } from "@/components/ui/Buttons";
import MembersTable from "@/features/teams/components/members-table";
import Navbar from "@/components/layout/navbar/navbar";

function Teams() {
    return (
        <div className="w-full text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-900 min-h-screen transition-colors">
            <Navbar>
                <PageNavbarLeftContent>
                    <div className="border border-gray-300 dark:border-gray-700 rounded-full w-10 h-10 all-center bg-white dark:bg-gray-800">
                        <Profile
                            size={18}
                            className="text-gray-700 dark:text-gray-200"
                        />
                    </div>
                    <div>
                        <h1 className="text-sm font-semibold text-gray-800 dark:text-white">
                            Teams
                        </h1>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            Manage and collaborate within your
                            organization&apos;s teams
                        </p>
                    </div>
                </PageNavbarLeftContent>

                <PageNavbarRightContent>
                    <PageNavbarIconButton className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                        <SearchNormal1
                            size={16}
                            className="text-gray-700 dark:text-gray-200"
                        />
                    </PageNavbarIconButton>
                    <PageNavbarIconButton className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                        <Notification
                            size={16}
                            className="text-gray-700 dark:text-gray-200"
                        />
                    </PageNavbarIconButton>
                </PageNavbarRightContent>
            </Navbar>

            <PageContent>
                {/* Header */}
                <div className="text-sm md:pb-2 flex flex-col md:flex-row gap-2 md:gap-0 items-start md:items-center justify-between">
                    <div>
                        <h1 className="text-gray-800 dark:text-white font-medium">
                            Team Members
                        </h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Display all the team members and essential details
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <OutlineButton>
                            <ExportCurve
                                size={16}
                                className="text-gray-700 dark:text-gray-200"
                            />
                            <span className="hidden md:inline">Export</span>
                        </OutlineButton>
                        <PrimaryButton>
                            <Add size={16} />
                            Invite member
                        </PrimaryButton>
                    </div>
                </div>

                <hr className="border-gray-200 dark:border-gray-700 -mx-4 my-4" />

                {/* Members Table */}
                <MembersTable />
            </PageContent>
        </div>
    );
}

export default Teams;
