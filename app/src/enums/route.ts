export enum SimulatorRouteName {
    PenetrationChance = 'SIMULATOR_PENETRATION_CHANCE',
    Damage = 'SIMULATOR_DAMAGE'
}

export enum SimulatorRoutePath {
    PenetrationChance = '/simulator/penetration-chance',
    Damage = '/simulator/damage'
}

export enum CalculatorRouteName {
    CurrencyConvert = 'CALCULATOR_CURRENCY_CONVERT',
    MarketFeeCalculator = 'FLEA_FEE_CALCULATOR'
}

export enum CalculatorRoutePath {
    CurrencyConvert = '/calculator/currency-converter',
    MarketFeeCalculator = '/calculator/market-fee'
}

export enum ItemsRouteName {
    Items = 'ITEMS',
    Kind = 'ITEMS_KIND',
    Details = ':ITEMS_DETAILS'
}

export enum ItemsRoutePath {
    Items = '/items',
    Kind = '/items/:kind',
    Details = '/items/:kind/:id'
}
