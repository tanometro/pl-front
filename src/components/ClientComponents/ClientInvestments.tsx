'use client'
import React, { useState } from "react";
import { InvestmentInterface, InvestmentsData } from "@/types/InvestmetsTypes";
import patchInvestment from "@/services/requests/patchInvestment";
import uploadImage from "@/services/requests/upLoadImage";
import { useSession } from "next-auth/react";

const InvestmentsComponent = ({ investments, contracts }: InvestmentsData) => {
    const { data: session } = useSession()
    const client_id = session?.user.user.client.id
    const [selectedInvestment, setSelectedInvestment] = useState<InvestmentInterface | null>(null);
    const [isFileModalOpen, setIsFileModalOpen] = useState(false);
    const [newFile, setNewFile] = useState<{
        name: string;
        data: string | null;
    }>({ name: "", data: null });

    const handleFileChange = (newFile: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setNewFile((prev) => ({
                ...prev,
                name: `Contrato de inversión Nro ${selectedInvestment?.id} FIRMADO`,
                data: reader.result as string,
                type: newFile.type,
            }));
        };
        reader.readAsDataURL(newFile);
    }

    const handleAddImage = async () => {
        if (newFile.name && newFile.data) {
            const imageDto = {
                name: newFile.name,
                data: newFile.data,
                client: client_id
            };
            console.log(imageDto)
            try {
                const updateState = {
                    state: 'Contrato Firmado'
                }
                const response = await uploadImage(imageDto);
                await patchInvestment(selectedInvestment?.id, updateState)
                alert('Contrato enviado con exito')
                window.location.reload();
            } catch (error) {
                alert(`Error al enviar el contrato :  ${error}`)
            }

            setIsFileModalOpen(false)
        }
    };

    const downloadContract = (investmentId: number) => {
        const contractName = `Contrato de inversión Nro ${investmentId}`;
        const contract = contracts?.find(c => c.name === contractName);

        if (contract) {
            const link = document.createElement('a');
            link.href = `${contract.data}`;
            link.download = `${contractName}.pdf`;
            link.click();
        } else {
            alert('No se encontró el contrato para esta inversión.');
        }
    };

    return (
        <div className="flex">
            {investments && investments.length > 0 ? (
                investments.map((investment) => (
                    <div key={investment.id} className="border rounded-md shadow-lg p-4 flex w-1/4 mx-8">
                        <div className="flex-row justify-between items-center">
                            <h3 className="text-2xl font-bold border-b-2">Inversion</h3>
                            <h3 className="text-lg font-semibold">Capital Inicial: ${investment.starting_capital}</h3>
                            <h3 className="text-lg font-semibold">Capital Actual: ${investment.current_capital}</h3>
                            <h3 className="text-lg font-semibold">
                                Interes Anaual: %{investment.rate}
                            </h3>
                            <h3 className="text-lg font-semibold">
                                Plazo de inversion: {investment.termn} dias
                            </h3>
                            <h3 className="text-lg font-semibold">Estado: {investment.state}</h3>
                            <div className="flex justify-between">
                                {investment.state !== 'Solicitud Enviada' && investment.state !== 'Inversion Confirmada' && (
                                    <>
                                        <button
                                            className="bg-orange-500 rounded-md p-2 mx-4 font-semibold"
                                            onClick={() => downloadContract(investment.id)}
                                        >
                                            Descargar contrato
                                        </button>
                                        <button
                                            className="bg-lime-500 rounded-md p-2 font-semibold"
                                            onClick={() => {
                                                setSelectedInvestment(investment);
                                                setIsFileModalOpen(true);
                                            }}
                                        >
                                            Subir Contrato Firmado
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="border rounded-md shadow-lg p-4 text-center">
                    <h3 className="text-lg font-semibold">
                        El cliente no tiene Inversiones activas
                    </h3>
                </div>
            )}

            {/* Modal */}
            {isFileModalOpen && selectedInvestment && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded">
                        <h2 className="text-lg font-bold mb-4">Enviar Contrato</h2>
                        <label>
                            {newFile.name}
                        </label>
                        <br />
                        <label>
                            Seleccionar contrato (PDF):
                            <input
                                type="file"
                                accept="application/pdf"
                                placeholder="Seleccionar Archivo"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        handleFileChange(file);
                                    } else {
                                        setNewFile((prev) => ({ ...prev, data: null, type: null }));
                                    }
                                }}
                                className="ml-2"
                            />
                        </label>
                        {newFile.data && (
                            <div className="mt-4">
                                <embed
                                    src={newFile.data}
                                    type="application/pdf"
                                    className="w-64 h-64 mb-2"
                                    title="Vista previa del PDF"
                                />
                            </div>
                        )}
                        <div className="mt-4">
                            <button
                                onClick={() => handleAddImage()}
                                className="bg-green-500 text-white px-4 py-2 mr-2"
                            >
                                Subir contrato
                            </button>
                            <button
                                onClick={() => setIsFileModalOpen(false)}
                                className="bg-gray-300 text-black px-4 py-2"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>


    );
}

export default InvestmentsComponent