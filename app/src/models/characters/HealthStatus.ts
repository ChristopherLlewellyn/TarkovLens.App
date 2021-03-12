import { BodyPart } from './BodyPart';

export class HealthStatus {
  maxHp: number
  head: BodyPart;
  thorax: BodyPart;
  stomach: BodyPart;
  leftArm: BodyPart;
  rightArm: BodyPart;
  leftLeg: BodyPart;
  rightLeg: BodyPart;

  constructor(
    maxHp = 0,
    head = new BodyPart(),
    thorax = new BodyPart(),
    stomach = new BodyPart(),
    leftArm = new BodyPart(),
    rightArm = new BodyPart(),
    leftLeg = new BodyPart(),
    rightLeg = new BodyPart()) {
    this.maxHp = maxHp
    this.head = head
    this.thorax = thorax
    this.stomach = stomach
    this.leftArm = leftArm
    this.rightArm = rightArm
    this.leftLeg = leftLeg
    this.rightLeg = rightLeg
  }

  public currentHp(): number {
    const currentHp = this.head.currentHp 
      + this.thorax.currentHp + this.stomach.currentHp
      + this.leftArm.currentHp + this.rightArm.currentHp
      + this.leftLeg.currentHp + this.rightLeg.currentHp
    return currentHp
  }
}