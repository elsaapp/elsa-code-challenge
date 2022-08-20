import type {Medication, RootState} from '~/State'

export const nameSelector = (state: RootState) => state.user.name

export const medicationsSelector = (state: RootState): Medication[] => state.user.medications
