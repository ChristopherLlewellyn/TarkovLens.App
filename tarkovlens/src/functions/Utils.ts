export default class Utils {
  static percentageToHsl (percentage: number, hue0: number, hue1: number): string {
    const hue = (percentage * (hue1 - hue0)) + hue0
    return 'hsl(' + hue.toString() + ', 100%, 50%)'
  }
}
