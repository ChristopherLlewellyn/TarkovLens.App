import { ref } from '@vue/composition-api'
import { Ammunition } from 'src/models/items/Ammunition'
import { Armor } from 'src/models/items/Armor'
import { Item } from 'src/models/items/Item'
import { Tacticalrig } from 'src/models/items/Tacticalrig'
import { Kind } from 'src/models/items/_shared'
import Items from 'src/services/Items'

const ItemsService = new Items({})

const ammunitions = ref<Ammunition[]>([])
const armors = ref<Armor[]>([])
const tacticalrigs = ref<Tacticalrig[]>([])

const getItemById = async (id: string) => ItemsService.getById<Item>(id)

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

export default () => ({
  ammunitions,
  armors,
  tacticalrigs,
  getItemById,
  getAllAmmunitions,
  getAllArmors,
  getAllTacticalrigs
})
