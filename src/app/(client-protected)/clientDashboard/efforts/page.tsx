'use client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { Articles, GoldPieces } from '@/types/EffortsTypes'
import readArticlesOfOneClient from '@/services/requests/readArticlesOfOneClient'
import readGoldPiecesOfOneClient from '@/services/requests/readGoldPiecesOfOneClient'

function Efforts() {
  const [articles, setArticles] = useState<Articles[]>([])
  const [goldPieces, setGoldPieces] = useState<GoldPieces[]>([])
  const { data: session } = useSession()
  const client_id = session?.user.user.client.id

  useEffect(() => {
    const fetchEffotsData = async () => {
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
    fetchEffotsData()
  }, [client_id])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Empenios del Cliente</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Artículos</h2>
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
              <p className="font-bold">Precio: ${article.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Piezas de Oro</h2>
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
    </div>
  )
}

export default Efforts