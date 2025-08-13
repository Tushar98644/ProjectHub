"use client";

import { useState, useMemo } from "react";
import PageContent from "@/components/layout/navbar/page-content";
import { PageNavbarLeftContent } from "@/components/layout/navbar/page-navbar";
import Navbar from "@/components/layout/navbar/navbar";
import { PrimaryButton } from "@/components/ui/Buttons";
import {
    SearchNormal1,
    Calendar,
    Star1,
    Eye,
    Heart,
    Add,
} from "iconsax-reactjs";
import { CloseCircle, More } from "iconsax-reactjs";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { useProjectFetchQuery } from "@/hooks/queries/useProjectQuery";

export default function ProjectsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState("all");

    const { data: projects = [] } = useProjectFetchQuery();

    const allTags = useMemo(
        () => ["all", ...new Set(projects.flatMap(p => p.tags))],
        [projects]
    );

    const filtered = useMemo(
        () =>
            projects.filter(p => {
                const matchSearch =
                    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.description
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase());
                const matchTag =
                    selectedTag === "all" || p.tags.includes(selectedTag);
                return matchSearch && matchTag;
            }),
        [projects, searchQuery, selectedTag]
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active":
                return "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400";
            case "completed":
                return "bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400";
            case "in-progress":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400";
        }
    };

    const author = "Tushar";
    const authorAvatar = "T";

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            <Navbar>
                <PageNavbarLeftContent>
                    <div>
                        <h1 className="text-sm font-semibold text-gray-800 dark:text-white">
                            Community Projects
                        </h1>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            Discover and explore amazing projects
                        </p>
                    </div>
                </PageNavbarLeftContent>
            </Navbar>

            <PageContent>
                <div className="space-y-4">
                    {/* Top Bar with Add Button */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <h2 className="text-lg font-bold tracking-tight">
                            Discover Projects
                        </h2>

                        <PrimaryButton className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium">
                            <Add size={16} />
                            <span className="hidden md:inline">
                                Add Project
                            </span>
                        </PrimaryButton>
                    </div>

                    {/* Search */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <SearchNormal1
                                size={18}
                                className="text-gray-400 dark:text-gray-500"
                            />
                        </div>
                        <input
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Search projects..."
                            className="focus:outline-none w-full pl-12 pr-12 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-sm"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center"
                            >
                                <CloseCircle size={18} />
                            </button>
                        )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                                    selectedTag === tag
                                        ? "bg-violet-500 text-white"
                                        : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    {/* Projects */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {filtered.map(p => (
                            <div
                                key={p._id}
                                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg dark:hover:shadow-gray-900/25 
                                transition-all duration-300 cursor-pointer group hover:-translate-y-1 shadow-xs"
                            >
                                {/* Image */}
                                <div className="relative h-44 overflow-hidden">
                                    <img
                                        src={p.image}
                                        alt={p.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-3 right-3">
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                                                p?.status || ""
                                            )}`}
                                        >
                                            {p?.status || ""}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-sm font-semibold truncate">
                                            {p.title}
                                        </h3>
                                        {/* More Actions Popover */}
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                                                    <More
                                                        size={16}
                                                        className="text-gray-400 dark:text-gray-500"
                                                    />
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                align="end"
                                                className="w-40 p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
                                            >
                                                <button className="w-full text-left px-3 py-2 text-xs rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                                                    View Project
                                                </button>
                                                <button className="w-full text-left px-3 py-2 text-xs rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                                                    Delete
                                                </button>
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                                        {p.description}
                                    </p>

                                    {/* Tags */}
                                    {p.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mb-4">
                                            {p.tags.slice(0, 2).map(tag => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 
                                                     text-xs rounded-md"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {p.tags.length > 2 && (
                                                <span className="px-2 py-1 text-gray-500 dark:text-gray-500 text-xs">
                                                    +{p.tags.length - 2}
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* Stats */}
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <div className="flex gap-3">
                                            <span className="flex items-center gap-1">
                                                <Star1 size={12} /> {p.stars}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Eye size={12} /> {p.views}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Heart size={12} /> {p.likes}
                                            </span>
                                        </div>
                                        <span className="flex items-center gap-1">
                                            <Calendar size={12} />{" "}
                                            {p.lastUpdated}
                                        </span>
                                    </div>

                                    <div className="flex my-2 items-center gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                                        <div className="w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                                            {authorAvatar}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-medium text-gray-800 dark:text-white truncate">
                                                {author}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </PageContent>
        </div>
    );
}
