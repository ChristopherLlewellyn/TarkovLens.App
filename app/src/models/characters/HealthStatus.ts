import { BodyPart } from './BodyPart';

export interface HealthStatus {
  maxHp: number
  currentHp: number;
  head: BodyPart;
  thorax: BodyPart;
  stomach: BodyPart;
  leftArm: BodyPart;
  rightArm: BodyPart;
  leftLeg: BodyPart;
  rightLeg: BodyPart;
}