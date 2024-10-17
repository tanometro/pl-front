"use client";
import React, { useEffect, useState } from "react";
import PersonalData from "@/components/ClientComponents/ClientPersonalData";
import readOneFullClient from "@/services/requests/readOneFullClient";
import BankDates from "@/components/ClientComponents/ClientBankData";
import JobData from "@/components/ClientComponents/ClientJobData";
import ReferentsData from "@/components/ClientComponents/ClientReferentsData";

function Profile() {
  const client_id = "08417f82-6d34-4fb0-bbd5-1b2d97c00e20";
  const [client, setClient] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFullClient = async () => {
      try {
        const clientData = await readOneFullClient(client_id);
        setClient(clientData);
      } catch (error) {
        console.error("Error al obtener el cliente:", error);
      } finally {
        setIsLoading(false)
      }
    };
    fetchFullClient();
  }, [client_id]);

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
          <PersonalData client={client} />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-lg"
          aria-label="Datos Bancarios"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-blue-500 rounded-box p-6"
        >
          <BankDates client={client} />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-lg"
          aria-label="Datos Laborales"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-blue-500 rounded-box p-6"
        >
          <JobData client={client} />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-lg"
          aria-label="Mis Garantes"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-blue-500 rounded-box p-6"
        >
          <ReferentsData client={client} />
        </div>
      </div>
    </main>
  );
}

export default Profile;
