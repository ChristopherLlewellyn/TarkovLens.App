import { Character } from './Character';
import { CharacterType, HealthStatus, MapLocation } from './_shared';

export class Combatant implements Character {
  id!: string;
  type!: CharacterType;
  name!: string;
  nickname!: string;
  description!: string;
  portrait!: string;
  location!: MapLocation;
  healthStatus!: HealthStatus;
}
