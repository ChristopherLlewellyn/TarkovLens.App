import { ref } from 'vue'
import { Character } from 'src/models/characters/Character'
import Characters from 'src/services/Characters'
import { CharacterType } from 'src/models/characters/_shared'
import { Combatant } from 'src/models/characters/Combatant'

const CharactersService = new Characters({})

const characters = ref<Character[]>([])
const combatants = ref<Combatant[]>([])

const getCharacterById = async (id: string) => CharactersService.getById<Character>(id)

const getAllCharacters = async () => {
  const tempCharacters = await CharactersService.getAll<Character>()
  characters.value = [...tempCharacters]
  return characters
}

const getCharactersByType = async (type: CharacterType) => {
  const charactersByType = await CharactersService.getByCharacterType<Character>(type)
  return charactersByType
}

const getCombatants = async () => {
  const tempCombatants = await CharactersService.getCombatants()
  combatants.value = [...tempCombatants]
  return combatants
}

export default () => ({
  characters,
  combatants,
  getCharacterById,
  getAllCharacters,
  getCharactersByType,
  getCombatants
})
