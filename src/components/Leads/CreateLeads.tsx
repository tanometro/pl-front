'use client';

import FormButton from "@/components/Buttons/FormButton";
import TextField from "@/components/Fields/TextField";
import createLead from "@/services/requests/createLead";
import { useState } from "react";
import SuccessAlert from "@/components/Alert/SuccessAlert";
import ErrorAlert from "@/components/Alert/ErrorAlert";
import Link from "next/link";

export default function CreateLead() {
    const [userData, setUserData] = useState({
        name: "",
        dni: "",
        email: "",
        phone: "",
        bank: "",
        amount: ""
    });

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const response = await createLead(userData);
            if (response.ok) {
                setAlertMessage("Formulario enviado correctamente");
                setAlertType('success');
            } else {
                throw new Error("Algo salió mal al crear el lead");
            }
        } catch (error) {
            setAlertMessage("Error al enviar el formulario");
            setAlertType('error');
        } finally {
            setAlertOpen(true);

        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextField placeholder="Nombre/s" onChange={handleChange} name="name"/>
                <TextField placeholder="DNI" onChange={handleChange} name="dni" required/>
                <TextField placeholder="Email" onChange={handleChange} name="email" required />
                <TextField placeholder="Teléfono" onChange={handleChange} name="phone" required />
                <TextField placeholder="Tu banco" onChange={handleChange} name="bank" />
                <TextField placeholder="Monto estimado" onChange={handleChange} name="amount" />
                <FormButton title="Enviar"/>
            </form>

            {alertOpen && alertType === 'success' && (
                <SuccessAlert open={alertOpen} onClose={() => setAlertOpen(false)} alertMessage={alertMessage} />
            )}

            {alertOpen && alertType === 'error' && (
                <ErrorAlert open={alertOpen} onClose={() => setAlertOpen(false)} alertMessage={alertMessage} />
            )}

            <div>
                <h1>¿Ya tenes cuenta?</h1>
                <Link href="/login">Log-in</Link>
            </div>
        </div>
    );
}