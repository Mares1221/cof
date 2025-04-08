import { ICashFlow } from "@/interfaces/cash-flow";
import { ICustomer } from "@/interfaces/customer";

export class CashFlow implements ICashFlow {
  _id: string;
  customer: ICustomer;
  date: string;
  type: string;
  amount: number;
  transactionType: string;
  description: string;
  createdAt: string;
  updatedAt: string;

  constructor(json: ICashFlow) {
    this._id = json._id;
    this._id = json._id;
    this.customer = json.customer;
    this.date = json.date;
    this.type = json.type;
    this.amount = json.amount;
    this.transactionType = json.transactionType;
    this.description = json.description;
    this.createdAt = json.createdAt;
    this.updatedAt = json.updatedAt;
  }

  static fromJson(json: ICashFlow) {
    return new CashFlow(json);
  }
}
