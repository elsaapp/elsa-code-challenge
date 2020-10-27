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
  pausedAt: string
}

export type MedicationsState = {
  history: IMedication[]
  medications: IMedication[]
  name: string
  calendarId: string
}
export const defaultUser = (): MedicationsState => ({
  history: [],
  medications: [],
  name: 'Elsa',
  calendarId: '',
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
      const {medicationName, substance, administered, dosage} = action.payload
      return {
        ...state,
        medications: [
          ...state.medications,
          {
            id: uuidv4(),
            name: medicationName,
            substance: substance,
            finished: false,
            paused: false,
            dosage: dosage,
            administered: administered,
            addedAt: dayjs(new Date()).format('DD/MM/YYYY').toString(),
            endedAt: null,
            pausedAt: null,
          },
        ],
      } as MedicationsState
    }
    case 'PAUSE_MEDICATION': {
      const {medication} = action.payload
      const pausedMeds = state.medications.filter(m => m.id === medication.id)
      return {
        ...state,
        medications: [
          ...state.medications.filter(m => m.id !== medication.id),
          {
            id: pausedMeds[0].id,
            name: pausedMeds[0].name,
            substance: pausedMeds[0].substance,
            finished: pausedMeds[0].finished,
            paused: true,
            dosage: pausedMeds[0].dosage,
            administered: pausedMeds[0].administered,
            addedAt: pausedMeds[0].addedAt,
            endedAt: pausedMeds[0].endedAt,
            pausedAt: dayjs(new Date()).format('DD/MM/YYYY').toString(),
          },
        ],
        history: [...state.history],
      } as MedicationsState
    }
    case 'RESTART_MEDICATION': {
      const {medication} = action.payload
      const pausedMeds = state.medications.filter(m => m.id === medication.id)

      return {
        ...state,
        medications: [
          ...state.medications.filter(m => m.id !== medication.id),
          {
            id: pausedMeds[0].id,
            name: pausedMeds[0].name,
            substance: pausedMeds[0].substance,
            finished: pausedMeds[0].finished,
            paused: false,
            dosage: pausedMeds[0].dosage,
            administered: pausedMeds[0].administered,
            addedAt: pausedMeds[0].addedAt,
            endedAt: pausedMeds[0].endedAt,
            pausedAt: null,
          },
        ],
        history: [...state.history],
      } as MedicationsState
    }
    case 'ARCHIVE_MEDICATION': {
      const {medication} = action.payload
      const dateFromNow = new Date()
      return {
        ...state,
        medications: state.medications.filter(m => m.id !== medication.id),
        history: [
          ...state.history,
          {
            id: medication.id,
            name: medication.name,
            substance: medication.substance,
            finished: true,
            dosage: medication.dosage,
            administered: medication.administered,
            addedAt: medication.addedAt,
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
