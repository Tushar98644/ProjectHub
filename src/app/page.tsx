"use client";

import { redirect } from "next/navigation";

function Home() {
    redirect("/dashboard/profile");
}

export default Home;
