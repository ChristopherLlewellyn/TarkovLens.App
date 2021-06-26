import { ref } from 'vue'
import { Ammunition } from 'src/models/items/Ammunition'
import { Armor } from 'src/models/items/Armor'
import { Item } from 'src/models/items/Item'
import { Tacticalrig } from 'src/models/items/Tacticalrig'
import { Kind } from 'src/models/items/_shared'
import Items from 'src/services/Items'
import Utils from 'src/functions/Utils'

const ItemsService = new Items({})

const ammunitions = ref<Ammunition[]>([])
const armors = ref<Armor[]>([])
const armorsWithArmoredRigs = ref<Armor[]>([])
const tacticalrigs = ref<Tacticalrig[]>([])

const getItemById = async (id: string) => ItemsService.getById<Item>(id)

const getItemByBsgId = async (id: string) => ItemsService.getByBsgId<Item>(id)

const getItemByName = async (query: string) => ItemsService.getByName(query);

const getAllAmmunitions = async () => {
  const tempAmmunitions = await ItemsService.getByKind<Ammunition>(Kind.Ammunition)
  ammunitions.value = [...tempAmmunitions]
  return tempAmmunitions
}

const getAllArmors = async () => {
  const tempArmors = await ItemsService.getByKind<Armor>(Kind.Armor)
  armors.value = [...tempArmors]
  return tempArmors
}

const getAllTacticalrigs = async () => {
  const tempTacticalrigs = await ItemsService.getByKind<Tacticalrig>(Kind.Tacticalrig)
  tacticalrigs.value = [...tempTacticalrigs]
  return tempTacticalrigs
}

const getAllArmorsWithArmoredRigs = async () => {
  const tempArmors = armors.value.length > 0 ? armors.value : await ItemsService.getByKind<Armor>(Kind.Armor)
  const tempTacticalrigs = tacticalrigs.value.length > 0 ? tacticalrigs.value : await ItemsService.getByKind<Tacticalrig>(Kind.Tacticalrig)
  const armoredRigsConvertedToArmors = Utils.convertArmoredTacticalRigsToArmors(tempTacticalrigs)

  const combined = [...tempArmors, ...armoredRigsConvertedToArmors]
  armorsWithArmoredRigs.value = [...combined]
  return combined
}

export default () => ({
  ammunitions,
  armors,
  armorsWithArmoredRigs,
  tacticalrigs,
  getItemById,
  getItemByBsgId,
  getItemByName,
  getAllAmmunitions,
  getAllArmors,
  getAllTacticalrigs,
  getAllArmorsWithArmoredRigs
})
