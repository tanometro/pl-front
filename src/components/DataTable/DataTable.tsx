import React from 'react';
import { DataTableProps } from '@/types/DataTableTypes';


const DataTable = <T,>({ columns, data, renderRow }: DataTableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-xs">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => renderRow(item, index))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;