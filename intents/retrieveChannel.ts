import {
  TOAUTH2AuthContext,
  FetchData,
  TFetchPromise,
  TFetchActionEvent
} from "@bearer/intents";

import Client from "./client";

import { TChannel } from './ListChannel'

export default class RetrieveChannelIntent extends FetchData
  implements FetchData<ReturnedData, any, TOAUTH2AuthContext> {
  async action(
    event: TFetchActionEvent<Params, TOAUTH2AuthContext>
  ): TFetchPromise<ReturnedData> {
    try {
      const params = event.context.reference;
      const { data: response } = await Client(
        event.context.authAccess.accessToken
      ).get("conversations.info", { params: { channel: params.id } });

      if (response.ok) {
        const { id, name, is_private } = response.channel;
        return {
          data: { id, name, is_private }
        };
      } else {
        return {
          error: `Error while channel info ${JSON.stringify(response)}`
        };
      }
    } catch (e) {
      return { error: e.toString() };
    }
  }
}

export type Params = {
};
export type ReturnedData = TChannel;
