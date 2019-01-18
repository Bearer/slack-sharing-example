import { SaveState } from "@bearer/intents";

export default class SaveChannelIntent {
  static intentType: any = SaveState;

  static action({ params, state }: { params: { channel: any }; state: any }) {
    return {
      state: { ...state, id: params.channel.id },
      data: { channel: params.channel }
    };
  }
}
