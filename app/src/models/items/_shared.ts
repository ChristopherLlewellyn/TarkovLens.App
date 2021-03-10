export interface Fragmentation {
  chance: number;
  min: number;
  max: number;
}

export interface WeaponModifier {
  accuracy: number;
  recoil: number;
}

export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface Material {
  name: string;
  destructability: number;
}

export interface ArmorProperties {
  class: number;
  durability: number;
  material: Material;
  bluntThroughput: number;
  zones: string[];
}

export enum Kind {
  Ammunition = 'Ammunition',
  Armor = 'Armor',
  Backpack = 'Backpack',
  Barter = 'Barter',
  Clothing = 'Clothing',
  Common = 'Common',
  Container = 'Container',
  Firearm = 'Firearm',
  Food = 'Food',
  Grenade = 'Grenade',
  Headphone = 'Headphone',
  Key = 'Key',
  Magazine = 'Magazine',
  Map = 'Map',
  Medical = 'Medical',
  Melee = 'Melee',
  Modification = 'Modification',
  ModificationBarrel = 'ModificationBarrel',
  ModificationBipod = 'ModificationBipod',
  ModificationCharge = 'ModificationCharge',
  ModificationDevice = 'ModificationDevice',
  ModificationForegrip = 'ModificationForegrip',
  ModificationGasblock = 'ModificationGasblock',
  ModificationGoggles = 'ModificationGoggles',
  ModificationHandguard = 'ModificationHandguard',
  ModificationLauncher = 'ModificationLauncher',
  ModificationMount = 'ModificationMount',
  ModificationMuzzle = 'ModificationMuzzle',
  ModificationPistolgrip = 'ModificationPistolgrip',
  ModificationReceiver = 'ModificationReceiver',
  ModificationSight = 'ModificationSight',
  ModificationSightSpecial = 'ModificationSightSpecial',
  ModificationStock = 'ModificationStock',
  Money = 'Money',
  Tacticalrig = 'Tacticalrig'
}
