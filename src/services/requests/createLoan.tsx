const createLoan = async (loan: any): Promise<Response> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/loans`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loan),
        })
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al crear el Prestamo');
        }

        return response;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('No se pudo crear el Prestamo: ' + error.message);
        }
        throw new Error('Ocurrió un error desconocido');
    }
}

export default createLoan;