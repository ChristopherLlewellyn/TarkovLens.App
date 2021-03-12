export class BodyPart {
  maxHp: number;
  currentHp: number;
  isVital: boolean;

  constructor(maxHp = 0, currentHp = 0, isVital = false) {
    this.maxHp = maxHp
    this.currentHp = currentHp
    this.isVital = isVital
  }
}