export interface GoldPieces {
  id: string;
  name: string;
  price: number;
  carats: number;
  measures: {
    width: number;
    height: number;
    thickness: number;
  };
  weight: number;
  client_id: string;
  images: [
    {
      name: string;
      data: string;
    }
  ];
}

export interface Articles {
  id: string;
  name: string;
  category: string;
  years_old: number;
  price: number;
  client_id: string;
  quotas:[
    {
      amount: number
      number: number
      state: string
    }
  ]
  images: [
    {
      name: string;
      data: string;
    }
  ];
}
