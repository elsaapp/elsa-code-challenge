import {createSlice, PayloadAction} from '@reduxjs/toolkit'
export * from './selectors'

export type Medication = {
  name: string
  addedAt: string
}

type UserState = {
  medications: Medication[]
  name: string
}

export const userInitialState: UserState = {
  name: 'Elsa',
  medications: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    changeName: (state, {payload: name}: PayloadAction<string>) => ({
      ...state,
      name,
    }),
    addMedication: (state, {payload: name}: PayloadAction<string>) => {
      state.medications.push({name, addedAt: new Date().toISOString()})
    },
    cleanState: () => userInitialState,
  },
})

export const {changeName, addMedication, cleanState} = userSlice.actions
