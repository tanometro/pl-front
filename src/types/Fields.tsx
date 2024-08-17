export interface PasswordFieldProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
}

export interface TextFieldProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    title: string;
    name: string;
}