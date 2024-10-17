import { AuthInterface } from "@/types/AuthInterface";

export const loginAction = async (values: AuthInterface): Promise<AuthInterface | { error: string }> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
    });

    if (!response.ok) {
      throw new Error('Credenciales inválidas');
    }

    const user: AuthInterface = await response.json();
    return user;
  } catch (error) {
    if (error ) {
      return { error: 'Error de autenticación desconocido' };
    }
    
    console.error('Login error:', error);
    return { error: "Error 500" };
  }
};
