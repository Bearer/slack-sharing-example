import {
  TOAUTH2AuthContext,
  TSaveStatePayload,
  SaveState,
  TSaveActionEvent
} from "@bearer/intents";
import { promises } from "fs";

export default class SaveSetupIntent {
  static intentType = SaveState;

  static async action(
    event: TSaveActionEvent<TOAUTH2AuthContext, State, Params>
  ): Promise<ReturnedData> {
    // const token = event.context.authAccess.accessToken
    // Put your logic here
    return { state: event.params.setup, data: event.params.setup };
  }
}

/**
 * Typing
 */
export type Params = {
  setup: { clientID: string; clientSecret: string };
};

export type State = {
  clientID: string;
  clientSecret: string;
};

export type ReturnedData = TSaveStatePayload<
  State,
  {
    clientID: string;
    clientSecret: string;
  }
>;
