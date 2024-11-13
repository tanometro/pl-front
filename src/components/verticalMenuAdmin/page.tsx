import React from 'react';
import { FaPeopleRoof } from "react-icons/fa6";
import { GiReceiveMoney, GiPiggyBank } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";
import { AiOutlineAim } from "react-icons/ai";
import { MdApi } from "react-icons/md";
import Link from 'next/link';

const VerticalMenuAdmin = () => {
    const menu = [
        {
            name: "Resumen",
            path: "/adminDashboard/",
            icon: MdApi
        },
        {
            name: "Clientes",
            path: "/adminDashboard/clientes",
            icon: IoIosPeople
        },
        {
            name: "Vendedores",
            path: "/adminDashboard/sellers",
            icon: FaPeopleRoof
        },
        {
            name: "Préstamos",
            path: "/adminDashboard/loans",
            icon: GiReceiveMoney
        },
        {
            name: "Leads",
            path: "/adminDashboard/leads",
            icon: AiOutlineAim
        },
        {
            name: "Empeños",
            path: "/adminDashboard/efforts",
            icon: GiPiggyBank,
        },
        {
            name: "Inversiones",
            path: "/adminDashboard/investments",
            icon: GiPiggyBank,
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
