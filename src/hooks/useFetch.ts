import axios from "axios";
import { useEffect, useState } from "react";

interface UseFetchResult<T> {
    data: T | [];
    isLoading: boolean;
    error: string | null;
}

export const useFetch = <T>(url: string): UseFetchResult<T> => {
    const [data, setData] = useState<T | []>([]);
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setisLoading(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            try {
                const res = await axios.get<T>(url, config);
                setData(res.data);
            } catch (err) {
                setError(`Failed to load. Please try again later.`);
            } finally {
                setisLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, isLoading, error };
};
