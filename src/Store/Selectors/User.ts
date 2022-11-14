import type {IMedicationWithId, RootState} from '~/Store'

export const nameSelector = (state: RootState) => state.user.name

// The id shouldnt be the array index in a real application, it would be something constant, like a db id.
// We set it here so we can manipulate the array later without getting worried about loosing the array index.
export const medicationsSelector = (state: RootState): IMedicationWithId[] =>
  state.user.medications.map((m, index) => ({...m, id: index}))
