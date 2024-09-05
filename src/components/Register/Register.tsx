'use client';

import React, { useState } from 'react'
import FormField from '../Fields/FormField';
import createUser from '@/services/requests/createUser';
import FormButton_2 from '../Buttons/FormButton_2';
import Link from "next/link";

const RegisterComponent = () => {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        dni: "",
        phone: "",
        role: "CLIENT"
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUserData((prev) => ({...prev, [name]: value}))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createUser(userData);
        
    }

  return (
    <div>
        <form onSubmit={handleSubmit}> 
        <FormField input="Email" name="email" placeholder="tuemail@gmail.com" onChange={handleChange} required/>
        <FormField input="password" name="password" placeholder="********" onChange={handleChange} required/>
        <FormField input="DNI" name="dni" placeholder="Tu DNI" onChange={handleChange} required/>
        <FormField input="Teléfono" name="phone" placeholder="Tu teléfono" onChange={handleChange} required/>
        <FormButton_2/>
        </form>

    </div>
  )
}

export default RegisterComponent;