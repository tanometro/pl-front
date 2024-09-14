export interface ClientsInterface {
    id: string,
    name: string,
    last_name: string,
    dob: Date,
    cuil_cuit: string,
    sex: string,
    phone: string,
    address: {
        street: string,
        number: string,
        neighborhood: string,
        city: string,
        province: string,
        cp: string
    },
    credit_avg: 0,
    bank_data: {
        cbu: string,
        account: string,
        bank_code: string,
        banck_name: string
    },
    card_data: {
        number: string,
        expire_date: string,
        name_in_card: string,
        security_code: string
    },
    referents: [
        {
        name: string,
        last_name: string,
        dni: string,
        dob: string,
        relation: string,
        years_old: string,
        sex: string,
        email: string,
        phone: string
        }
    ]
}