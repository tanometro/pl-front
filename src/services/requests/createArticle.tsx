const createArticle = async (article: any): Promise<Response> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/articles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(article),
        })
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al crear el Articulo');
        }

        return response;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('No se pudo crear el Articulo: ' + error.message);
        }
        throw new Error('Ocurrió un error desconocido');
    }
}

export default createArticle;