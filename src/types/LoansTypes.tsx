import { ClientsInterface } from "./ClientsTypes";

export interface LoansData {
  message?: string;
  loans?: [
    {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      deletedAt: Date;
      amount: number;
      state: string;
      plan: number;
      type: string;
      quotas: [
        {
          id: string;
          createdAt: Date;
          updatedAt: Date;
          deletedAt: Date;
          amount: number;
          period: number;
          state: string;
          punitive: number;
        }
      ];
    }
  ];
}

export interface LoansInterface {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  amount: number;
  state: string;
  plan: number;
  type: string;
  quotas: [
    {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      deletedAt: Date;
      amount: number;
      period: number;
      state: string;
      punitive: number;
    }
  ];
  client: ClientsInterface
}

export interface QuotaInterface {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  amount: number;
  period: number;
  state: string;
  punitive: number;
}
