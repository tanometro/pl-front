const patchGoldPiece = async (gold_piece_id: string, updatedLeadData: any) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/gold_pieces/${gold_piece_id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedLeadData)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al Editar la pieza de Oro");
        }
        return response
    } catch (error) {
        if (error instanceof Error) {
            console.log(error)
            throw new Error('No se pudo editar la pieza de oro: ' + error.message);
        }
        throw new Error('Ocurrió un error desconocido');
    }
}

export default patchGoldPiece;
