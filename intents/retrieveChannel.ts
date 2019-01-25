import {
  TOAUTH2AuthContext,
  FetchData,
  TFetchPromise,
  TFetchActionEvent
} from "@bearer/intents";

import Client from "./client";

type TSlackChannelPayload = {
  ok: boolean;
  channel: {
    id: string;
    name: string;
    is_private: boolean;
    is_archived: boolean;
  };
};

export default class RetrieveChannelIntent extends FetchData
  implements FetchData<ReturnedData, any, TOAUTH2AuthContext> {
  async action(
    event: TFetchActionEvent<Params, TOAUTH2AuthContext>
  ): TFetchPromise<ReturnedData> {
    try {
      const params = event.params.reference;
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
  reference: any;
};
export type ReturnedData = {
  id: any;
  name: any;
  is_private: any;
};
