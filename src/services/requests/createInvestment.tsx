const createInvestment = async (investment: any): Promise<Response> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/investments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(investment),
        })
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al crear la Inversion');
        }

        return response;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('No se pudo crear la Inversion: ' + error.message);
        }
        throw new Error('Ocurrió un error desconocido');
    }
}

export default createInvestment;