import 'react-native-get-random-values'
import {RootAction} from '~/Store/Actions'
// @ts-ignore
import {v4 as uuidv4} from 'uuid'
import dayjs from 'dayjs'

export type IMedication = {
  id: string
  name: string
  substance: string
  dosage: number
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
            addedAt: dayjs(dateFromNow).format('DD/MM/YYYY').toString(),
          },
        ],
      }
    }
    case 'ARCHIVE_MEDICATION':
      const {medicationName, substance, finished, administered, dosage, date} = action.payload
      const dateFromNow = new Date()
      return <MedicationsState>{
        ...state,
        history: [
          ...state.medications,
          {
            id: uuidv4(),
            name: medicationName,
            substance: substance,
            finished: finished,
            dosage: dosage,
            administered: administered,
            addedAt: date,
            endedAt: dayjs(dateFromNow).format('DD/MM/YYYY').toString(),
          },
        ],
      }
    case 'DELETE_MEDICATION':
      // const id = action.payload
      // return state.medications.filter(m => m.id === id) Ran out of time to fix
      break
    case 'PAUSE_MEDICATION':
      const {paused} = action.payload
      return <MedicationsState>{
        ...state,
        medications: [...state.medications, paused],
      }
    case 'CLEAN_STATE':
      return defaultUser()
    default:
      return state
  }
}
