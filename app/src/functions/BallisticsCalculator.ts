import Utils from './Utils'

export default class BallisticsCalculator {
  static calculatePenetrationChance(
    armorDurability: number,
    armorMaxDurability: number,
    armorClass: number,
    bulletPenetrationPower: number
  ) {
    if (armorDurability > 0.0) {
      const armorResistance = this.calculateArmorResistance(armorClass, armorDurability, armorMaxDurability)

      const chanceToPenetrate = (armorResistance >= bulletPenetrationPower + 15.0) ? 0.0
        : ((!(armorResistance >= bulletPenetrationPower))
          ? (100.0 + bulletPenetrationPower / (0.9 * armorResistance - bulletPenetrationPower))
          : (0.4 * (armorResistance - bulletPenetrationPower - 15.0) * (armorResistance - bulletPenetrationPower - 15.0)))

      return chanceToPenetrate
    }
    return 100
  }

  static calculateArmorResistance(
    armorClass: number,
    armorDurability: number,
    armorMaxDurability: number
  ) {
    const percentageDurability = (armorDurability / armorMaxDurability) * 100.0
    return (121.0 - 5000.0 / (45.0 + percentageDurability * 2.0)) * (armorClass * 10) * 0.01;
  }

  // --- ARMOR DAMAGE ---
  static calculateDamageToArmorWhenPenetrates(
    penetration: number,
    projectiles: number,
    armorDamage: number,
    armorClass: number,
    armorDestructability: number
  ) {
    const damage = penetration * (armorDamage / 100) * Utils.clamp(penetration / (armorClass * 10), 0.5, 0.9) * armorDestructability
    return Math.max(1.0, damage) * projectiles
  }

  static calculateDamageToArmorWhenDoesNotPenetrate(
    penetration: number,
    projectiles: number,
    armorDamage: number,
    armorClass: number,
    armorDestructability: number
  ) {
    const damage = penetration * (armorDamage / 100) * Utils.clamp(penetration / (armorClass * 10), 0.6, 1.1) * armorDestructability
    return Math.max(1.0, damage) * projectiles
  }

  // --- COMBATANT DAMAGE ---
  static calculateDamageToCombatantWhenPenetrates(
    damage: number,
    penetration: number,
    projectiles: number,
    armorClass: number,
    armorDurability: number,
    armorMaxDurability: number
  ) {
    const armorResistance = this.calculateArmorResistance(armorClass, armorDurability, armorMaxDurability)
    const damageMultiplier = Utils.clamp(penetration / (armorResistance + 12.0), 0.6, 1.0)
    return damage * damageMultiplier * projectiles
  }

  // (blunt damage)
  static calculateDamageToCombatantWhenDoesNotPenetrate(
    damage: number,
    penetration: number,
    projectiles: number,
    armorClass: number,
    armorDurability: number,
    armorMaxDurability: number,
    armorBluntThroughput: number
  ) {
    const armorResistance = this.calculateArmorResistance(armorClass, armorDurability, armorMaxDurability)
    const bluntDamageMultiplier = armorBluntThroughput * Utils.clamp(1.0 - 0.03 * (armorResistance - penetration), 0.2, 1.0);
    return damage * bluntDamageMultiplier * projectiles
  }
}
