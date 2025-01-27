const uploadImage = async (imageDto: any) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/images`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(imageDto),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al Cargar la Imagen");
    }
    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("No se pudo subir la imagen: " + error.message);
    }
    throw new Error("Ocurrió un error desconocido");
  }
};

export default uploadImage;
