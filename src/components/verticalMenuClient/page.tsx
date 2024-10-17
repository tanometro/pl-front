import React from 'react';
import { FaFaceGrinStars } from "react-icons/fa6";
import { MdApi } from "react-icons/md";
import { GiReceiveMoney, GiPiggyBank, GiGoldBar } from "react-icons/gi";
import Link from 'next/link';

const VerticalMenuClient = () => {
    const menu = [
        {
            name: "Resumen",
            path: "/clientDashboard",
            icon: MdApi
        },
        {
            name: "Préstamos",
            path: "/clientDashboard/loans",
            icon: GiReceiveMoney
        },
        {
            name: "Inversiones",
            path: "/clientDashboard/investments",
            icon: GiPiggyBank,
        },
        {
            name: "Mi perfil",
            path: "/clientDashboard/profile",
            icon: FaFaceGrinStars
        },
        {
            name: "Empeños",
            path: "/clientDashboard/efforts",
            icon: GiGoldBar
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

export default VerticalMenuClient;