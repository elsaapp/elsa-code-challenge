import {createAction} from 'typesafe-actions'

export const cleanState = createAction('CLEAN_STATE')

export const changeName = createAction('CHANGE_NAME', action => (name: string) => action({name}))

export const addMedication = createAction(
  'ADD_MEDICATION',
  action => (
    medicationName: string,
    substance: string,
    dosage: string,
    modeOfAdministration: string
  ) => action({medicationName, substance, dosage, modeOfAdministration})
)

export const deleteMedication = createAction('DELETE_MEDICATION', action => (name: string) =>
  action({name})
)
