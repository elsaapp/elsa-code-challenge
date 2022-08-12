import {RootAction} from '~/Store/Actions'

export type IMedication = {
  name: string
  substance: string
  dosage: string
  modeOfAdministration: string
  addedAt: string
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
      const {medicationName, substance, dosage, modeOfAdministration} = action.payload
      return {
        ...state,
        medications: [
          ...state.medications,
          {
            name: medicationName,
            substance: substance,
            dosage: dosage,
            modeOfAdministration: modeOfAdministration,
            addedAt: new Date().toISOString(),
          },
        ],
      }
    }
    case 'DELETE_MEDICATION': {
      const {name} = action.payload
      return {
        ...state,
        medications: state.medications.filter(item => item.name !== name),
      }
    }
    case 'CLEAN_STATE':
      return defaultUser()
    default:
      return state
  }
}
