export interface SellersInterface {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  name: string;
  last_name: string;
  dob: string;
  cuil_cuit: string;
  phone: string;
  dni: string;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    province: string;
    cp: string;
  };
}
