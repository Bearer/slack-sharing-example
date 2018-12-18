import { TOAUTH2AuthContext, TFetchDataCallback, RetrieveState } from '@bearer/intents'

import Client from './client'

type TSlackChannelPayload = {
  ok: boolean
  channel: { id: string; name: string; is_private: boolean; is_archived: boolean }
}

export default class RetrieveChannelIntent {
  static intentName: string = 'retrieveChannel'
  static intentType: any = RetrieveState

  static action(context: TOAUTH2AuthContext, params: any, body: any, callback: TFetchDataCallback): void {
    Client(context.authAccess.accessToken)
      .get('conversations.info', { params: { channel: body.id } })
      .then((response: { data: TSlackChannelPayload }) => {
        if (response.data.ok) {
          const { id, name, is_private } = response.data.channel
          callback({
            data: { id, name, is_private }
          })
        } else {
          callback({ error: `Error while channel info ${JSON.stringify(response.data)}` })
        }
      })
      .catch(e => {
        console.log('[BEARER]', 'e', e)
        callback({
          error: e.toString()
        })
      })
  }
}
