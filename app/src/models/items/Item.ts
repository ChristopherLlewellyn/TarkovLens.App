export interface Item {
  id: string;
  blightbusterIcon: string;
  _id: string;
  name: string;
  shortName: string;
  description: string;
  _kind: string;
  weight: number;
  price: number;
  maxStack: number;
  rarity: string;
  lastLowestMarketPrice: number;
  avg24hPrice: number;
  avg7daysPrice: number;
  updated: Date;
  diff24h: number;
  diff7days: number;
  icon: string;
  wikiLink: string;
  img: string;
  imgBig: string;
}

export function defaultItem(): Item {
  return {
    id: '',
    blightbusterIcon: '',
    _id: '',
    name: '',
    shortName: '',
    description: '', 
    _kind: '', 
    weight: 0, 
    price: 0, 
    maxStack: 0, 
    rarity: '', 
    lastLowestMarketPrice: 0,
    avg24hPrice: 0,
    avg7daysPrice: 0,
    updated: new Date(),
    diff24h: 0,
    diff7days: 0,
    icon: '',
    wikiLink: '',
    img: '',
    imgBig: ''
  }
}
