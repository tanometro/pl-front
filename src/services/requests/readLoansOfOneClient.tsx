const readLoansOfOneClient = async (client_id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/loans/findByClient/${client_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const data = response.json();
    return data;
  }
  
  export default readLoansOfOneClient;