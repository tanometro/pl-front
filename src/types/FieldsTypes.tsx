export interface PasswordFieldProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TextFieldProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    name: string;
    required?: boolean;
}

export interface FormFieldProps {
    input: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    name: string;
    required?: boolean;
}