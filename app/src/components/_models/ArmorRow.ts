export class ArmorRow {
  id: string;
  shortName: string;
  type: string;
  class: number;
  maxDurability: number;
  image: string;
  backupImage: string;
  price: number;

  constructor (Id: string, ShortName: string, Type: string, Class: number, MaxDurability: number, Image: string, BackupImage: string, Price: number) {
    this.id = Id
    this.shortName = ShortName
    this.type = Type
    this.class = Class
    this.maxDurability = MaxDurability
    this.image = Image
    this.backupImage = BackupImage
    this.price = Price
  }
}
