'use server';
import { signIn } from "@/auth";
import { AuthError } from "@auth/core/errors";

export const authenticate = async (
    formData: FormData,
  ) => {
    try {
      await signIn('Credentials', {
        ...Object.fromEntries(formData),
        redirect: false,
      });
  
      return "Success";
  
    } catch (error) {
      if (error instanceof AuthError) return 'CredentialsSignin';
  
      return 'UnknownError';
    }
  };