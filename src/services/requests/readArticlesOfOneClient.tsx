const readArticlesOfOneClient = async (client_id: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/articles/byClientID/${client_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || 'Error al solicitar los Articulos')
        }

        const data = await response.json();
        return data;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error('No se pudieron Recuperar los datos de los Articulos')
        }
        throw new Error('Ocurrio un error desconocido')
    }
}

export default readArticlesOfOneClient