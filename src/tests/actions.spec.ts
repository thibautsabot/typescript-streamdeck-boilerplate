import { Counter } from '../boilerplate-plugin'
import { CounterAction } from '../actions/action'
import FakeApi from './fakeApi'

describe('Test dislike action', () => {
  const counter = new CounterAction(
    new FakeApi() as Counter,
    'com.thibautsabot.streamdeck.boilerplate',
  )

  describe('Test onKeypressUp()', () => {
    it('should set keyPressed to corresponding request data', () => {
      expect(counter.onKeyUp()).toEqual(42)
    })
  })
})
