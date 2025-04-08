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

  constructor({
    _id,
    user,
    url,
    awsUrl,
    thumbnail,
    thumbnail64,
    extraSmall,
    small,
    medium,
    large,
    extraLarge,
    height,
    width,
    rotation,
    blurhash,
  }: IImage) {
    this._id = _id;
    this.user = user;
    this.url = url;
    this.awsUrl = awsUrl;
    this.thumbnail = thumbnail;
    this.thumbnail64 = thumbnail64;
    this.extraSmall = extraSmall;
    this.small = small;
    this.medium = medium;
    this.large = large;
    this.extraLarge = extraLarge;
    this.height = height;
    this.width = width;
    this.rotation = rotation;
    this.blurhash = blurhash;
  }

  static fromJson(json: any) {
    return new Image(json);
  }
}
