import { useEffect, useState } from "react";
import mammoth from "mammoth";

export default function DocxViewer({ id }) {
    const [content, setContent] = useState("");

    useEffect(() => {
        const fetchAndConvertDocx = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_SERVER_URL}/api/assessments/view-assessment-file/${id}`,
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const arrayBuffer = await response.arrayBuffer();
                const result = await mammoth.convertToHtml({ arrayBuffer });

                setContent(result.value);
            } catch (error) {
                console.error("Error fetching or converting document:", error);
            }
        };

        fetchAndConvertDocx();
    }, [id]);

    return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
}
