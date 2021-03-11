export enum CharacterType {
  PMC,
  Scav,
  Raider,
  Boss,
  BossFollower,
  Cultist,
  Trader
}

export enum MapLocation {
  All,
  Multiple,
  Unknown,
  Other,
  Factory,
  Customs,
  Town,
  StreetsOfTarkov,
  Terminal,
  Interchange,
  Woods,
  Reserve,
  Shoreline,
  TheLab,
  Lighthouse,
  Suburbs
}

export interface HealthStatus {
  maxHp: number;
  currentHp: number;
  head: BodyPart;
  thorax: BodyPart;
  stomach: BodyPart;
  leftArm: BodyPart;
  rightArm: BodyPart;
  leftLeg: BodyPart;
  rightLeg: BodyPart;
}

export interface BodyPart {
  maxHp: number;
  currentHp: number;
  isVital: boolean;
}