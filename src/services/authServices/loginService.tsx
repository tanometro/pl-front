import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";
import { AuthInterface } from "@/types/AuthInterface";


export const loginAction = async (values: AuthInterface) => {
    try {
      await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });
      return { success: true };
    } catch (error) {
      if (error instanceof AuthError) {
        return { error: error.cause?.err?.message };
      }
      return { error: "error 500" };
    }
  };