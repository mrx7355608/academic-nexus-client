import { create } from "zustand";

const useAssessments = create((set) => ({
    assessments: [],
    setAssessments: (data) => set({ assessments: data }),
    removeAssessment: (id) =>
        set((state) => ({
            assessments: state.assessments.filter((a) => a._id !== id),
        })),
}));

export default useAssessments;
