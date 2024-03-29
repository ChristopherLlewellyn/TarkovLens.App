import { BaseItem } from './BaseItem'
import { ArmorProperties } from './_shared'

export class Armor extends BaseItem {
  type: ArmorType;
  armor: ArmorProperties;
  blocking: string[];

  constructor(
    type = ArmorType.None,
    armor = new ArmorProperties(),
    blocking: string[] = [],

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
    ) // skipped things we don't need access to yet
    this.type = type
    this.armor = armor
    this.blocking = blocking
  }
}

export enum ArmorType {
  Attachment = 'attachment',
  Body = 'body',
  Helmet = 'helmet',
  Visor = 'visor',
  FaceCover = 'faceCover',
  None = ''
}
