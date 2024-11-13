const readAllLoans = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/loans`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    return data;
};

export default readAllLoans;