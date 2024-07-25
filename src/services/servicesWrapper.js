export default function servicesWrapper(service) {
    return async (...args) => {
        try {
            const data = await service(...args);
            return data;
        } catch (err) {
            return { error: "An-unexpected error occurred" };
        }
    };
}
