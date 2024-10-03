export interface FullClientInterface {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  name: string;
  last_name: string;
  dob: string;
  dni: string;
  cuil_cuit: string;
  email: string;
  sex: string;
  phone: string;
  profile_image: string;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    province: string;
    cp: string;
  } | null;
  referents:
    | [
        {
          name: string;
          last_name: string;
          dni: string;
          dob: string;
          phone: string;
          relation: string;
          email: string;
          years_old: string;
          sex: string;
        }
      ]
    | null;
  bank_data: {
    cbu: string;
    account: string;
    bank_code: string;
    banck_name: string;
  } | null;
  job_data: {
    social_rason: string;
    cuit: string;
    entry_date: string;
    gross_salary: string;
    bank: string;
    job_address: string;
    job_phone: string;
  } | null;
  card_data: {
    number: string;
    expire_date: string;
    name_in_card: string;
    security_code: string;
  } | null;
  credit_avg: number;
  loans: [
    {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      deletedAt: Date | null;
      amount: number;
      state: string;
      plan: number;
      type: string;
      quotas: [
        {
          id: string;
          createdAt: Date;
          updatedAt: Date;
          deletedAt: Date | null;
          amount: number;
          period: number;
          state: string;
          punitive: number;
        }
      ];
    }
  ];
  investments: [
    {
      id: string;
      starting_capital: number;
      current_capital: number;
      rate: number;
      termn: number;
      client: object;
    }
  ];
  payments: [];
  images: [];
}
