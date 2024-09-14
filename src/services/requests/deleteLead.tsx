const deleteLead = async (lead_id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/leads`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({lead_id})
    });
 
}

export default deleteLead;