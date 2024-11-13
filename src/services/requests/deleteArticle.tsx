const deleteArticle = async (article_id: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/articles/${article_id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al eliminar el articulo");
        }
        return true;
    } catch (error) {
        console.error("Error al eliminar el articulo:", error);
        return false;
    }
}

export default deleteArticle;
