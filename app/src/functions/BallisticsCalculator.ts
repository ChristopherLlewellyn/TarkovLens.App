import Utils from './Utils'

export default class BallisticsCalculator {
  static calculatePenetrationChance(
    armorDurability: number,
    armorMaxDurability: number,
    armorClass: number,
    bulletPenetrationPower: number
  ) {
    if (armorDurability > 0.0) {
      const magicNumber = this.calculateMagicNumber(armorClass, armorDurability, armorMaxDurability)

      const chanceToPenetrate = (magicNumber >= bulletPenetrationPower + 15.0) ? 0.0
        : ((!(magicNumber >= bulletPenetrationPower))
          ? (100.0 + bulletPenetrationPower / (0.9 * magicNumber - bulletPenetrationPower))
          : (0.4 * (magicNumber - bulletPenetrationPower - 15.0) * (magicNumber - bulletPenetrationPower - 15.0)))

      return chanceToPenetrate
    }
    return 100
  }

  static calculateMagicNumber(
    armorClass: number,
    armorDurability: number,
    armorMaxDurability: number
  ) {
    const percentageDurability = (armorDurability / armorMaxDurability) * 100.0
    const resistance = this.getArmorResistance(armorClass)
    return (121.0 - 5000.0 / (45.0 + percentageDurability * 2.0)) * resistance * 0.01;
  }

  static getArmorResistance(armorClass: number) {
    return armorClass * 10
  }

  // --- ARMOR DAMAGE ---
  static calculateDamageToArmorWhenPenetrates(
    penetration: number,
    armorDamage: number,
    armorClass: number,
    armorDestructability: number
  ) {
    const resistance = this.getArmorResistance(armorClass)
    return penetration * armorDamage * Utils.clamp(penetration / resistance, 0.5, 0.9) * armorDestructability
  }

  static calculateDamageToArmorWhenDoesNotPenetrate(
    penetration: number,
    armorDamage: number,
    armorClass: number,
    armorDestructability: number
  ) {
    const resistance = this.getArmorResistance(armorClass)
    return penetration * armorDamage * Utils.clamp(penetration / resistance, 0.6, 1.1) * armorDestructability
  }

  // --- COMBATANT DAMAGE ---
  static calculateDamageToCombatantWhenPenetrates(
    damage: number,
    penetration: number,
    armorClass: number,
    armorDurability: number,
    armorMaxDurability: number
  ) {
    const magicNumber = this.calculateMagicNumber(armorClass, armorDurability, armorMaxDurability)
    const damageMultiplier = Utils.clamp(penetration / (magicNumber + 12.0), 0.6, 1.0)
    return damage * damageMultiplier
  }

  static calculateDamageToCombatantWhenDoesNotPenetrate(
    damage: number,
    penetration: number,
    armorClass: number,
    armorDurability: number,
    armorMaxDurability: number,
    armorBluntThroughput: number
  ) {
    const magicNumber = this.calculateMagicNumber(armorClass, armorDurability, armorMaxDurability)
    const damageMultiplier = armorBluntThroughput * Utils.clamp(1.0 - 0.03 * (magicNumber - penetration), 0.2, 1.0);
    return damage * damageMultiplier
  }
}
