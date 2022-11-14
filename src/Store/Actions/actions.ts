import {createAction} from 'typesafe-actions'
import {MedicationFormData} from '~/Store/User'

export const cleanState = createAction('CLEAN_STATE')

export const changeName = createAction('CHANGE_NAME', action => (name: string) => action({name}))

export const addMedication = createAction(
  'ADD_MEDICATION',
  action => (medication: MedicationFormData) => action({medication})
)

export const deleteMedication = createAction(
  'DELETE_MEDICATION',
  action => (indexToDelete: number) => {
    return action({indexToDelete})
  }
)
