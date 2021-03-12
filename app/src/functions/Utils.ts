export default class Utils {
  static percentageToHsl (percentage: number, hue0: number, hue1: number): string {
    const hue = (percentage * (hue1 - hue0)) + hue0
    return 'hsl(' + hue.toString() + ', 100%, 50%)'
  }

  static simulateEventGivenPercentageChance (percentageChance: number): boolean {
    return (Math.random() >= (percentageChance / 100))
  }

  static clamp(num: number, a: number, b: number) {
    return Math.max(a, Math.min(b, num)); 
  }
}
