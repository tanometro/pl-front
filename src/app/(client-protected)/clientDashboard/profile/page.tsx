"use client";
import React, { useEffect, useState } from "react";
import ClientDetails from "@/components/ClientComponents/ClientProfile";
import readOneFullClient from "@/services/requests/readOneFullClient";
import patchClient from "@/services/requests/patchClient";

function Profile() {
  const client_id = "37a3ac0f-0a1d-469f-b9f0-652ee2ad095c";
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

  return <ClientDetails client={client} onSave={patchClient} />;
}

export default Profile;
