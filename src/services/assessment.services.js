import servicesWrapper from "./servicesWrapper";

export const getAssessment = servicesWrapper(async (id) => {
    const response = await fetch(`/api/files/${id}`);
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
    const response = await fetch(`/api/files/${id}`, options);

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
    const response = await fetch(`/api/files`, options);

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
    const response = await fetch(`/api/files/${id}`, options);
    if (response.ok) {
        return { data: null };
    } else {
        const result = await response.json();
        return { error: result.error };
    }
});

export const upvoteAssessment = servicesWrapper(async (id) => {
    const options = {
        method: "post",
        credentials: "include",
    };
    const response = await fetch(`/api/files/${id}/upvote`, options);
    const result = await response.json();

    if (response.ok) {
        return { data: result.data };
    } else {
        return { error: result.error };
    }
});

export const downvoteAssessment = servicesWrapper(async (id) => {
    const options = {
        method: "post",
        credentials: "include",
    };
    const response = await fetch(`/api/files/${id}/downvote`, options);
    const result = await response.json();

    if (response.ok) {
        return { data: result.data };
    } else {
        return { error: result.error };
    }
});
