'use client';

import React, { useEffect, useState } from 'react';
import readAllLeads from '@/services/requests/readAllLeads';
import { LeadInterface } from '@/types/LeadsTypes';
import DataTable from '@/components/DataTable/DataTable';
import deleteLead from '@/services/requests/deleteLead';
import DeleteButton from '@/components/Buttons/DeleteButton';

const Leads = () => {
  const [allLeads, setAllLeads] = useState<LeadInterface[]>([]);
  const columns = ['Nombre', 'Apellido', 'Teléfono', 'CUIL/CUIT', 'Acciones'];
  
  useEffect(() => {
    async function fetchdata() {
      try {
        const leadsList = await readAllLeads();
        setAllLeads(leadsList);
      } catch (error) {
        
      }
    }
    fetchdata();
  }, []);

  const renderRow = (lead: LeadInterface, index: number) => (
    <tr key={index} className="">
      <td>{lead.name}</td>
      <td>{lead.dni}</td>
      <td>{lead.email}</td>
      <td>{lead.phone}</td>
      <td>{lead.bank}</td>
      <td>{lead.amount}</td>
      <td>
        <DeleteButton onClickFunction={() => deleteLead(lead.id)}/>
      </td>
    </tr>
  );

  return (
    <DataTable
      columns={columns}
      data={allLeads}
      renderRow={renderRow}
      renderDetails={(lead: LeadInterface) => (
        <div className='text-black'>
          <p><strong>No hay más info por ver</strong></p>
        </div>
      )}
      />
  );
};

export default Leads;