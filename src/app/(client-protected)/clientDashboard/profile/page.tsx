"use client";
import React, { useEffect, useState } from "react";
import PersonalData from "@/components/ClientComponents/ClientPersonalData";
import readOneFullClient from "@/services/requests/readOneFullClient";
import patchClient from "@/services/requests/patchClient";
import BankData from "@/components/ClientComponents/ClientBankData";
import JobData from "@/components/ClientComponents/ClientJobData";
import ReferentsData from "@/components/ClientComponents/ClientReferentsData"

function Profile() {
  const client_id = "08417f82-6d34-4fb0-bbd5-1b2d97c00e20";
  const [client, setClient] = useState();

  useEffect(() => {
    const fetchFullClient = async () => {
      try {
        const clientData = await readOneFullClient(client_id);
        setClient(clientData);
      } catch (error) {
        console.error("Error al obtener el cliente:", error);
      }
    };
    fetchFullClient();
  }, [client_id]);
  
  return (
    <main>
      <div role="tablist" className="tabs tabs-lifted">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-lg"
          aria-label="Datos Personales"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-blue-500 rounded-box p-6"
        >
          <PersonalData client={client} onSave={patchClient} />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-lg"
          aria-label="Datos Bancarios"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-blue-500 rounded-box p-6"
        >
          <BankData client={client} onSave={patchClient} />
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
          <JobData client={client} onSave={patchClient} />
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
          <ReferentsData client={client} onSave={patchClient} />
        </div>
      </div>
    </main>
  );
}

export default Profile;
