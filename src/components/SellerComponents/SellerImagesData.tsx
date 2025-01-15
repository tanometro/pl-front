"use client";

import deleteImage from "@/services/requests/deleteImage";
import uploadImage from "@/services/requests/upLoadImage";
import { useState } from "react";

const ImagesData = ({ seller }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newImage, setNewImage] = useState<{
    name: string;
    data: string | null;
  }>({ name: "", data: null });

  const [images, setImages] = useState(seller?.images || []);

  const handleFileChange = (newFile: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewImage((prev) => ({ ...prev, data: reader.result as string }));
    };
    reader.readAsDataURL(newFile);
  };

  const handleAddImage = async () => {
    if (newImage.name && newImage.data) {
      const imageDto = {
        name: newImage.name,
        data: newImage.data,
        seller: seller?.id,
      };

      await uploadImage(imageDto);

      setImages((prev: any) => [
        ...prev,
        { name: newImage.name, data: newImage.data },
      ]);
      closeModal();
      window.location.reload();
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewImage({ name: "", data: null }); // Resetear el estado
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Imágenes del Vendedor</h2>
      <div className="flex">
        {images?.length > 0 ? (
          images?.map((image: any, index: number) => (
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

      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 mt-4"
      >
        Agregar imagen
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded">
            <h2 className="text-lg font-bold mb-4">Agregar Imagen</h2>
            <label>
              Nombre de la imagen:
              <input
                type="text"
                value={newImage.name}
                onChange={(e) =>
                  setNewImage((prev) => ({ ...prev, name: e.target.value }))
                }
                className="border p-1 ml-2 mb-2"
              />
            </label>
            <br />
            <label>
              Seleccionar imagen:
              <input
                type="file"
                accept="image/*"
                placeholder="Seleccionar Archivo"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleFileChange(file);
                  } else {
                    setNewImage((prev) => ({ ...prev, data: null }));
                  }
                }}
                className="ml-2"
              />
            </label>
            {newImage.data && (
              <div className="mt-4">
                <img
                  src={newImage.data}
                  alt="Vista previa"
                  className="w-32 h-32 object-cover mb-2"
                />
              </div>
            )}
            <div className="mt-4">
              <button
                onClick={handleAddImage}
                className="bg-green-500 text-white px-4 py-2 mr-2"
              >
                Subir imagen
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 text-black px-4 py-2"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagesData;
