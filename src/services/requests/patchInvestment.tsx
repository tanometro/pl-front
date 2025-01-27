const patchInvestment = async (id: number | undefined, body: any) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/investments/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        throw new Error('Error al guardar los cambios');
      }
      return response.json()
    } catch (error) {
      console.error(error);
      alert('Hubo un problema al guardar los cambios');
    }
  };
  export default patchInvestment