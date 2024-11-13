"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Articles, GoldPieces } from "@/types/EffortsTypes";
import readAllGoldPieces from "@/services/requests/readAllGoldPieces";
import readAllArticles from "@/services/requests/readAllArticles";
import readOneClient from "@/services/requests/readOneClient";
import { ClientsInterface } from "@/types/ClientsTypes";
import ViewButton from "@/components/Buttons/ViewButton";
import DeleteButton from "@/components/Buttons/DeleteButton";
import deleteGoldPiece from "@/services/requests/deleteGoldPiece";
import DataTable from "@/components/DataTable/DataTable";
import deleteArticle from "@/services/requests/deleteArticle";
import ClientPersonalData from "@/components/ClientComponents/ClientPersonalData";
import BudgetButton from "@/components/Buttons/BudgetButton";
import BudgeModal from "./budgeModal";

function Efforts() {
  const [allGoldPieces, setAllGoldPieces] = useState<GoldPieces[]>([]);
  const [allArticles, setAllArticles] = useState<Articles[]>([]);
  const goldColumns = ["Nombre", "Precio", "Cliente", "Acciones"];
  const articlesColumns = ["Nombre", "Precio", "Cliente", "Acciones"];
  const [isGoldModalOpen, setIsGoldModalOpen] = useState(false);
  const [isArtModalOpen, setIsArtModalOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [selectedGoldPiece, setSelectedGoldPiece] = useState<GoldPieces | null>(
    null
  );
  const [selectedArticle, setSelectedArticle] = useState<Articles | null>(null);
  const [selectedClient, setSelectedCLient] = useState<ClientsInterface | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [budgetArticle, setBudgeArticle] = useState(null);
  const [budgeGoldPiece, serBudgeGoldPice] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const goldPiecesList = await readAllGoldPieces();
      const articlesList = await readAllArticles();
      setAllGoldPieces(goldPiecesList);
      setAllArticles(articlesList);
    } catch (error) {
      console.error("Error fetching gold pieces or articles", error);
    } finally {
      setIsLoading(false);
    }
  };

  const viewClient = async (client_id: string) => {
    try {
      const client = await readOneClient(client_id);
      setSelectedCLient(client);
      setIsClientModalOpen(true);
    } catch (error) {
      console.error("Error fetching Client:", error);
    }
  };

  const handleDeleteGoldPiece = async (goldPieceId: string) => {
    try {
      await deleteGoldPiece(goldPieceId);
      setAllGoldPieces((prevGoldPieces) =>
        prevGoldPieces.filter((goldPiece) => goldPiece.id !== goldPieceId)
      );
      alert(`Pieza de Oro ${goldPieceId} eliminada`);
    } catch (error) {
      console.error(`Error eliminando la Pieza de oro ${goldPieceId}:`, error);
    }
  };

  const handleDeleteArticle = async (articleId: string) => {
    try {
      await deleteArticle(articleId);
      setAllGoldPieces((prevArticles) =>
        prevArticles.filter((article) => article.id !== articleId)
      );
      alert(`Articlulo ${articleId} eliminado`);
    } catch (error) {
      console.error(`Error eliminando el Articulo ${articleId}:`, error);
    }
  };

  const renderRowGoldPieces = (goldPiece: GoldPieces, index: number) => (
    <tr key={index}>
      <td>{goldPiece.name}</td>
      <td>{goldPiece.price ? goldPiece.price : "Sin Presupuestar"}</td>
      <td>
        <ViewButton
          onClickFunction={() => {
            viewClient(goldPiece.client_id);
          }}
        />
      </td>
      <td className="flex">
        <DeleteButton
          onClickFunction={() => handleDeleteGoldPiece(goldPiece.id)}
        />
        <ViewButton
          onClickFunction={() => {
            setSelectedGoldPiece(goldPiece);
            setIsGoldModalOpen(true);
          }}
        />
        {goldPiece.price === null || goldPiece.price <= 0 ? (
          <BudgetButton
            onClickFunction={() => {
              setSelectedGoldPiece(goldPiece);
              setIsBudgetModalOpen(true);
            }}
          />
        ) : (
          <></>
        )}
      </td>
    </tr>
  );

  const renderRowArticles = (article: Articles, index: number) => (
    <tr key={index}>
      <td>{article.name}</td>
      <td>{article.price ? article.price : "Sin Presupuestar"}</td>
      <td>
        <ViewButton
          onClickFunction={() => {
            viewClient(article.client_id);
          }}
        />
      </td>
      <td className="flex">
        <DeleteButton onClickFunction={() => handleDeleteArticle(article.id)} />
        <ViewButton
          onClickFunction={() => {
            setSelectedArticle(article);
            setIsArtModalOpen(true);
          }}
        />
        {article.price === null || article.price <= 0 ? (
          <BudgetButton
            onClickFunction={() => {
              setSelectedArticle(article)
              setIsBudgetModalOpen(true);
            }}
          />
        ) : (
          <></>
        )}
      </td>
    </tr>
  );

  const openImageModal = (imageData: string) => {
    setSelectedImage(imageData);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedImage(null);
  };
  const handleBudgetUpdate = async () => {
    await fetchData();
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  if (!allGoldPieces.length && !allArticles.length)
    return (
      <div className="text-4xl text-center">No hay datos disponibles.</div>
    );

  return (
    <div className="flex justify-evenly w-full h-full">
      {/* Modal Cliente */}
      {isClientModalOpen && selectedClient && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Detalles del Cliente</h3>
              <button
                onClick={() => setIsClientModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cerrar
              </button>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              {selectedClient && (
                <div className="bg-base-100 border-blue-500 rounded-box p-6">
                  <ClientPersonalData client={selectedClient} />
                </div>
              )}
            </Suspense>
          </div>
        </div>
      )}
      {/*Modal Presupuesto*/}
      {isBudgetModalOpen && selectedArticle && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Detalles del Cliente</h3>
              <button
                onClick={() => setIsBudgetModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cerrar
              </button>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              {selectedArticle && (
                <BudgeModal
                  article_id={selectedArticle.id}
                  setIsBudgetModalOpen={setIsBudgetModalOpen}
                  onBudgetUpdate={handleBudgetUpdate}
                />
              )}
            </Suspense>
          </div>
        </div>
      )}
      {/*Modal Presupuesto*/}
      {isBudgetModalOpen && selectedGoldPiece && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Detalles del Presupuesto
              </h3>
              <button
                onClick={() => setIsBudgetModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cerrar
              </button>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              {selectedGoldPiece && (
                <BudgeModal
                  gold_piece_id={selectedGoldPiece.id}
                  setIsBudgetModalOpen={setIsBudgetModalOpen}
                  onBudgetUpdate={handleBudgetUpdate}
                />
              )}
            </Suspense>
          </div>
        </div>
      )}
      {/* Modal Articulo */}
      {isArtModalOpen && selectedArticle && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Detalles del Articulo</h3>
              <button
                onClick={() => setIsArtModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cerrar
              </button>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              {selectedArticle && (
                <div className="p-4 border rounded shadow-lg max-w-sm mx-auto">
                  <h2 className="text-xl font-bold mb-2">
                    {selectedArticle?.name}
                  </h2>
                  <p className="text-gray-600">
                    Categoría: {selectedArticle?.category}
                  </p>
                  <p className="text-gray-600">
                    Años de antigüedad: {selectedArticle?.years_old}
                  </p>

                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Imágenes:</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {selectedArticle?.images.map((image, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <img
                            src={image.data}
                            alt={image.name}
                            className="w-32 h-32 object-cover rounded cursor-pointer"
                            onClick={() => openImageModal(image.data)}
                          />
                          <span className="mt-2 text-sm">{image.name}</span>
                        </div>
                      ))}
                    </div>
                    {/* Modal for displaying larger image */}
                    {isImageModalOpen && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-4 rounded">
                          <button
                            onClick={closeImageModal}
                            className="absolute top-2 right-2 text-2xl text-white bg-gray-800 p-2 rounded-full"
                          >
                            X
                          </button>
                          <img
                            src={selectedImage || ""}
                            alt="Selected Image"
                            className="max-w-full max-h-full"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Suspense>
          </div>
        </div>
      )}
      {/* Modal Pieza de Oro */}
      {isGoldModalOpen && selectedGoldPiece && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Detalles del Articulo</h3>
              <button
                onClick={() => setIsGoldModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cerrar
              </button>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              {selectedGoldPiece && (
                <div className="p-4 border rounded shadow-lg max-w-sm mx-auto">
                  <h2 className="text-xl font-bold mb-2">
                    {selectedGoldPiece?.name}
                  </h2>
                  <p className="text-gray-600">
                    Kilates: {selectedGoldPiece?.carats}
                  </p>
                  <p className="border-t-2 border-gray-400 mb-2">Medidas</p>
                  <p className="text-gray-600">
                    Ancho: {selectedGoldPiece?.measures.width} mm
                  </p>
                  <p className="text-gray-600">
                    Alto: {selectedGoldPiece?.measures.height} mm
                  </p>
                  <p className="text-gray-600 border-b-2 border-gray-400 mb-2">
                    Espesor: {selectedGoldPiece?.measures.thickness} mm
                  </p>
                  <p className="text-gray-600 mb-2">
                    Peso: {selectedGoldPiece?.measures.thickness} gramos
                  </p>
                  <p className="text-gray-700 text-xl border-t-2 border-gray-400 pt-2 ">
                    Valor:{" "}
                    {selectedGoldPiece?.price
                      ? selectedGoldPiece?.price
                      : "Sin Presupuestar"}
                  </p>
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Imágenes:</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {selectedGoldPiece?.images.map((image, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <img
                            src={image.data}
                            alt={image.name}
                            className="w-32 h-32 object-cover rounded cursor-pointer"
                            onClick={() => openImageModal(image.data)}
                          />
                          <span className="mt-2 text-sm">{image.name}</span>
                        </div>
                      ))}
                    </div>
                    {/* Modal for displaying larger image */}
                    {isImageModalOpen && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-4 rounded">
                          <button
                            onClick={closeImageModal}
                            className="absolute top-2 right-2 text-2xl text-white bg-gray-800 p-2 rounded-full"
                          >
                            X
                          </button>
                          <img
                            src={selectedImage || ""}
                            alt="Selected Image"
                            className="max-w-full max-h-full"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Suspense>
          </div>
        </div>
      )}
      {allGoldPieces.length > 0 && (
        <div className="flex-col text-center">
          <h1>Piezas de Oro</h1>
          <DataTable
            columns={goldColumns}
            data={allGoldPieces}
            renderRow={renderRowGoldPieces}
          />
        </div>
      )}
      {allArticles.length > 0 && (
        <div className="flex-col text-center">
          <h1>Articulos</h1>
          <DataTable
            columns={articlesColumns}
            data={allArticles}
            renderRow={renderRowArticles}
          />
        </div>
      )}
    </div>
  );
}

export default Efforts;
