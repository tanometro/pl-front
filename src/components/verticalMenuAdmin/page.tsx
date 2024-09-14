import React from 'react';
import { FaFaceGrinStars, FaFaceGrinWink, FaEuroSign, FaFilter, FaChampagneGlasses } from "react-icons/fa6";
import Link from 'next/link';

const VerticalMenuAdmin = () => {
    const menu = [
        {
            name: "Clientes",
            path: "/clientes",
            icon: FaFaceGrinStars
        },
        {
            name: "Vendedores",
            path: "/sellers",
            icon: FaFaceGrinWink
        },
        {
            name: "Préstamos",
            path: "/loans",
            icon: FaEuroSign
        },
        {
            name: "Leads",
            path: "/leads",
            icon: FaFilter
        },
        {
            name: "Inversiones",
            path: "/investments",
            icon: FaChampagneGlasses,
        },
        {
            name: "Mi perfil",
            path: "/clientes",
            icon: FaChampagneGlasses
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

export default VerticalMenuAdmin;
