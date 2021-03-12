import { Item } from './Item'

export class BaseItem implements Item {
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
  constructor(
    id = '',
    blightBusterIcon = '',
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
    this.id = id
    this.blightbusterIcon = blightBusterIcon
    this._id = _id
    this.name = name
    this.shortName = shortName
    this.description = description
    this._kind = _kind
    this.weight = weight
    this.price = price
    this.maxStack = maxStack
    this.rarity = rarity
    this.lastLowestMarketPrice = lastLowestMarketPrice
    this.avg24hPrice = avg24hPrice
    this.avg7daysPrice = avg7daysPrice
    this.updated = updated
    this.diff24h = diff24h
    this.diff7days = diff7days
    this.icon = icon
    this.wikiLink = wikiLink
    this.img = img
    this.imgBig = imgBig
  }
}
