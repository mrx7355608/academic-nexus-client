import { useEffect, useState } from "react";

export default function useFetch(endpoint, credentials = false) {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const url = `${import.meta.env.VITE_SERVER_URL}${endpoint}`;
        const options = {};
        if (credentials) options.credentials = "include";

        fetch(url, options)
            .then(async (resp) => {
                if (resp.ok) {
                    return resp.json();
                }

                const r = await resp.json();
                throw new Error(r.error);
            })
            .then(({ data }) => setResult(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));

        return () => {
            setLoading(true);
            setError("");
            setResult(null);
        };
    }, [endpoint, credentials]);

    return { loading, result, error };
}
