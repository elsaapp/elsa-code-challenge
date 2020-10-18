import type {IMedication, RootState} from '~/Store'

export const nameSelector = (state: RootState) => state.user.name

export const medicationsSelector = (state: RootState): IMedication[] => state.user.medications

export const historySelector = (state: RootState): IMedication[] => state.user.history
