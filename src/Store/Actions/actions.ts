import {createAction} from 'typesafe-actions'
import {Administration, IStrenght} from '../User'

export const cleanState = createAction('CLEAN_STATE')

export const changeName = createAction('CHANGE_NAME', action => (name: string) => action({name}))

export const addMedication = createAction(
  'ADD_MEDICATION',
  action => (
    name: string,
    substance: string,
    administration: Administration,
    strenght: IStrenght
  ) => action({name, substance, administration, strenght})
)

export const removeMedication = createAction(
  'REMOVE_MEDICATION',
  action => (medicationName: string) => action({medicationName})
)
