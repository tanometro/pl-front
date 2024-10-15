import React from 'react';
import { FaFaceGrinStars, FaTriangleExclamation } from "react-icons/fa6";
import { MdApi } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { AiOutlineAim } from "react-icons/ai";
import Link from 'next/link';

const VerticalMenuSeller = () => {
    const menu = [
        {
            name: "Resumen",
            path: "/sellerDashboard",
            icon: MdApi
        },
        {
            name: "Clientes",
            path: "/sellerDashboard/clients",
            icon: IoIosPeople        },
        {
            name: "Leads",
            path: "/sellerDashboard/leads",
            icon: AiOutlineAim,
        },
        {
            name: "Deudores",
            path: "/sellerDashboard/dubts",
            icon: FaTriangleExclamation,
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