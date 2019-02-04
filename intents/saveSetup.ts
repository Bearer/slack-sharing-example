import {
  TOAUTH2AuthContext,
  SaveState,
  TSaveActionEvent,
  TSavePromise
} from "@bearer/intents";

export default class SaveSetupIntent extends SaveState
  implements SaveState<State, ReturnedData, any, TOAUTH2AuthContext> {
  async action(
    event: TSaveActionEvent<State, Params, TOAUTH2AuthContext>
  ): TSavePromise<State, ReturnedData> {
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

export type ReturnedData = {
  clientID: string;
  clientSecret: string;
};
