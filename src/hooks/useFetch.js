import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

export default function useFetch(endpoint, withCredentials = false) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const getData = async () => {
            try {
                const resp = await axiosInstance(endpoint, { withCredentials });
                const status = resp.status;
                if (status >= 400 && status < 500) {
                    return setError(resp.data.error);
                }
                setData(resp.data.data);
            } catch (err) {
                setError("Something went wrong!");
            } finally {
                setLoading(false);
            }
        };

        getData();

        return () => {
            setLoading(true);
            setError("");
            setData(null);
        };
    }, [endpoint, withCredentials]);

    return { loading, data, error };
}
