'use client';

import React, { useEffect, useState } from 'react';
import readAllSellers from '@/services/requests/readAllSellers';
import { SellersInterface } from '@/types/SellersTypes';
import DataTable from '@/components/DataTable/DataTable';
import deleteSeller from '@/services/requests/deleteSeller';
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

  const renderRow = (seller: SellersInterface, index: number) => (
    <tr key={index} className="">
      <td>{seller.name}</td>
      <td>{seller.last_name}</td>
      <td>{seller.phone}</td>
      <td>{seller.cuil_cuit}</td>
      <td>
        <DeleteButton onClickFunction={() => deleteSeller(seller.id)}/>
      </td>
    </tr>
  );

  return (
    <DataTable
      columns={columns}
      data={allSellers}
      renderRow={renderRow}
      renderDetails={(seller: SellersInterface) => (
        <div className='text-black'>
          <p><strong>Nombre:</strong> {seller.name}</p>
          <p><strong>Teléfono:</strong> {seller.phone}</p>
          <p><strong>CUIL/CUIT:</strong> {seller.cuil_cuit}</p>
          {/* Aquí puedes añadir más información que desees mostrar */}
        </div>
      )}
      />
  );
};

export default Sellers;