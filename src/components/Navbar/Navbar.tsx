'use client';

import React from 'react';
import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
    //simula tu prestamo /
    //requisitos /requisitos
    //login /login
    //Registrate /register
    
    const [state, setState] = useState(false)
    
        const navigation = [
            { title: "Simula tu préstamo", path: "/" },
            { title: "Requisitos", path: "/requisitos" },
        ]
    
        return (
            <nav>
                <div className="navbar bg-accent text-primary-content rounded-md mt-2">
                    <div className="navbar-start">
                        <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                            href="/logo.png"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><Link href="/">Simular tu préstamo</Link></li>
                            <li><Link href="/requisitos">Requisitos</Link></li>
                        </ul>
                        </div>
                        <a className="btn btn-ghost text-xl">Préstamo Líder</a>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                        <li><Link href="/">Simular tu préstamo</Link></li>
                        <li><Link href="/requisitos">Requisitos</Link></li>
                        </ul>
                    </div>
                    <div className="navbar-end">
                    <ul>
                    <li><Link href="/login">Login</Link></li>
                    <li><Link href="/register">Registrate</Link></li>
                    </ul>
                    </div>
                </div>
            </nav>
        )
    }

export default Navbar;