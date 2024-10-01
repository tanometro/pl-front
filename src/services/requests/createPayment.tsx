const createPayment = async (paymentData: object) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/payments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      }
    );

    if (!response.ok) {
      throw new Error("Error al Crear el pago");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    alert("Hubo un problema Crear el pago");
  }
};
export default createPayment;
