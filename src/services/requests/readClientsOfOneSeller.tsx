const readClientsOfOneSeller = async (seller_id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/clients/getBYSellerId/${seller_id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    return data;
};

export default readClientsOfOneSeller