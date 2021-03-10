import { Item } from './Item'

export class BaseItem implements Item {
  id!: string;
  blightbusterIcon!: string;
  _id!: string;
  name!: string;
  shortName!: string;
  description!: string;
  _kind!: string;
  weight!: number;
  price!: number;
  maxStack!: number;
  rarity!: string;
  lastLowestMarketPrice!: number;
  avg24hPrice!: number;
  avg7daysPrice!: number;
  updated!: Date;
  diff24h!: number;
  diff7days!: number;
  icon!: string;
  wikiLink!: string;
  img!: string;
  imgBig!: string;
}
