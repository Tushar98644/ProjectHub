"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form>
            <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                    <Button type="button" variant="outline" className="w-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12 0C5.373 0 0 5.373 0 12c0 5.304 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577 0-.287-.011-1.045-.016-2.052-3.338.724-4.042-1.607-4.042-1.607-.546-1.384-1.333-1.754-1.333-1.754-1.089-.743.083-.728.083-.728 1.205.085 1.838 1.237 1.838 1.237 1.07 1.831 2.805 1.303 3.49.996.108-.775.419-1.303.763-1.603-2.665-.303-5.466-1.333-5.466-5.933 0-1.313.469-2.386 1.236-3.22-.124-.303-.536-1.53.117-3.185 0 0 1.008-.322 3.303 1.23.957-.266 1.986-.399 3.006-.404 1.02.005 2.049.138 3.006.404 2.295-1.552 3.303-1.23 3.303-1.23.653 1.655.241 2.882.118 3.185.769.834 1.236 1.907 1.236 3.22 0 4.607-2.805 5.63-5.475 5.925.43.371.815 1.102.815 2.222 0 1.606-.014 2.91-.014 3.303 0 .316.192.693.798.577C20.565 21.8 24 17.304 24 12c0-6.627-5.373-12-12-12z"
                                fill="currentColor"
                            />
                        </svg>
                        Login with Github
                    </Button>
                    <Button variant="outline" className="w-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                fill="currentColor"
                            />
                        </svg>
                        Login with Google
                    </Button>
                </div>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-card text-muted-foreground relative z-10 px-2">
                        Or continue with
                    </span>
                </div>
                <div className="grid gap-6">
                    <div className="grid gap-3">
                        <label htmlFor="email" className="text-sm">
                            Email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-3">
                        <label htmlFor="password" className="text-sm">
                            Password
                        </label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </div>
                <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <a href="#" className="underline underline-offset-4">
                        Sign up
                    </a>
                </div>
            </div>
        </form>
    );
};
