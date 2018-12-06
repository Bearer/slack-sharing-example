import { SaveState, TOAUTH2AuthContext, TSaveStateCallback } from '@bearer/intents'

export default class RetrieveSetupIntent {
  static intentName: string = 'retrieveSetup'
  static intentType: any = SaveState

  static action(
    _context: TOAUTH2AuthContext,
    _params: any,
    body: { clientId: string, clientSecret: string },
    state: any,
    callback: TSaveStateCallback
  ): void {
    callback({
      state: { ...state, },
      data: { clientId: "abc", clientSecret: "xyz" }
    })
  }
}
