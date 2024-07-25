import { useParams, useSearchParams } from "react-router-dom";
import AssessmentsContainer from "../components/AssessmentsContainer";

export default function SubAssessmentsPage() {
    const { type } = useParams();
    const [sp, setSp] = useSearchParams();

    return (
        <AssessmentsContainer
            endpoint={`/api/assessments/my/${type}?${sp.toString()}`}
            credentials={true}
        />
    );
}
