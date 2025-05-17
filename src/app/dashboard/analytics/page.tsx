"use client";

import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { DashLayout } from "@/components/Layout/Layout";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Analytics = () => {
    const barData = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                label: "Monthly Sales",
                data: [300, 200, 400, 500, 450, 600],
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const lineData = {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [
            {
                label: "Active Users",
                data: [1500, 1700, 1800, 2000],
                fill: false,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
            },
        ],
    };

    return (
        <DashLayout>
            <div className="p-4 space-y-6 md:w-[65vw]">
                <h2 className="text-2xl font-bold text-center">Analytics Overview</h2>

                <div className="flex flex-col gap-6">
                    <div className="bg-transparent shadow-lg p-4 rounded-lg">
                        <h3 className="text-lg font-semibold">Monthly Sales</h3>
                        <Bar data={barData} />
                    </div>

                    <div className="bg-transparent shadow-lg p-4 rounded-lg">
                        <h3 className="text-lg font-semibold">Weekly Active Users</h3>
                        <Line data={lineData} />
                    </div>
                </div>
            </div>
        </DashLayout>
    );
};

export default Analytics;