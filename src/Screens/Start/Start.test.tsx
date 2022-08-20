import React from 'react'
import {userInitialState} from '~/State'
import {render} from '~/Utils/test'
import {Start} from './Start'

it('should greet the user', async () => {
  const {findByText} = render(<Start />)

  const header = await findByText(`Hello ${userInitialState.name}!`)

  expect(header).toBeDefined()
})
