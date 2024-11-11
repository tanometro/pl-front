const deleteLoan = async (loan_id: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/loans/${loan_id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al eliminar el lead");
        }
        return true;
    } catch (error) {
        console.error("Error al eliminar el lead:", error);
        return false;
    }
}

export default deleteLoan;
