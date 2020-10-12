import type {ActionType} from 'typesafe-actions'

import * as actions from './actions'
export type RootAction = ActionType<typeof actions>

export * from './actions'
