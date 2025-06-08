import axios from "axios";
import { useState } from "react";

interface UsePostResult<T> {
    data: T | [];
    isLoading: boolean;
    error: string | null;
}

export const usePost = <T>(url: string, payload?: any): UsePostResult<T> => {
    const [data, setData] = useState<T | []>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async () => {
        const config = {
            "Content-Type": "application/json",
        };

        try {
            const res = await axios.post<T>(url, payload);
            setData(res.data);
        } catch (err) {
            setError("There was an error. Please try again later");
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, error };
};
