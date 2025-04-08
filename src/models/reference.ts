import { IReference } from "@/interfaces/reference";

export class Reference implements IReference {
  code: string;
  name: string;

  constructor({ code, name }: IReference) {
    this.code = code;
    this.name = name;
  }

  static fromJson(json: any) {
    return new Reference(json);
  }
}
