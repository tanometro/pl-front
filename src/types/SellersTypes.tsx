export interface SellersInterface {
    user_id: string,
    name: string,
    last_name: string,
    dob: Date,
    cuil_cuit: string,
    phone: string,
    address: {
      street: string,
      number: string,
      neighborhood: string,
      city: string,
      province: string,
      cp: string,
    }
}