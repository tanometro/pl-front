const assignLead = async (lead_id: string, updatedLeadData: any) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/leads/assignLead/${lead_id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedLeadData)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al Asignar el lead");
        }
        return response
    } catch (error) {
        if (error instanceof Error) {
            console.log(error)
            throw new Error('No se pudo asignar el lead: ' + error.message);
        }
        throw new Error('Ocurrió un error desconocido');
    }
}

export default assignLead;
