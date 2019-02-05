import {
  TOAUTH2AuthContext,
  SaveState,
  TSaveActionEvent,
  TSavePromise
} from "@bearer/intents";

import { TChannel } from './ListChannel'
export default class SaveChannelIntent extends SaveState implements SaveState<State, ReturnedData, any, TOAUTH2AuthContext> {
  async action(
    event: TSaveActionEvent<State, Params, TOAUTH2AuthContext>
  ): TSavePromise<State, ReturnedData> {
    return {
      state: { id: event.params.channel.id },
      data: { channel: event.params.channel }
    };
  }
}


export type State = {
  id: string
}
export type Params = {
  channel: TChannel
};

export type ReturnedData = {
  channel: TChannel;
}
