import {
  FetchData,
  TOAUTH2AuthContext,
  TFetchActionEvent,
  TFetchPromise
} from "@bearer/intents";
import Client from "./client";

export type TChannel = {
  id: string;
  name: string;
  is_private: boolean;
}

export default class ListChannelIntent extends FetchData
  implements FetchData<ReturnedData, any, TOAUTH2AuthContext> {
  async action(
    event: TFetchActionEvent<Params, TOAUTH2AuthContext>
  ): TFetchPromise<ReturnedData> {
    try {
      const res = await Client(event.context.authAccess.accessToken).get(
        "conversations.list",
        { params: { types: "public_channel,private_channel" } }
      );
      const { data: response } = res;
      if (response.ok) {
        return {
          data: response.channels
            .filter(({ is_archived }) => !is_archived)
            .map(({ id, name, is_private }) => ({ id, name, is_private }))
        };
      } else {
        return {
          error: `Error while fetching users ${JSON.stringify(response.data)}`
        };
      }
    } catch (e) {
      return { error: e.toString() };
    }
  }
}

export type Params = {};

export type ReturnedData = {
  ok: boolean;
  channels: TChannel[];
}
