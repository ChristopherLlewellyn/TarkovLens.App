export class DamageModelIcon {
  headHex: string
  thoraxHex: string
  leftarmHex: string
  rightarmHex: string
  stomachHex: string
  leftlegHex: string
  rightlegHex: string

  constructor(
    headHex: string, 
    thoraxHex: string, 
    leftarmHex: string, 
    rightarmHex: string,
    stomachHex: string,
    leftlegHex: string,
    rightlegHex: string
  ) {
    this.headHex = headHex
    this.thoraxHex = thoraxHex
    this.leftarmHex = leftarmHex
    this.rightarmHex = rightarmHex
    this.stomachHex = stomachHex
    this.leftlegHex = leftlegHex
    this.rightlegHex = rightlegHex
  }
}