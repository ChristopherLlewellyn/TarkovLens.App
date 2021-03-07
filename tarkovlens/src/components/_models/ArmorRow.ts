export class ArmorRow {
  id: string;
  shortName: string;
  class: number;
  maxDurability: number;
  image: string;
  backupImage: string;

  constructor (Id: string, ShortName: string, Class: number, MaxDurability: number, Image: string, BackupImage: string) {
    this.id = Id
    this.shortName = ShortName
    this.class = Class
    this.maxDurability = MaxDurability
    this.image = Image
    this.backupImage = BackupImage
  }
}
