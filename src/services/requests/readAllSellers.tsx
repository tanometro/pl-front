const readAllSellers = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sellers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  const data = response.json();
  return data;
}

export default readAllSellers;