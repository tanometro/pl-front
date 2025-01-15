const patchSeller = async (id: string, updatedSellerData: any) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sellers/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSellerData),
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
  export default patchSeller