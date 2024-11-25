import { UserPostInterface } from "@/types/AuthInterface"

const createUser = async (user: UserPostInterface): Promise<Response> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al crear el lead');
        }

        return response;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('No se pudo crear el Usuario: ' + error.message);
        }
        throw new Error('Ocurrió un error desconocido');
    }
}

export default createUser;