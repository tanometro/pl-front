'use client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { Articles, GoldPieces } from '@/types/EffortsTypes'
import readArticlesOfOneClient from '@/services/requests/readArticlesOfOneClient'
import readGoldPiecesOfOneClient from '@/services/requests/readGoldPiecesOfOneClient'
import createArticle from '@/services/requests/createArticle'
import createGoldPiece from '@/services/requests/createGoldPiecet'
import SuccessAlert from '@/components/Alert/SuccessAlert'
import ErrorAlert from '@/components/Alert/ErrorAlert'

function Efforts() {
  const [articles, setArticles] = useState<Articles[]>([])
  const [goldPieces, setGoldPieces] = useState<GoldPieces[]>([])
  const { data: session } = useSession()
  const client_id = session?.user.user.client.id
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [isGoldPieceModalOpen, setIsGoldPieceModalOpen] = useState(false);
  const [newArticle, setNewArticle] = useState({
    name: "",
    category: "",
    years_old: 0,
    images: [{ name: "", data: "", client_id: client_id }],
    client_id: client_id
  });
  const [newGoldPiece, setNewGoldPiece] = useState({
    name: "",
    carats: 0,
    measures: {
      width: 0,
      height: 0,
      thickness: 0,
    },
    weight: 0,
    images: [{ name: "", data: "", client_id: client_id }],
    client_id: client_id
  });
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  useEffect(() => {
    fetchEffotsData(client_id)
  }, [client_id])

  const fetchEffotsData = async (client_id: string) => {
    try {
      const articlesData = await readArticlesOfOneClient(client_id);
      setArticles(articlesData);
    } catch (error) {
      console.error("Error al obtener los Artículos:", error);
    }

    try {
      const goldPiecesData = await readGoldPiecesOfOneClient(client_id);
      setGoldPieces(goldPiecesData);
    } catch (error) {
      console.error("Error al obtener las Piezas de Oro:", error);
    }
  }

  const handleArticleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "imageName") {
      setNewArticle((prev) => ({
        ...prev,
        images: [{ ...prev.images[0], name: value }],
      }));
    } else {
      setNewArticle((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  console.log(articles)
  console.log(goldPieces)
  const handleArticleFileChange = async (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const reader: any = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setNewArticle((prev) => ({
          ...prev,
          images: [
            {
              ...prev.images[0],
              data: base64Image,
            },
          ],
        }));
      };
      reader.readAsDataURL(file);
    }
  };


  const handleGoldPieceChange = async (e: any) => {
    const { name, value } = e.target;

    if (["width", "height", "thickness"].includes(name)) {
      setNewGoldPiece((prev) => ({
        ...prev,
        measures: {
          ...prev.measures,
          [name]: value,
        },
      }));
    } else if (name === "image") {
      const file = e.target.files[0];

      if (file) {
        const reader: any = new FileReader();
        reader.onloadend = () => {
          const base64Image = reader.result;

          setNewGoldPiece((prev) => ({
            ...prev,
            images: [
              {
                ...prev.images[0],
                data: base64Image,
              },
            ],
          }));
        };
        reader.readAsDataURL(file);
      }
    } else if (name === "imageName") {
      setNewGoldPiece((prev) => ({
        ...prev,
        images: [{ ...prev.images[0], name: value }],
      }));
    } else {
      setNewGoldPiece((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddArticle = async (e: any) => {
    e.preventDefault();
    try {
      const response = await createArticle(newArticle)
      if (response.ok) {
        setAlertMessage("Articulo cargado correctamente");
        setAlertType("success");
        setNewArticle({
          name: "",
          category: "",
          years_old: 0,
          images: [{ name: "", data: "", client_id: client_id }],
          client_id: client_id
        })
        setTimeout(() => {
          fetchEffotsData(client_id)
        }, 3000);
      } else {
        throw new Error("Algo salió mal al cargar el Articulo");
      }
    } catch (error) {
      setAlertMessage("Error al cargar el Articulo");
      setAlertType("error");
    } finally {
      setIsArticleModalOpen(false)
      setAlertOpen(true);
    }
  };

  const handleAddGoldPiece = async (e: any) => {
    e.preventDefault();
    try {
      const response = await createGoldPiece(newGoldPiece)
      if (response.ok) {
        setAlertMessage("Pieza de oro cargada correctamente");
        setAlertType("success");
        setNewGoldPiece({
          name: "",
          carats: 0,
          measures: {
            width: 0,
            height: 0,
            thickness: 0,
          },
          weight: 0,
          images: [{ name: "", data: "", client_id: client_id }],
          client_id: client_id
        })
        console.log(newGoldPiece)
        setTimeout(() => {
          fetchEffotsData(client_id)
        }, 3000);
      } else {
        throw new Error("Algo salió mal al cargar la Pieza de oro");
      }
    } catch (error) {
      setAlertMessage("Error al cargar la pieza de oro");
      setAlertType("error");
    } finally {
      setIsGoldPieceModalOpen(false)
      setAlertOpen(true);
    }
  };

  return (
    <div className="p-6">
      <div></div>
      <h1 className="text-2xl font-bold text-center mb-6">Empeños del Cliente</h1>
      <div className="mb-8">
        <div className='flex justify-between'>
          <h2 className="text-xl font-semibold mb-4">Artículos</h2>
          <button
            className="bg-lime-500 text-white font-medium py-2 px-4 rounded-md hover:bg-lime-600 mb-4"
            onClick={() => setIsArticleModalOpen(true)}
          >
            Agregar Artículo
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article.id} className="border rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105">
              {/* Se usa la primera imagen del artículo */}
              <img
                src={article.images[0]?.data}
                alt={article.name}
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-medium">{article.name}</h3>
              <p className="text-gray-600">Categoría: {article.category}</p>
              <p className="text-gray-600">Años: {article.years_old}</p>
              {article.price
                ? (
                  <div>
                    <p className="font-bold">Precio: ${article.price.toFixed(2)}</p>
                    {article.quotas.map((quota) => {
                      return <p>Cuota {quota.number}: {quota.amount} {quota.state === 'PENDING'? <span className='text-red-600'>  Pendiente</span>:<span className='text-lime-600'>Paga</span>}</p>
                    })}
                  </div>
                ) : (
                  <p className='text-red-600 font-semibold'>Articulo sin Presupuestar</p>
                )}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className='flex justify-between'>
          <h2 className="text-xl font-semibold mb-4">Piezas de Oro</h2>
          <button
            className="bg-lime-500 text-white font-medium py-2 px-4 rounded-md hover:bg-lime-600 mb-4"
            onClick={() => setIsGoldPieceModalOpen(true)}
          >
            Agregar Pieza de Oro
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {goldPieces.map((goldPiece) => (
            <div key={goldPiece.id} className="border rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105">
              {/* Se usa la primera imagen de la pieza de oro */}
              <img
                src={goldPiece.images[0]?.data}
                alt={goldPiece.name}
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-medium">{goldPiece.name}</h3>
              <p className="text-gray-600">Carats: {goldPiece.carats}</p>
              <p className="text-gray-600">Peso: {goldPiece.weight} g</p>
              {goldPiece?.price
                ? <p className="font-bold">Precio: ${goldPiece.price?.toFixed(2)}</p>
                : <p className='text-red-600 font-semibold'>Sin Presupestar</p>
              }
            </div>
          ))}
        </div>
      </div>
      {/* Modal para Artículos */}
      {isArticleModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setIsArticleModalOpen(false)}
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4">Cargar Artículo</h2>
            <form className="space-y-4" onSubmit={handleAddArticle}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre del Artículo
                </label>
                <input
                  type="text"
                  name="name"
                  value={newArticle.name}
                  onChange={handleArticleChange}
                  placeholder="Nombre del artículo"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 sm:text-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Categoría
                </label>
                <input
                  type="text"
                  name="category"
                  value={newArticle.category}
                  onChange={handleArticleChange}
                  placeholder="Categoría"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 sm:text-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Años de Antigüedad
                </label>
                <input
                  type="number"
                  name="years_old"
                  value={newArticle.years_old}
                  onChange={handleArticleChange}
                  placeholder="Años de antigüedad"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 sm:text-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Imagen
                </label>
                <input
                  type="text"
                  name="imageName"
                  value={newArticle.images[0].name}
                  onChange={handleArticleChange}
                  placeholder="Nombre de la Imagen"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 sm:text-sm p-2"
                />
                <input
                  type="file"
                  name="image"
                  onChange={handleArticleFileChange}
                  className="mt-1 block w-full text-gray-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-lime-500 text-white font-medium py-2 px-4 rounded-md hover:bg-lime-600"
              >
                Guardar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal para Piezas de Oro */}
      {isGoldPieceModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setIsGoldPieceModalOpen(false)}
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4">Cargar Pieza de Oro</h2>
            <form className="space-y-4" onSubmit={handleAddGoldPiece}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  value={newGoldPiece.name}
                  onChange={handleGoldPieceChange}
                  placeholder="Nombre de la pieza"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 sm:text-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Quilates
                </label>
                <input
                  type="number"
                  name="carats"
                  value={newGoldPiece.carats}
                  onChange={handleGoldPieceChange}
                  placeholder="Quilates"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 sm:text-sm p-2"
                  required
                />
              </div>
              <h3 className="text-lg font-semibold mt-4">Dimensiones</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ancho (mm)
                </label>
                <input
                  type="number"
                  name="width"
                  value={newGoldPiece.measures.width}
                  onChange={handleGoldPieceChange}
                  placeholder="Ancho"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 sm:text-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Alto (mm)
                </label>
                <input
                  type="number"
                  name="height"
                  value={newGoldPiece.measures.height}
                  onChange={handleGoldPieceChange}
                  placeholder="Alto"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 sm:text-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Grosor (mm)
                </label>
                <input
                  type="number"
                  name="thickness"
                  value={newGoldPiece.measures.thickness}
                  onChange={handleGoldPieceChange}
                  placeholder="Grosor"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 sm:text-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Peso (gramos)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={newGoldPiece.weight}
                  onChange={handleGoldPieceChange}
                  placeholder="Peso"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 sm:text-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Imagen
                </label>
                <input
                  type="text"
                  name="imageName"
                  value={newGoldPiece.images[0].name}
                  onChange={handleGoldPieceChange}
                  placeholder="Nombre de la Imagen"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 sm:text-sm p-2"
                />
                <input
                  type="file"
                  name="image"
                  onChange={handleGoldPieceChange}
                  className="mt-1 block w-full text-gray-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-lime-500 text-white font-medium py-2 px-4 rounded-md hover:bg-lime-600"
              >
                Guardar
              </button>
            </form>
          </div>
        </div>
      )}
      {alertOpen && alertType === "success" && (
        <SuccessAlert
          open={alertOpen}
          onClose={() => setAlertOpen(false)}
          alertMessage={alertMessage}
        />
      )}

      {alertOpen && alertType === "error" && (
        <ErrorAlert
          open={alertOpen}
          onClose={() => setAlertOpen(false)}
          alertMessage={alertMessage}
        />
      )}
    </div>
  )
}

export default Efforts