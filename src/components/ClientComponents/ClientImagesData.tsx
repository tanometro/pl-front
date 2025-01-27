"use client";

import deleteImage from "@/services/requests/deleteImage";
import uploadImage from "@/services/requests/upLoadImage";
import { useState } from "react";

const ImagesData = ({ client }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newImage, setNewImage] = useState<{
    name: string;
    data: string | null;
  }>({ name: "", data: null });

  const [images, setImages] = useState(client?.images || []);

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
        client: client?.id,
      };

      await uploadImage(imageDto);

      setImages((prev: any) => [
        ...prev,
        { name: newImage.name, data: newImage.data },
      ]);
      closeModal();
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewImage({ name: "", data: null });
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Imágenes del Cliente</h2>
      <div className="flex">
        {client?.images?.length > 0 ? (
          client?.images?.map((image: any, index: number) => {
            // Determinar el tipo de archivo
            const getFileType = (base64: string) => {
              const mimeMatch = base64.match(/^data:(.*?);base64,/);
              return mimeMatch ? mimeMatch[1] : null;
            };

            const fileType = getFileType(image.data);

            const openInNewTab = () => {
              const newTab = window.open();
              if (newTab) {
                newTab.document.body.innerHTML = `<iframe src="${image.data}" frameborder="0" style="width:100%;height:100%;"></iframe>`;
              }
            };

            const downloadFile = () => {
              const link = document.createElement("a");
              link.href = image.data;
              link.download = image.name || `Archivo_${index + 1}`;
              link.click();
            };

            return (
              <div
                key={index}
                className="mr-8 text-center flex flex-col items-center"
              >
                {/* Vista previa de PDF o imagen */}
                {fileType === "application/pdf" ? (
                  <embed
                    src={image.data}
                    type="application/pdf"
                    className="w-32 h-32 object-cover mb-2 cursor-pointer"
                    title={image.name || `Archivo ${index + 1}`}
                    onClick={openInNewTab}
                  />
                ) : (
                  <img
                    src={image.data}
                    alt={image.name || `Image ${index + 1}`}
                    className="w-32 h-32 object-cover mb-2 cursor-pointer"
                    onClick={openInNewTab}
                  />
                )}

                {/* Mostrar el nombre del archivo */}
                <div>
                  <p>{image.name}</p>
                </div>

                <div className="bg-blue-300 p-2 rounded-md mb-2">
                  <button
                    onClick={downloadFile}
                    className="text-white"
                  >
                    Descargar Archivo
                  </button>
                </div>

                {/* Botón para borrar archivo */}
                <div className="bg-red-300 p-2 rounded-md">
                  <button
                    onClick={async () => {
                      await deleteImage(image.id);
                      window.location.reload();
                    }}
                    className="text-white"
                  >
                    Borrar Archivo
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No hay archivos disponibles</p>
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
            <h2 className="text-lg font-bold mb-4">Agregar Archivo</h2>
            <label>
              Nombre del archivo:
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
              Seleccionar archivo:
              <input
                type="file"
                accept="image/*,application/pdf"
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
                {/* Vista previa de archivo seleccionado */}
                {newImage.data.startsWith("data:application/pdf") ? (
                  <embed
                    src={newImage.data}
                    type="application/pdf"
                    className="w-32 h-32 object-cover mb-2"
                  />
                ) : (
                  <img
                    src={newImage.data}
                    alt="Vista previa"
                    className="w-32 h-32 object-cover mb-2"
                  />
                )}
              </div>
            )}
            <div className="mt-4">
              <button
                onClick={handleAddImage}
                className="bg-green-500 text-white px-4 py-2 mr-2"
              >
                Subir archivo
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
