import toast from "react-hot-toast";

export const sendConfirmation = async (data) => {
    try {
        const response = await fetch("/api/confirm", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            toast.success("Email Sent Successfully!!");
        } else {
            // If the response status is not okay, throw an error
            throw new Error(`Error sending confirmation: ${response.status} ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        // Display a toast for the caught error
        toast.error(`Error sending confirmation: ${error.message}`);
        // Rethrow the error for further handling or logging
        throw error;
    }
};
