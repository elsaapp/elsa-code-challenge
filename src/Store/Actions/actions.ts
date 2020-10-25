import {createAction} from 'typesafe-actions'
import {IMedication} from '~/Store'

export const cleanState = createAction('CLEAN_STATE')

export const changeName = createAction('CHANGE_NAME', action => (name: string) => action({name}))

export const addMedication = createAction(
  'ADD_MEDICATION',
  action => (medicationName: string, substance: string, administered: string, dosage: string) =>
    action({medicationName, substance, administered, dosage})
)

export const pauseMedication = createAction(
  'PAUSE_MEDICATION',
  action => (medication: IMedication) => action({medication})
)

export const archiveMedication = createAction(
  'ARCHIVE_MEDICATION',
  action => (medication: IMedication) => action({medication})
)
