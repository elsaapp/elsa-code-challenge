import {createAction} from 'typesafe-actions'

export const cleanState = createAction('CLEAN_STATE')

export const changeName = createAction('CHANGE_NAME', action => (name: string) => action({name}))

export const addMedication = createAction(
  'ADD_MEDICATION',
  action => (
    medicationName: string,
    substance: string,
    finished: boolean,
    administered: string,
    dosage: string
  ) => action({medicationName, substance, finished, administered, dosage})
)

export const updateMedication = createAction('DELETE_MEDICATION', action => (id: string) =>
  action({id})
)

export const archiveMedication = createAction(
  'ARCHIVE_MEDICATION',
  action => (
    id: string,
    medicationName: string,
    substance: string,
    finished: boolean,
    administered: string,
    dosage: string,
    date: string
  ) => action({id, medicationName, substance, finished, administered, dosage, date})
)

export const clearState = createAction('CLEAN_STATE')
