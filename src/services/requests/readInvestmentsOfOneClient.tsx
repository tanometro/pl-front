const readInvestmentsOfOneClient = async (client_id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/investments/findByClient/${client_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const data = response.json();
    return data;
  }
  
  export default readInvestmentsOfOneClient