import {RootAction} from '~/Store/Actions'

export type IMedication = {
  name: string
  substance: string
  strength: string
  dosage: string
  administratedVia: string
  addedAt?: string
  paused: boolean
  startingDate: string
}

export type MedicationsState = {
  medications: IMedication[]
  medicationHistory: IMedication[]
  name: string
}
export const defaultUser = (): MedicationsState => ({
  medications: [],
  medicationHistory: [],
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
      const {name, substance, strength, dosage, administratedVia, startingDate} = action.payload
      return {
        ...state,
        medications: [
          ...state.medications,
          {
            name: name,
            addedAt: new Date().toISOString(),
            substance: substance,
            strength: strength,
            dosage: dosage,
            administratedVia: administratedVia,
            paused: false,
            startingDate: startingDate,
          },
        ],
      }
    }
    case 'UPDATE_MEDICATION': {
      const {
        name,
        addedAt,
        substance,
        strength,
        dosage,
        administratedVia,
        paused,
        startingDate,
      } = action.payload
      return {
        ...state,
        medications: state.medications
          .filter(item => item.addedAt !== addedAt)
          .concat([
            {
              name,
              addedAt,
              substance,
              strength,
              dosage,
              administratedVia,
              paused,
              startingDate,
            },
          ]),
      }
    }
    case 'REMOVE_MEDICATION': {
      const {name, addedAt, substance, strength, dosage, administratedVia, paused, startingDate} = action.payload
      return {
        ...state,
        medications: state.medications.filter(item => item.addedAt !== addedAt),
        medicationHistory: [
          ...state.medicationHistory,
          {
            name: name,
            addedAt: addedAt,
            substance: substance,
            strength: strength,
            dosage: dosage,
            administratedVia: administratedVia,
            paused: paused,
            startingDate: startingDate,
          },
        ],
      }
    }
    case 'DELETE_RECORD': {
      const {addedAt} = action.payload
      return {
        ...state,
        medicationHistory: state.medicationHistory.filter(item => item.addedAt !== addedAt),
      }
    }
    case 'CLEAN_STATE':
      return defaultUser()
    case 'CLEAN_MEDICATION_LIST':
      return {...state, medications: []}
    case 'CLEAN_HISTORY':
      return {...state, medicationHistory: []}
    default:
      return state
  }
}
