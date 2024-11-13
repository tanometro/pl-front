const readAllGoldPieces = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/gold_pieces`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
    const data = await response.json();
    return data;
}

export default readAllGoldPieces;