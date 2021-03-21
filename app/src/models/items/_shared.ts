import { Hitbox } from '../characters/Hitbox';

export interface DamageSource {
  id: string,
  damage: number;
  penetration: number;
  projectiles: number;
  armorDamage: number;
  fragmentation: Fragmentation;
}

export class Fragmentation {
  chance = 0;
  min = 0;
  max = 0;
}

export class WeaponModifier {
  accuracy = 0;
  recoil = 0;
}

export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export class Material {
  name: string;
  destructibility: number;

  constructor(name = '', destructability = 0) {
    this.name = name
    this.destructibility = destructability
  }
}

export class ArmorProperties {
  class: number;
  durability: number;
  material: Material;
  bluntThroughput: number;
  zones: Hitbox[];

  constructor(
    armorClass = 0, 
    durability = 0, 
    material = new Material(), 
    bluntThroughput = 0, 
    zones: Hitbox[] = []) {
    this.class = armorClass
    this.durability = durability
    this.material = material
    this.bluntThroughput = bluntThroughput
    this.zones = zones
  }
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
