const readOneUser = async (user_id: string | undefined) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const data = response.json();
    return data;
  }
  
  export default readOneUser;