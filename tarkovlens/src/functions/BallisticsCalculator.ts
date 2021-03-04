export default class BallisticsCalculator {
  static calculatePenetrationChance (
    armorDurability: number,
    maxDurability: number,
    armorClass: number,
    bulletPenetrationPower: number
  ): number {
    if (armorDurability > 0.0) {
      const percentageDurability = (armorDurability / maxDurability) * 100.0
      const resistance = armorClass * 10
      const magicNumber = (121.0 - 5000.0 / (45.0 + percentageDurability * 2.0)) * resistance * 0.01

      const chanceToPenetrate = (magicNumber >= bulletPenetrationPower + 15.0) ? 0.0
        : ((!(magicNumber >= bulletPenetrationPower))
          ? (100.0 + bulletPenetrationPower / (0.9 * magicNumber - bulletPenetrationPower))
          : (0.4 * (magicNumber - bulletPenetrationPower - 15.0) * (magicNumber - bulletPenetrationPower - 15.0)))

      return chanceToPenetrate
    }
    return 0
  }
}
