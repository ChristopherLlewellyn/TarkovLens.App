export default class Utils {
  static percentageToHsl (percentage: number, hue0: number, hue1: number): string {
    const hue = (percentage * (hue1 - hue0)) + hue0
    return 'hsl(' + hue.toString() + ', 100%, 50%)'
  }

  static percentageToRGB (percentage: number): RGB {
    const Red = 255 - (255 * (percentage / 100))
    const Green = 170 * (percentage / 100)
    const Blue = 0 
    return { red: Red, green: Green, blue: Blue}
  }

  static simulateEventGivenPercentageChance (percentageChance: number): boolean {
    return (Math.random() >= (percentageChance / 100))
  }

  static clamp(num: number, a: number, b: number) {
    return Math.max(a, Math.min(b, num)); 
  }
}

export interface RGB {
  red: number,
  green: number,
  blue: number
}