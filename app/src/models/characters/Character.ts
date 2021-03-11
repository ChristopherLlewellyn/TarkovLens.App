import { CharacterType, MapLocation } from './_shared';

export interface Character {
  id: string;
  type: CharacterType;
  name: string;
  nickname: string;
  description: string;
  portrait: string;
  location: MapLocation;
}
