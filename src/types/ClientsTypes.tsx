export interface ClientsInterface {
  id: string;
  name: string;
  last_name: string;
  dob: Date;
  dni: string
  cuil_cuit: string;
  sex: string;
  phone: string;
  email: string
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    province: string;
    cp: string;
  };
  credit_avg: 0;
  bank_data: {
    cbu: string;
    account: string;
    bank_code: string;
    banck_name: string;
  };
  card_data: {
    number: string;
    expire_date: string;
    name_in_card: string;
    security_code: string;
  };
  referents: [
    {
      name: string;
      last_name: string;
      dni: string;
      dob: string;
      relation: string;
      years_old: string;
      sex: string;
      email: string;
      phone: string;
    }
  ];
  seller_id: string
}

export interface PersonalData {
  name: string;
  last_name: string;
  dob: Date;
  cuil_cuit: string;
  sex: string;
  phone: string;
  email: string
  dni: string
  credit_avg: number;
}

export interface AddressData {
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    province: string;
    cp: string;
  };
}

export interface BankData {
  bank_data: {
    cbu: string;
    account: string;
    bank_code: string;
    bank_name: string;
  };
}

export interface CreditCardData {
  card_data: {
    number: string;
    expire_date: string;
    name_in_card: string;
    security_code: string;
  };
}

export interface ReferentsData {
  referents: {
    name: string;
    last_name: string;
    dni: string;
    dob: string;
    relation: string;
    years_old: string;
    sex: string;
    email: string;
    phone: string;
  };
}
