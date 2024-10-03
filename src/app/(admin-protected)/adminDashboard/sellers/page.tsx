'use client';

import React, { useEffect, useState } from 'react';
import readAllSellers from '@/services/requests/readAllSellers';
import { SellersInterface } from '@/types/SellersTypes';
import DataTable from '@/components/DataTable/DataTable';
import deleteClient from '@/services/requests/deleteClient';
import DeleteButton from '@/components/Buttons/DeleteButton';

const Sellers = () => {
  const [allSellers, setAllSellers] = useState<SellersInterface[]>([]);
  const columns = ['Nombre', 'Apellido', 'Teléfono', 'CUIL/CUIT', 'Acciones'];
  
  useEffect(() => {
    async function fetchdata() {
      try {
        const sellerList = await readAllSellers();
        setAllSellers(sellerList);
      } catch (error) {
        
      }
    }
    fetchdata();
  }, []);

  const renderRow = (client: SellersInterface, index: number) => (
    <tr key={index} className="">
      <td>{client.name}</td>
      <td>{client.last_name}</td>
      <td>{client.phone}</td>
      <td>{client.cuil_cuit}</td>
      <td>
        <DeleteButton onClickFunction={() => deleteClient(client.user_id)}/>
      </td>
    </tr>
  );

  return (
    <DataTable
      columns={columns}
      data={allSellers}
      renderRow={renderRow}
      renderDetails={(client: SellersInterface) => (
        <div className='text-black'>
          <p><strong>Nombre:</strong> {client.name}</p>
          <p><strong>Teléfono:</strong> {client.phone}</p>
          <p><strong>CUIL/CUIT:</strong> {client.cuil_cuit}</p>
          {/* Aquí puedes añadir más información que desees mostrar */}
        </div>
      )}
      />
  );
};

export default Sellers;