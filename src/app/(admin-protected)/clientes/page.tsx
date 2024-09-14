'use client';
import React, { useEffect, useState } from 'react';
import readAllClients from '@/services/requests/readAllClients';
import { ClientsInterface } from '@/types/ClientsTypes';
import DataTable from '@/components/DataTable/DataTable';
import deleteClient from '@/services/requests/deleteClient';
import DeleteButton from '@/components/Buttons/DeleteButton';
import ViewButton from '@/components/Buttons/ViewButton';

const Clients = () => {
  const [allClients, setAllClients] = useState<ClientsInterface[]>([]);
  const columns = ['Nombre', 'Apellido', 'Teléfono', 'CUIL/CUIT', 'Acciones'];

  useEffect(() => {
    async function fetchData() {
      try {
        const clientList = await readAllClients();
        setAllClients(clientList);
      } catch (error) {
        console.error("Error fetching clients", error);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (clientId: string) => {
    try {
      await deleteClient(clientId);
      setAllClients(prevClients => prevClients.filter(client => client.id !== clientId));
      console.log(`Cliente ${clientId} eliminado`);
    } catch (error) {
      console.error(`Error eliminando cliente ${clientId}:`, error);
    }
  };

  const renderDetails = (client: ClientsInterface, index: number) => (
    <div className='text-black'>
      <p><strong>Nombre:</strong> {client.name}</p>
      <p><strong>Teléfono:</strong> {client.phone}</p>
      <p><strong>CUIL/CUIT:</strong> {client.cuil_cuit}</p>
    </div>
)
  const renderRow = (client: ClientsInterface, index: number) => (
    <tr key={index}>
      <td>{client.name}</td>
      <td>{client.last_name}</td>
      <td>{client.phone}</td>
      <td>{client.cuil_cuit}</td>
      <td>
        <DeleteButton onClickFunction={() => handleDelete(client.id)}/>
        <ViewButton onClickFunction={() => renderDetails}/> 
      </td>
    </tr>
  );

  

  return (
    <DataTable
      columns={columns}
      data={allClients}
      renderRow={renderRow}
    />
  );
};

export default Clients;
