import { FetchData, TOAUTH2AuthContext } from "@bearer/intents";
import Client from "./client";

type TShareParams = {
  authId: string;
  channelId: string;
};

type TShareContext = {
  channel: {
    id: string;
  };
};

type TShareBody = {
  message: string;
};

export default class ShareIntent {
  static intentType: any = FetchData;

  static async action({
    context,
    params
  }: {
    context: TOAUTH2AuthContext & TShareContext;
    params: TShareBody;
  }) {
    const channel = context.channel;
    try {
      if (!channel) {
        throw new MissingChannel();
      }
      if (!params.message) {
        throw new MissingMessage();
      }

      const { data } = await Client(context.authAccess.accessToken).post(
        `chat.postMessage`,
        {
          channel: channel.id,
          text: params.message,
          as_user: false,
          parse: "full"
        }
      );

      return { data };
    } catch (error) {
      return { error: error.toString() };
    }
  }
}

class MissingChannel extends Error {
  constructor() {
    super();
    this.name = "MissingChannel";
    this.message = "No channel present";
  }
}

class MissingMessage extends Error {
  constructor() {
    super();
    this.name = "MissingMessage";
    this.message = "No message to share";
  }
}
