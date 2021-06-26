export default class CurrencyConvert {
  static rublesToEuro(value: number) {
    return value / 149
  }

  static rublesToDollars(value: number) {
    return value / 128
  }

  static dollarsToRubles(value: number) {
    return value * 128
  }

  static dollarsToEuro(value: number) {
    const rubles = this.dollarsToRubles(value)
    return this.rublesToEuro(rubles)
  }

  static euroToRubles(value: number) {
    return value * 149
  }

  static euroToDollars(value: number) {
    const rubles = this.euroToRubles(value)
    return this.rublesToDollars(rubles)
  }
}
