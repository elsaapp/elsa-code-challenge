import {createAction} from 'typesafe-actions'
import {IMedication} from '~/Store'

export const cleanState = createAction('CLEAN_STATE')

export const cleanMedicationList = createAction('CLEAN_MEDICATION_LIST', action => (medicationList: IMedication[]) => action({medicationList}))

export const cleanHistory = createAction('CLEAN_HISTORY')

export const deleteRecord = createAction('DELETE_RECORD', action => (addedAt: string | undefined) => action({addedAt}))

export const changeName = createAction('CHANGE_NAME', action => (name: string) => action({name}))

export const addMedication = createAction(
  'ADD_MEDICATION',
  action => (
    name: string,
    substance: string,
    strength: string,
    dosage: string,
    administratedVia: string,
    startingDate: string
  ) =>
    action({
      name,
      substance,
      strength,
      dosage,
      administratedVia,
      startingDate,
    })
)

export const updateMedication = createAction(
  'UPDATE_MEDICATION',
  action => (
    name: string,
    substance: string,
    strength: string,
    dosage: string,
    administratedVia: string,
    paused: boolean,
    addedAt: string | undefined,
    startingDate: string
  ) =>
    action({
      name,
      substance,
      strength,
      dosage,
      administratedVia,
      paused,
      addedAt,
      startingDate,
    })
)

export const removeMedication = createAction(
  'REMOVE_MEDICATION', 
  action => (
    name: string,
    addedAt: string | undefined,
    substance: string,
    strength: string,
    dosage: string,
    administratedVia: string,
    paused: boolean,
    startingDate: string
  ) => 
  action({
    name,
    addedAt,
    substance,
    strength,
    dosage,
    administratedVia,
    paused,
    startingDate,
  }))