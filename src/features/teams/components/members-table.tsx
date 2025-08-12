/* eslint-disable @next/next/no-img-element */
"use client";

import {
    Table,
    TableBody,
    TableHeader,
    TableItem,
    TableRow,
} from "@/components/ui/Table";
import { ArrowSwapVertical, Slash, TickCircle } from "iconsax-reactjs";
import Image from "next/image";

function MembersTable() {
    return (
        <div className="w-full overflow-x-auto text-sm">
            <Table>
                {/* Header */}
                <TableHeader>
                    {[
                        "Member name",
                        "Title",
                        "Project",
                        "Member Document",
                        "Status",
                    ].map((label, i) => (
                        <TableItem
                            key={label}
                            className={i === 4 ? "w-[180px]" : ""}
                        >
                            {label}
                            <ArrowSwapVertical
                                size={12}
                                className="ml-1 text-gray-500 dark:text-gray-300"
                            />
                        </TableItem>
                    ))}
                </TableHeader>

                <TableBody>
                    {[
                        {
                            avatar: "/assets/profile.png",
                            name: "James Brown",
                            email: "james@example.com",
                            title: "Marketing manager",
                            since: "Since Aug, 2020",
                            projectLogo: "/assets/logos/loom.svg",
                            projectName: "Loom",
                            projectDesc: "Data analysis",
                            doc: "brown-james.pdf",
                            size: "2.3 MB",
                            status: "active",
                        },
                        {
                            avatar: "/assets/profile.png",
                            name: "Sophia Williams",
                            email: "sophia@example.com",
                            title: "HR Assistant",
                            since: "Since Oct, 2023",
                            projectLogo: "/assets/logos/slack.svg",
                            projectName: "Slack",
                            projectDesc: "Team management",
                            doc: "sophia-williams.pdf",
                            size: "1.2 MB",
                            status: "absent",
                        },
                        {
                            avatar: "/assets/profile.png",
                            name: "Arthur Taylor",
                            email: "arthur@example.com",
                            title: "Entrepreneur / CEO",
                            since: "Since Dec, 2018",
                            projectLogo: "/assets/logos/sketch.svg",
                            projectName: "Sketch",
                            projectDesc: "Vision & Goal setting",
                            doc: "arthur-taylor.pdf",
                            size: "2.8 MB",
                            status: "active",
                        },
                    ].map(
                        (
                            {
                                avatar,
                                name,
                                email,
                                title,
                                since,
                                projectLogo,
                                projectName,
                                projectDesc,
                                doc,
                                size,
                                status,
                            },
                            i
                        ) => (
                            <TableRow key={i}>
                                {/* Member Name */}
                                <TableItem>
                                    <img
                                        src="/assets/test.webp"
                                        alt={name}
                                        width={32}
                                        height={32}
                                        className="w-8 rounded-full"
                                    />
                                    <div>
                                        <p className="text-gray-800 dark:text-white font-medium">
                                            {name}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {email}
                                        </p>
                                    </div>
                                </TableItem>

                                {/* Title */}
                                <TableItem>
                                    <div>
                                        <p className="text-gray-800 dark:text-white font-medium">
                                            {title}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {since}
                                        </p>
                                    </div>
                                </TableItem>

                                {/* Project */}
                                <TableItem>
                                    <div className="rounded-full p-1.5 border border-gray-300 dark:border-gray-600 shrink-0 bg-white dark:bg-gray-900">
                                        <Image
                                            src={projectLogo}
                                            alt={projectName}
                                            width={24}
                                            height={24}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-gray-800 dark:text-white font-medium">
                                            {projectName}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {projectDesc}
                                        </p>
                                    </div>
                                </TableItem>

                                {/* Document */}
                                <TableItem>
                                    <Image
                                        src="/assets/icons/pdfIcon.svg"
                                        alt="pdf"
                                        width={32}
                                        height={32}
                                    />
                                    <div>
                                        <p className="text-gray-800 dark:text-white font-medium">
                                            {doc}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {size}
                                        </p>
                                    </div>
                                </TableItem>

                                {/* Status */}
                                <TableItem className="justify-between w-[180px]">
                                    <div className="flex items-center gap-1 border rounded-full p-1 border-gray-300 dark:border-gray-600">
                                        {status === "active" ? (
                                            <>
                                                <TickCircle
                                                    size={16}
                                                    variant="Bold"
                                                    className="text-emerald-500"
                                                />
                                                <p className="text-xs text-gray-700 dark:text-gray-200">
                                                    Active
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <Slash
                                                    size={16}
                                                    variant="Bold"
                                                    className="text-gray-400 dark:text-gray-500"
                                                />
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Absent
                                                </p>
                                            </>
                                        )}
                                    </div>
                                    <button className="hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded-md transition">
                                        <Image
                                            src="/assets/icons/more.svg"
                                            width={18}
                                            height={18}
                                            alt="options"
                                        />
                                    </button>
                                </TableItem>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default MembersTable;
