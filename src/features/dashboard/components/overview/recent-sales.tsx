import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

const salesData = [
    {
        name: "Olivia Martin",
        email: "olivia.martin@email.com",
        avatar: "https://api.slingacademy.com/public/sample-users/1.png",
        fallback: "OM",
        amount: "+$1,999.00",
    },
    {
        name: "Jackson Lee",
        email: "jackson.lee@email.com",
        avatar: "https://api.slingacademy.com/public/sample-users/2.png",
        fallback: "JL",
        amount: "+$39.00",
    },
    {
        name: "Isabella Nguyen",
        email: "isabella.nguyen@email.com",
        avatar: "https://api.slingacademy.com/public/sample-users/3.png",
        fallback: "IN",
        amount: "+$299.00",
    },
    {
        name: "William Kim",
        email: "will@email.com",
        avatar: "https://api.slingacademy.com/public/sample-users/4.png",
        fallback: "WK",
        amount: "+$99.00",
    },
    {
        name: "Sofia Davis",
        email: "sofia.davis@email.com",
        avatar: "https://api.slingacademy.com/public/sample-users/5.png",
        fallback: "SD",
        amount: "+$39.00",
    },
];

export function RecentSales() {
    return (
        <Card className="h-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
            {" "}
            {/* ✅ Dark mode card */}
            <CardHeader className="bg-white dark:bg-gray-900">
                {" "}
                {/* ✅ Dark mode header */}
                <CardTitle className="text-gray-900 dark:text-gray-100">
                    Recent Sales
                </CardTitle>{" "}
                {/* ✅ Dark mode title */}
                <CardDescription className="text-gray-600 dark:text-gray-400">
                    {" "}
                    {/* ✅ Dark mode description */}
                    You made 265 sales this month.
                </CardDescription>
            </CardHeader>
            <CardContent className="bg-white dark:bg-gray-900">
                {" "}
                {/* ✅ Dark mode content */}
                <div className="space-y-8">
                    {salesData.map((sale, index) => (
                        <div
                            key={index}
                            className="flex items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" // ✅ Added hover state with dark mode
                        >
                            <Avatar className="h-9 w-9 ring-2 ring-gray-200 dark:ring-gray-700">
                                {" "}
                                {/* ✅ Dark mode avatar ring */}
                                <AvatarImage src={sale.avatar} alt="Avatar" />
                                <AvatarFallback className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                                    {" "}
                                    {/* ✅ Dark mode fallback */}
                                    {sale.fallback}
                                </AvatarFallback>
                            </Avatar>
                            <div className="ml-4 space-y-1">
                                <p className="text-sm leading-none font-medium text-gray-900 dark:text-gray-100">
                                    {" "}
                                    {/* ✅ Dark mode name */}
                                    {sale.name}
                                </p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">
                                    {" "}
                                    {/* ✅ Dark mode email */}
                                    {sale.email}
                                </p>
                            </div>
                            <div className="ml-auto font-medium text-green-600 dark:text-green-400">
                                {" "}
                                {/* ✅ Dark mode amount with green color */}
                                {sale.amount}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
