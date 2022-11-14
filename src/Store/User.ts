import {RootAction} from '~/Store/Actions'

export enum AdministrationVariants {
  ORALLY = 'ORALLY',
  INJECTION = 'INJECTION',
  INFUSION = 'INFUSION',
  OTHER = 'OTHER',
}

export enum UnitVariants {
  ML = 'ML',
  MG = 'MG',
}

export enum MedicationProps {
  BRAND_NAME = 'brandName',
  SUBSTANCE = 'substance',
  STRENGTH = 'strength',
  ADMINISTRATION = 'administration',
  INTERVAL = 'interval',
}

export type MedicationStrength = {
  value: number
  unit: UnitVariants
}

// Why the I?
export type IMedication = {
  [MedicationProps.BRAND_NAME]: string
  [MedicationProps.SUBSTANCE]: string
  [MedicationProps.STRENGTH]: MedicationStrength
  [MedicationProps.ADMINISTRATION]: AdministrationVariants
  [MedicationProps.INTERVAL]: number
  addedAt: string
  deletedAt?: string
  medicineIntakes?: string[]
}

export type IMedicationWithId = IMedication & {id: number}

export type MedicationFormData = Omit<IMedication, 'addedAt' | 'medicineIntakes' | 'deletedAt'>

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
      const {medication} = action.payload
      return {
        ...state,
        medications: [
          ...state.medications,
          {
            ...medication,
            addedAt: new Date().toISOString(),
            deletedAt: undefined,
            medicineIntakes: [],
          },
        ],
      }
    }
    case 'DELETE_MEDICATION': {
      const {indexToDelete} = action.payload
      return {
        ...state,
        medications: [
          ...state.medications.map((medication, index) => {
            return indexToDelete === index
              ? {
                  ...medication,
                  deletedAt: new Date().toISOString(),
                }
              : medication
          }),
        ],
      }
    }
    case 'CLEAN_STATE':
      return defaultUser()
    default:
      return state
  }
}
