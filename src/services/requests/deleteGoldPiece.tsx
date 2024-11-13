const deleteGoldPiece = async (goldPiece_id: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/gold_pieces/${goldPiece_id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al eliminar La Pieza de Oro");
        }
        return true;
    } catch (error) {
        console.error("Error al eliminar la Pieza de Oro:", error);
        return false;
    }
}

export default deleteGoldPiece;
