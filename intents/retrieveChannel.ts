import { TOAUTH2AuthContext, FetchData } from "@bearer/intents";

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

export default class RetrieveChannelIntent {
  static intentType: any = FetchData;

  static async action({ context }: { context: TOAUTH2AuthContext }) {
    try {
      const { reference: params } = context;
      const { data: response } = await Client(
        context.authAccess.accessToken
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
