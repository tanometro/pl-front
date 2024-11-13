const JobData = ({ client }: any) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Datos Laborales */}
      <div className="border-blue-500 border p-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-2 border-b-2 border-black">
          Datos Laborales
        </h2>
        <p className="mb-2">
          <strong>Razon Social: </strong>
          <span className="text-gray-700">
            {client?.job_data?.social_rason || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>CUIT: </strong>
          <span className="text-gray-700">
            {client?.job_data?.cuit || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Fecha de Ingreso: </strong>
          <span className="text-gray-700">
            {client?.job_data?.entry_date || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Salario Bruto: </strong>
          <span className="text-gray-700">
            {client?.job_data?.gross_salary || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Banco de Cobro: </strong>
          <span className="text-gray-700">
            {client?.job_data?.bank || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Direccion Laboral: </strong>
          <span className="text-gray-700">
            {client?.job_data?.job_address || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Telefono Laboral: </strong>
          <span className="text-gray-700">
            {client?.job_data?.job_phone || "No disponible"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default JobData;
