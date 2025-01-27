import { FullClientInterface } from "./ClientTypes";

export interface InvestmentInterface {
    id?: number
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    starting_capital?: number;
    current_capital?: number;
    rate?: number;
    termn?: number;
    state?: string
    client?: FullClientInterface
  }
  
  export interface InvestmentsData {
    message?: string
    investments?: [
      {
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        id: number
        starting_capital?: number;
        current_capital?: number;
        rate?: number;
        termn?: number;
        state?: string
      }
    ]
    contracts?:[
      {
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        id?: string
        name: string
        data: string
      }
    ]
  }