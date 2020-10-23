import {RootAction} from '~/Store/Actions'

export type IMedication = {
  name: string
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
      const {medicationName} = action.payload
      return {
        ...state,
        medications: [
          ...state.medications,
          {name: medicationName, addedAt: new Date().toISOString()},
        ],
      }
    }
    case 'REMOVE_MEDICATION': {
      const {medication} = action.payload
      const newList = state.medications.filter(item => item.name !== medication)
      console.log(newList)
      return {
        ...state,
        medications: newList,
      }
    }
    case 'CLEAN_STATE':
      return defaultUser()
    default:
      return state
  }
}
