import { render } from '@testing-library/react'
import Home from '../src/app/(noAuthenticated)/(authenticationPages)/signIn/page'
import '@testing-library/jest-dom'

describe('Home', () => {
  it('should render screen correctly', () => {
    const screen = render(<Home />)
    expect(screen).toMatchSnapshot()
  })
})
