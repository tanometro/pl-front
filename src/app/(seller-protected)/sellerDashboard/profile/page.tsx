"use client";
import readOneSeller from "@/services/requests/readOneSeller";
import { SellersInterface } from "@/types/SellersTypes";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import PersonalData from "@/components/SellerComponents/SellerPersonalData";
import ImagesData from "@/components/SellerComponents/SellerImagesData";

export default function Profile() {
  const { data: session } = useSession()
  const seller_id = session?.user.user.seller.id
  const [seller, setSeller] = useState<SellersInterface>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const sellerData = await readOneSeller(seller_id);
        setSeller(sellerData);
      } catch (error) {
        console.error("Error al Obtener el Vendedor", error);
      } finally {
        setIsLoading(false)
      }
    };
    fetchSeller();
  }, [seller_id]);

  if (isLoading) {
    return (
      <main className="flex flex-col justify-center items-center h-screen">
        <div className="loader"></div>
        <p className="text-lg mt-4">Cargando datos...</p>
        <style jsx>{`
          .loader {
            border: 8px solid #f3f3f3; /* Color gris claro */
            border-top: 8px solid #3498db; /* Color azul */
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 2s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </main>
    );
  }

  return (
    <main>
      <div role="tablist" className="tabs tabs-lifted">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-lg"
          aria-label="Datos Personales"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-blue-500 rounded-box p-6"
        >
          <PersonalData seller={seller} />
        </div>
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-lg"
          aria-label="Mis Imagenes"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-blue-500 rounded-box p-6"
        >
          <ImagesData seller={seller} />
        </div>
      </div>
    </main>
  );
}
