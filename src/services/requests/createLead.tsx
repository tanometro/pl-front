import { LeadPostInterface } from '@/types/LeadsTypes';

const createLead = async (lead: LeadPostInterface): Promise<Response> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/leads`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(lead),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al crear el lead');
        }

        return response;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error('No se pudo crear el lead: ' + error.message);
        }
        throw new Error('Ocurrió un error desconocido');
    }
}

export default createLead;

