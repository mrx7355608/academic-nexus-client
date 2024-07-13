import { create } from "zustand";

const useUser = create((set) => ({
    user: null,
    setUser: (loggedInUser) => set({ user: loggedInUser }),
}));

export default useUser;
