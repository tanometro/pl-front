const deleteClient = async (id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/clients/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error(`Error deleting client: ${response.statusText}`);
    }
  };
  
  export default deleteClient;
  