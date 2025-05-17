"use client";

import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from "chart.js";
import { DashLayout } from "@/components/Layout/Layout";
import { FaProjectDiagram, FaUsers, FaEye, FaCheckCircle, FaTasks, FaComments } from "react-icons/fa";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const getRandomData = (count: number, min: number, max: number) =>
    Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);

const Analytics = () => {
    const commonChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: '#cbd5e1',
                    font: {
                        size: 12,
                    }
                }
            },
            title: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(30, 41, 59, 0.9)',
                titleColor: '#94a3b8',
                bodyColor: '#e2e8f0',
                borderColor: '#334155',
                borderWidth: 1,
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#94a3b8',
                    font: {
                        size: 10,
                    }
                },
                grid: {
                    color: 'rgba(51, 65, 85, 0.5)',
                }
            },
            y: {
                ticks: {
                    color: '#94a3b8',
                    font: {
                        size: 10,
                    }
                },
                grid: {
                    color: 'rgba(51, 65, 85, 0.5)',
                },
                beginAtZero: true
            }
        }
    };

    const projectSubmissionsData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
        datasets: [
            {
                label: "New Projects Submitted",
                data: getRandomData(8, 5, 30),
                backgroundColor: "rgba(59, 130, 246, 0.7)",
                borderColor: "rgba(59, 130, 246, 1)",
                borderWidth: 1,
                borderRadius: 4,
                hoverBackgroundColor: "rgba(59, 130, 246, 0.9)",
            },
        ],
    };

    const activeUsersData = {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
        datasets: [
            {
                label: "Weekly Active Users",
                data: getRandomData(6, 1200, 2500),
                fill: true,
                backgroundColor: "rgba(16, 185, 129, 0.2)",
                borderColor: "rgba(16, 185, 129, 1)",
                tension: 0.3,
                pointBackgroundColor: "rgba(16, 185, 129, 1)",
                pointBorderColor: "#fff",
                pointHoverRadius: 7,
            },
        ],
    };

    const projectStatusData = {
        labels: ["Approved", "Pending", "Rejected"],
        datasets: [
            {
                label: "Project Status Distribution",
                data: [getRandomData(1, 50, 150)[0], getRandomData(1, 10, 40)[0], getRandomData(1, 5, 20)[0]],
                backgroundColor: [
                    "rgba(16, 185, 129, 0.7)",
                    "rgba(245, 158, 11, 0.7)",
                    "rgba(239, 68, 68, 0.7)",
                ],
                borderColor: [
                    "rgba(16, 185, 129, 1)",
                    "rgba(245, 158, 11, 1)",
                    "rgba(239, 68, 68, 1)",
                ],
                borderWidth: 1,
                hoverOffset: 8,
            },
        ],
    };

    const keyMetrics = [
        { id: 1, label: "Total Projects", value: "238", icon: <FaProjectDiagram className="text-sky-400" />, trend: "+5% last month" },
        { id: 2, label: "Active Users (Today)", value: "1.2K", icon: <FaUsers className="text-emerald-400" />, trend: "+120 today" },
        { id: 3, label: "Projects Awaiting Approval", value: "15", icon: <FaTasks className="text-amber-400" />, trend: "High priority" },
        { id: 4, label: "Total Discussions", value: "780", icon: <FaComments className="text-purple-400" />, trend: "+20 new" },
    ];

    const StatCard: React.FC<{ metric: typeof keyMetrics[0] }> = ({ metric }) => (
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg flex flex-col justify-between hover:shadow-sky-500/20 transition-shadow duration-300">
            <div>
                <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-slate-400">{metric.label}</p>
                    <span className="text-2xl">{metric.icon}</span>
                </div>
                <p className="text-3xl font-bold text-slate-100 mb-2">{metric.value}</p>
            </div>
            <p className="text-xs text-slate-500">{metric.trend}</p>
        </div>
    );

    return (
        <DashLayout>
            <div className="container mx-auto px-4 py-8 text-slate-200">
                <header className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-sky-400">
                        Platform Analytics
                    </h1>
                    <p className="text-slate-400 mt-1">Overview of ProjectHub activity and engagement.</p>
                </header>

                {/* Key Metrics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {keyMetrics.map(metric => (
                        <StatCard key={metric.id} metric={metric} />
                    ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Project Submissions Chart */}
                    <div className="bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-sky-500/20 transition-shadow duration-300">
                        <h3 className="text-xl font-semibold text-slate-100 mb-4">New Project Submissions</h3>
                        <div className="h-72 md:h-80">
                            <Bar data={projectSubmissionsData} options={commonChartOptions as any} />
                        </div>
                    </div>

                    {/* Active Users Chart */}
                    <div className="bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-shadow duration-300">
                        <h3 className="text-xl font-semibold text-slate-100 mb-4">Weekly Active Users</h3>
                        <div className="h-72 md:h-80">
                            <Line data={activeUsersData} options={commonChartOptions as any} />
                        </div>
                    </div>

                    {/* Project Status Distribution (Doughnut Chart) */}
                    <div className="bg-slate-800 p-6 rounded-xl shadow-lg lg:col-span-1 hover:shadow-amber-500/20 transition-shadow duration-300">
                        <h3 className="text-xl font-semibold text-slate-100 mb-4">Project Status Distribution</h3>
                        <div className="h-72 md:h-80 flex justify-center items-center">
                            <Doughnut data={projectStatusData} options={{ ...commonChartOptions, maintainAspectRatio: false } as any} />
                        </div>
                    </div>

                    {/* Placeholder for Top Performing Projects */}
                    <div className="bg-slate-800 p-6 rounded-xl shadow-lg lg:col-span-1 hover:shadow-purple-500/20 transition-shadow duration-300">
                        <h3 className="text-xl font-semibold text-slate-100 mb-4">Top Performing Projects</h3>
                        <div className="space-y-3 text-sm text-slate-300">
                            <p>1. AI Powered Code Reviewer - 1.2k Views, 80 Discussions</p>
                            <p>2. Decentralized Social Network - 980 Views, 65 Discussions</p>
                            <p>3. Eco-Friendly Smart Home System - 750 Views, 40 Discussions</p>
                            <p className="text-xs text-slate-500 mt-4">(Data based on views and discussion activity - conceptual)</p>
                        </div>
                    </div>
                </div>
            </div>
        </DashLayout>
    );
};

export default Analytics;