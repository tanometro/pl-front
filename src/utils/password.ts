import bcrypt from 'bcrypt';

export async function saltAndHashPassword(password: string): Promise<string> {
    const saltRounds = 7; // Número de rondas de salt
    const salt = await bcrypt.genSalt(saltRounds);
    
    // Hashea la contraseña junto con el salt
    const hashedPassword = await bcrypt.hash(password, salt);
  
    return hashedPassword;
}