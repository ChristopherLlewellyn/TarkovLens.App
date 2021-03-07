export class AmmunitionRow {
  id: string;
  shortName: string;
  penetration: number;
  damage: number;
  image: string;
  backupImage: string;

  constructor (Id: string, ShortName: string, Penetration: number, Damage: number, Image: string, BackupImage: string) {
    this.id = Id
    this.shortName = ShortName
    this.penetration = Penetration
    this.damage = Damage
    this.image = Image
    this.backupImage = BackupImage
  }
}
