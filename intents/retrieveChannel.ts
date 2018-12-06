import {
  TOAUTH2AuthContext,
  TSaveStateCallback,
  RetrieveState
} from "@bearer/intents";

export default class RetrieveChannelIntent {
  static intentName: string = "retrieveChannel";
  static intentType: any = RetrieveState;

  static action(
    _context: TOAUTH2AuthContext,
    _params: any,
    body: { clientId: string; clientSecret: string },
    state: any,
    callback: TSaveStateCallback
  ): void {
    callback({
      state: { ...state },
      data: {}
    });
  }
}
