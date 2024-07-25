import servicesWrapper from "./servicesWrapper";

const serverURL = import.meta.env.VITE_SERVER_URL;

export const getAssessment = servicesWrapper(async (id) => {
    const response = await fetch(`${serverURL}/api/assessments/${id}`);
    const result = await response.json();
    if (result.ok) {
        return { data: result.data };
    } else {
        return { error: result.error };
    }
});

export const editAssessment = servicesWrapper(async (id, assessment) => {
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(assessment),
        credentials: "include",
    };
    const response = await fetch(`${serverURL}/api/assessments/${id}`, options);

    const result = await response.json();
    if (result.ok) {
        return { data: result.data };
    } else {
        return { error: result.error };
    }
});

export const createAssessment = servicesWrapper(async (assessment) => {
    const options = {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(assessment),
        credentials: "include",
    };
    const response = await fetch(`${serverURL}/api/assessments`, options);

    const result = await response.json();
    if (result.ok) {
        return { data: result.data };
    } else {
        return { error: result.error };
    }
});

export const deleteAssessment = servicesWrapper(async (id) => {
    const options = {
        method: "delete",
        credentials: "include",
    };
    const response = await fetch(`${serverURL}/api/assessments/${id}`, options);
    if (response.ok) {
        return { data: null };
    } else {
        const result = await response.json();
        return { error: result.error };
    }
});
