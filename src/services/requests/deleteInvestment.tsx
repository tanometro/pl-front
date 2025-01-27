const deleteInvestment = async (investment_id: number | undefined) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/investments/${investment_id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al eliminar la Inevrsion");
        }
        return true;
    } catch (error) {
        console.error("Error al eliminar la Inversion:", error);
        return false;
    }
}

export default deleteInvestment;
