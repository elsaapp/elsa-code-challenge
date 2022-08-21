import React from 'react'
import {userInitialState} from '~/State'
import {fireEvent, render} from '~/Utils/test'
import {Start} from './Start'

it('should greet the user', async () => {
  const {findByText} = render(<Start />)

  const header = await findByText(`Hello ${userInitialState.name}!`)

  expect(header).toBeDefined()
})

it('should show an empty list message at first', async () => {
  const {findByText} = render(<Start />)

  const emptyText = await findByText(
    'You have not added any medications yet, please add your medications below.'
  )

  expect(emptyText).toBeDefined()
})

it('should be possible to add new medication', async () => {
  const {findByLabelText, getByLabelText, queryByLabelText, getByText} = render(<Start />)

  const initialMedicineList = queryByLabelText('Medicine item')
  expect(initialMedicineList).toBe(null)

  const input = getByLabelText('input')
  const button = getByText('Add medicine')

  fireEvent.changeText(input, 'Some medicine')
  fireEvent.press(button)

  const {children: listItems} = await findByLabelText('Medicine item')
  expect(listItems.length).toBe(1)
})
