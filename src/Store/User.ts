import 'react-native-get-random-values'
import {RootAction} from '~/Store/Actions'
// @ts-ignore
import {v4 as uuidv4} from 'uuid'
import dayjs from 'dayjs'

export type IMedication = {
  id: string
  name: string
  substance: string
  dosage: string
  paused: boolean
  administered: string
  finished: boolean
  endedAt: string
  addedAt: string
}

export type MedicationsState = {
  history: IMedication[]
  medications: IMedication[]
  name: string
}
export const defaultUser = (): MedicationsState => ({
  history: [],
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
      const dateFromNow = new Date()
      return {
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
            addedAt: dayjs(dateFromNow).format('DD/MM/YYYY').toString(),
          },
        ],
      } as MedicationsState
    }
    case 'ARCHIVE_MEDICATION': {
      const {id, medicationName, substance, finished, administered, dosage, date} = action.payload
      const dateFromNow = new Date()
      return {
        ...state,
        medications: state.medications.filter(m => m.id !== id),
        history: [
          ...state.history,
          {
            id: id,
            name: medicationName,
            substance: substance,
            finished: finished,
            dosage: dosage,
            administered: administered,
            addedAt: date,
            endedAt: dayjs(dateFromNow).format('DD/MM/YYYY').toString(),
          },
        ],
      } as MedicationsState
    }
    case 'CLEAN_STATE':
      return defaultUser()
    default:
      return state
  }
}
