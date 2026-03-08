export const getErrorMessage = (error: any, fallback: string = 'Something went wrong'): string => {
    // Check if it's an Axios error with a backend-provided message
    if (error.response?.data?.error?.message) {
        return error.response.data.error.message;
    }

    // Check for standard error message
    if (error.message) {
        return error.message;
    }

    return fallback;
};
