import {RootAction} from '~/Store/Actions'

export type Administration = 'Orally' | 'Injection' | 'Infusion'
export type IStrenght = {
  value: number
  unit: 'mg' | 'g'
}
export type IMedication = {
  name: string
  substance: string
  administration: Administration
  strenght: IStrenght
  addedAt: string
  removedAt?: string
}

export type MedicationsState = {
  medications: IMedication[]
  name: string
}
export const defaultUser = (): MedicationsState => ({
  medications: [],
  name: 'Elsa',
})
export const user = (
  state: MedicationsState = defaultUser(),
  action: RootAction
): MedicationsState => {
  switch (action.type) {
    case 'CHANGE_NAME': {
      const {name} = action.payload
      return {
        ...state,
        name,
      }
    }
    case 'ADD_MEDICATION': {
      const {name, substance, administration, strenght} = action.payload
      return {
        ...state,
        medications: [
          ...state.medications,
          {name, substance, administration, strenght, addedAt: new Date().toISOString()},
        ],
      }
    }
    case 'REMOVE_MEDICATION': {
      const {medicationName} = action.payload
      const existingMedication = state.medications.find(m => m.name === medicationName)

      if (existingMedication) {
        return {
          ...state,
          medications: [
            ...state.medications.filter(m => m.name !== medicationName),
            {...existingMedication, removedAt: new Date().toISOString()},
          ],
        }
      }

      return state
    }
    case 'CLEAN_STATE':
      return defaultUser()
    default:
      return state
  }
}
