import { TOAUTH2AuthContext, FetchData, TFetchActionEvent, TFetchPromise } from '@bearer/intents'
import Client from './client'

export default class SubscribeUserIntent extends FetchData implements FetchData<ReturnedData, any, TOAUTH2AuthContext> {
    async action(event: TFetchActionEvent<TShareParams, TOAUTH2AuthContext>): TFetchPromise<ReturnedData> {
        const channel = event.context.channel
        try {
            if (!channel) {
                throw new MissingChannel()
            }
            if (!event.params.message) {
                throw new MissingMessage()
            }

            const { data } = await Client(event.context.authAccess.accessToken).post(
                `chat.postMessage`,
                {
                    channel: channel.id,
                    text: event.params.message,
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

/**
 * Typing
 */
type TShareParams = {
    message: string;
};

export type ReturnedData = any

type TShareContext = {
  channel: {
    id: string;
  };
};

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
