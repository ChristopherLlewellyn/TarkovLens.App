import { BaseItem } from './BaseItem'
import { DamageSource, Fragmentation, WeaponModifier } from './_shared'

export class Ammunition extends BaseItem implements DamageSource {
  caliber = '';
  type = '';
  tracer = false;
  tracerColor = '';
  subsonic = false;
  velocity = 0;
  ballisticCoef = 0;
  damage = 0;
  penetration = 0;
  armorDamage = 0;
  fragmentation = new Fragmentation();
  projectiles = 0;
  weaponModifier = new WeaponModifier();
}
