import { Item } from 'src/models/items/Item';

export default class MarketFeeCalculator {
  static calculateFee(listedPrice: number, item: Item): number {
    const offerValue = item.price
    let offerModifier = Math.log10(offerValue / listedPrice)
    let listedPriceModifier = Math.log10(listedPrice / offerValue)

    if (listedPrice >= offerValue) {
      listedPriceModifier = Math.pow(listedPriceModifier, 1.08)
    }
    else {
      offerModifier = Math.pow(offerModifier, 1.08)
    }

    const fee = offerValue * 0.05 * Math.pow(4, offerModifier) + listedPrice * 0.05 * Math.pow(4, listedPriceModifier)
    return fee
  }
}