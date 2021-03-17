import { Boilerplate } from '../boilerplate-plugin'
import { BoilerplateAction } from '../actions/action'
import FakeApi from './fakeApi'

describe('Test dislike action', () => {
  const boilerplate = new BoilerplateAction(
    new FakeApi() as Boilerplate,
    'com.thibautsabot.streamdeck.boilerplate',
  )

  describe('Test onKeypressUp()', () => {
    it('should set keyPressed to corresponding request data', () => {
      expect(boilerplate.onKeyUp()).toEqual(42)
    })
  })
})
