import {createAction} from 'typesafe-actions'

export const cleanState = createAction('CLEAN_STATE')

export const changeName = createAction('CHANGE_NAME', action => (name: string) => action({name}))

export const addMedication = createAction('ADD_MEDICATION', action => (medicationName: string) =>
  action({medicationName})
)

export const removeMedication = createAction('REMOVE_MEDICATION', action => (medication: string) => action({medication}))