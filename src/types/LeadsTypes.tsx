export interface LeadInterface {
    id: string;
    name: string,
    dni: string,
    email: string,
    phone: string,
    bank: string,
    amount: string,
}

export interface CreateLeadInterface {
    name: string,
    dni: string,
    email: string,
    phone: string,
    bank: string,
    amount: string,
}

export interface CreateLeadProps {
    seller_id: string | undefined
    seller_name: string | undefined
}