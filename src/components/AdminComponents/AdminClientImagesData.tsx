import deleteImage from "@/services/requests/deleteImage";

const ImagesData = ({ client }: any) => {

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Imágenes del Cliente</h2>
      <div className="flex">
        {client?.images?.length > 0 ? (
          client?.images?.map((image: any, index: number) => (
            <div
              key={index}
              className="mr-8 text-center justify-center flex-row items-center"
            >
              <img
                src={image.data}
                alt={image.name || `Image ${index + 1}`}
                className="w-32 h-32 object-cover mb-2"
              />
              <div>
                <p>{image.name}</p>
              </div>
              <div className="bg-red-300 p-2 rounded-md">
              <button
                  onClick={async () => {
                    await deleteImage(image.id)
                    .then(() => window.location.reload());
                  }}
                >
                  Borrar Imagen
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay imágenes disponibles</p>
        )}
      </div>
    </div>
  );
};

export default ImagesData;
