const patchClient = async (id: string, updatedClientData: any) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/clients/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedClientData),
      });
  
      if (!response.ok) {
        throw new Error('Error al guardar los cambios');
      }
  
      alert('Cambios guardados exitosamente!');
    } catch (error) {
      console.error(error);
      alert('Hubo un problema al guardar los cambios');
    }
  };
  export default patchClient