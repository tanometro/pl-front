const readAllInvestments = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/investments`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    return data;
};

export default readAllInvestments;