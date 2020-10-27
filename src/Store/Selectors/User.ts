import type {IMedication, RootState} from '~/Store'

export const nameSelector = (state: RootState) => state.user.name

export const medicationsSelector = (state: RootState): IMedication[] => state.user.medications

export const medicationSelector = (medicationName: string) => (
  state: RootState
): IMedication | undefined => state.user.medications.find(m => m.name === medicationName)
