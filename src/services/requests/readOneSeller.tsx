const readOneSeller = async (seller_id: string | null) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sellers/${seller_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const data = response.json();
    return data;
  }
  
  export default readOneSeller;