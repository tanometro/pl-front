const readAllLeads = async (seller_id: string | undefined) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/leads/findBYSellerId/${seller_id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    return data;
};

export default readAllLeads;