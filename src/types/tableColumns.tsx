import { FaSquareWhatsapp } from "react-icons/fa6";

export const leadsColumns = [
  {
    accessorKey: "id",
    header: "",
    cell: () => null,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "amount",
    header: "Monto Solicitado",
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "dni",
    header: "DNI",
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
    cell: ({ row }: any) => {
      const phone = row.getValue("phone");
      const whatsappLink = `https://wa.me/${phone}`;
      return (
        <div className="flex items-center space-x-2">
          <span>{phone}</span>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:underline"
          >
            <button className=" text-green-700 px-1 py-1 rounded-full">
              <FaSquareWhatsapp size={32} />
            </button>
          </a>
        </div>
      );
    },
  },
];

export const clientDubtColumns = [
  {
    accessorKey: "id",
    header: "",
    cell: () => null,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "dni",
    header: "DNI",
  },
  {
    accessorKey: 'debt',
    header: 'Deuda'
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
    cell: ({ row }: any) => {
      const phone = row.getValue("phone");
      const whatsappLink = `https://wa.me/${phone}`;
      return (
        <div className="flex items-center space-x-2">
          <span>{phone}</span>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:underline"
          >
            <button className=" text-green-700 px-1 py-1 rounded-full">
              <FaSquareWhatsapp size={32} />
            </button>
          </a>
        </div>
      );
    },
  },
];
