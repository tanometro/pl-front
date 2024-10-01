import React from 'react';
import { FaEuroSign, FaFaceGrinStars } from "react-icons/fa6";
import Link from 'next/link';

const VerticalMenuSeller = () => {
    const menu = [
        {
            name: "Resumen",
            path: "/sellerDashboard",
            icon: FaFaceGrinStars
        },
        {
            name: "Clientes",
            path: "/sellerDashboard/clients",
            icon: FaEuroSign
        },
        {
            name: "Leads",
            path: "/sellerDashboard/leads",
            icon: FaEuroSign,
        },
        {
            name: "Deudores",
            path: "/sellerDashboard/dubts",
            icon: FaEuroSign,
        },
        {
            name: "Mi perfil",
            path: "/sellerDashboard/profile",
            icon: FaFaceGrinStars
        }
    ];

  return (
    <div className="h-full">
        <ul className="menu bg-base-200 p-4 rounded-box w-full shadow-md shadow-emerald-200/30">
            {menu.map((item, index) => (
                <li key={index} className="my-2">
                    <Link href={item.path} className="flex items-center">
                        <item.icon size={20} className="mr-2" />
                        {item.name}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
  );
}

export default VerticalMenuSeller;