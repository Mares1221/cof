import { IContract } from "@/interfaces/contract";

export class Contract implements IContract {
  file: any;
  name: string;
  _id: string;

  constructor(json: IContract) {
    this.file = json.file;
    this.name = json.name;
    this._id = json._id;
  }

  static fromJson(json: IContract) {
    return new Contract(json);
  }
}
