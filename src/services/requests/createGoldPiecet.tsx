import { GoldPieces } from "@/types/EffortsTypes";

const createGoldPiece = async (gold_piece: any): Promise<Response> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/gold_pieces`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gold_piece),
        })
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al crear La pieza de oro');
        }

        return response;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('No se pudo crear la pieza de oro: ' + error.message);
        }
        throw new Error('Ocurrió un error desconocido');
    }
}

export default createGoldPiece;