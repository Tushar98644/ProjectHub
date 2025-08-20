import { useEffect, useState } from "react";

export const useDebounced = <T>(value: T, delay = 300) => {
    const [v, setV] = useState(value);
    useEffect(() => {
        const id = setTimeout(() => setV(value), delay);
        return () => clearTimeout(id);
    }, [value, delay]);
    return v;
};
