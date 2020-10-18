import {RootAction} from '~/Store/Actions'
// @ts-ignore
import {v4 as uuidv4} from 'uuid'

export type IMedication = {
  name: string
  substance: string
  dosage: number
  administered: string
  finished: boolean
  endedAt: string
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
      const {medicationName, substance, finished, administered, dosage} = action.payload
      return <MedicationsState>{
        ...state,
        medications: [
          ...state.medications,
          {
            id: uuidv4(),
            name: medicationName,
            substance: substance,
            finished: finished,
            dosage: dosage,
            administered: administered,
            addedAt: new Date(),
          },
        ],
      }
    }
    case 'CLEAN_STATE':
      return defaultUser()
    default:
      return state
  }
}
