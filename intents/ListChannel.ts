import { FetchData, TOAUTH2AuthContext } from "@bearer/intents";
import Client from "./client";

type TSlackChannelsPayload = {
  ok: boolean;
  channels: Array<{
    id: string;
    name: string;
    is_private: boolean;
    is_archived: boolean;
  }>;
};
export default class ListChannelIntent {
  static intentType: any = FetchData;

  static async action({ context }: { context: TOAUTH2AuthContext }) {
    try {
      const res = await Client(context.authAccess.accessToken).get(
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
