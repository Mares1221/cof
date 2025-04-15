import { IImage } from "@/interfaces/image";

export class Image implements IImage {
  _id: string;
  user: string;
  url: string;
  awsUrl: string;
  thumbnail: string;
  thumbnail64: string;
  extraSmall: string;
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
  height: number;
  width: number;
  rotation: string;
  blurhash: string;

  constructor(json: IImage) {
    this._id = json._id;
    this.user = json.user;
    this.url = json.url;
    this.awsUrl = json.awsUrl;
    this.thumbnail = json.thumbnail;
    this.thumbnail64 = json.thumbnail64;
    this.extraSmall = json.extraSmall;
    this.small = json.small;
    this.medium = json.medium;
    this.large = json.large;
    this.extraLarge = json.extraLarge;
    this.height = json.height;
    this.width = json.width;
    this.rotation = json.rotation;
    this.blurhash = json.blurhash;
  }

  static fromJson(json: any) {
    return new Image(json);
  }
}
