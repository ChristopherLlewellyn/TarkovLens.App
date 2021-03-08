export class AmmunitionRow {
  id: string;
  shortName: string;
  caliber: string;
  penetration: number;
  damage: number;
  image: string;
  backupImage: string;
  price: number;

  constructor (Id: string, ShortName: string, Caliber: string, Penetration: number, Damage: number, Image: string, BackupImage: string, Price: number) {
    this.id = Id
    this.shortName = ShortName
    this.caliber = Caliber
    this.penetration = Penetration
    this.damage = Damage
    this.image = Image
    this.backupImage = BackupImage
    this.price = Price
  }
}
