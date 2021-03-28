export default class Utils {
  static percentageToHsl (percentage: number, hue0: number, hue1: number): string {
    const hue = (percentage * (hue1 - hue0)) + hue0
    return 'hsl(' + hue.toString() + ', 100%, 50%)'
  }

  static percentageToHslWithIndividualValues (percentage: number, hue0: number, hue1: number): HSL {
    const hue = (percentage * (hue1 - hue0)) + hue0
    return { h: hue, s: 100, l: 50 }
  }

  static percentageToRGB (percentage: number, howGreen = 170, howRed = 255): RGB {
    const Red = 255 - (howRed * (percentage / 100))
    const Green = howGreen * (percentage / 100)
    const Blue = 20 
    return { red: Red, green: Green, blue: Blue}
  }

  static hslToHex(h: number, s: number, l: number) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0'); // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  static simulateEventGivenPercentageChance (percentageChance: number): boolean {
    if (percentageChance === 0) {
      return false
    }
    return (Math.random() <= percentageChance / 100)
  }

  static clamp(num: number, a: number, b: number) {
    return Math.max(a, Math.min(b, num))
  }

  static truncate(str: string, n: number) {
    return (str.length > n) ? str.substr(0, n-1) + '..' : str
  }

  static titleCase(str: string): string {
    const splitStr = str.toLowerCase().split(' ')
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
    }
    return splitStr.join(' ')
  }

  static humanizeArmorZones(zones: string[]): string {
    let str = zones.join(', ')
    str = str.replace('head', 'Head')
    str = str.replace('chest', 'Thorax')
    str = str.replace('leftarm', 'Left arm')
    str = str.replace('rightarm', 'Right arm')
    str = str.replace('stomach', 'Stomach')
    str = str.replace('leftleg', 'Left leg')
    str = str.replace('rightleg', 'Right leg')
    return str
  }
}

export interface RGB {
  red: number,
  green: number,
  blue: number
}

export interface HSL {
  h: number,
  s: number,
  l: number
}