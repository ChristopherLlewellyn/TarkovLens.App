import { BaseItem } from './BaseItem'

export class Backpack extends BaseItem {
  totalSlots = 0;
  grids: BackpackGrid[] = [];

  constructor(
    id = '',
    blightbusterIcon = '',
    _id = '',
    name = '',
    shortName = '',
    description = '', 
    _kind = '', 
    weight = 0, 
    price = 0, 
    maxStack = 0, 
    rarity = '', 
    lastLowestMarketPrice = 0,
    avg24hPrice = 0,
    avg7daysPrice = 0,
    updated = new Date(),
    diff24h = 0,
    diff7days = 0,
    icon = '',
    wikiLink = '',
    img = '',
    imgBig = ''
  ) {
    super(
      id, 
      blightbusterIcon, 
      _id, 
      name, 
      shortName, 
      description, 
      _kind, 
      weight, 
      price, 
      maxStack, 
      rarity, 
      lastLowestMarketPrice,
      avg24hPrice,
      avg7daysPrice,
      updated,
      diff24h,
      diff7days,
      icon,
      wikiLink,
      img,
      imgBig
    )
  }
}

export class BackpackGrid {
  id = '';
  height = 0;
  width = 0;
  maxWeight = 0;

  constructor(id: string, height: number, width: number, maxWeight: number) {
    this.id = id;
    this.height = height;
    this.width = width;
    this.maxWeight = maxWeight;
  }
}