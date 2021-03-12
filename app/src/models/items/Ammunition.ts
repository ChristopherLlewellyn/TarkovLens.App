import { BaseItem } from './BaseItem'
import { DamageSource, Fragmentation, WeaponModifier } from './_shared'

export class Ammunition extends BaseItem implements DamageSource {
  caliber!: string;
  type!: string;
  tracer!: boolean;
  tracerColor!: string;
  subsonic!: boolean;
  velocity!: number;
  ballisticCoef!: number;
  damage!: number;
  penetration!: number;
  armorDamage!: number;
  fragmentation!: Fragmentation;
  projectiles!: number;
  weaponModifier!: WeaponModifier;
}
