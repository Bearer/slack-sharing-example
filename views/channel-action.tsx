import { Prop, Element, RootComponent, Intent, State, BearerFetch, Listen, Output, BearerRef } from '@bearer/core'
import '@bearer/ui'

import fuzzysearch from './fuzzy'
import Search from './components/IconSearch'
import { TChannel } from './types'

@RootComponent({
  role: 'action',
  group: 'channel'
})
export class ChannelAction {
  @Output() channel: BearerRef<TChannel>
  @Intent('ListChannel')
  listChannel: BearerFetch

  @Prop({ mutable: true })
  authId: string

  @State()
  channels: Array<TChannel> = []

  @State()
  suggestions: Array<TChannel> = []

  @State()
  loading: boolean = true

  @State()
  fetchingChannels: boolean = false
  @State()
  editMode: boolean = false
  @State()
  selected: number = null

  @State()
  input: string

  @Element()
  el: HTMLElement

  componentDidLoad() {
    document.addEventListener('click', () => {
      this.editMode = false
    })
  }

  @Listen('body:connect:authorized')
  handler(event) {
    this.authId = event.detail.authId
    this.suggestions = []
  }

  attachChannel = (channel: TChannel): void => {
    this.editMode = false
    this.channel = channel
    this.selected = null
  }

  toggleEdit = () => {
    this.editMode = !this.editMode
  }

  onFocus = (index: number) => () => {
    this.selected = index
  }

  onKeyPress = e => {
    switch (e.key) {
      case 'Escape': {
        this.editMode = false
        break
      }
      case 'Enter': {
        if (this.selected >= 0) {
          this.attachChannel(this.suggestions[this.selected])
        }
        break
      }
      case 'ArrowDown': {
        this.selected = Math.min(this.selected + 1, this.suggestions.length - 1)
        break
      }
      case 'ArrowUp': {
        this.selected = Math.max(this.selected - 1, 0)
        break
      }
    }
  }

  onInputFocused = () => {
    this.editMode = true
    if (!Boolean(this.suggestions.length)) {
      this.fetchingChannels = true
      this.listChannel({ authId: this.authId })
        .then(({ data }: { data: Array<{ id: string; name: string; is_private: boolean }> }) => {
          this.suggestions = this.channels = data
        })
        .catch(console.error)
        .then(() => {
          this.fetchingChannels = false
        })
    }
  }

  filter = event => {
    this.input = event.target.value
    const matcher = this.input.toLocaleLowerCase()
    this.suggestions = [...this.channels.filter(c => fuzzysearch(matcher, c.name.toLocaleLowerCase()))]
    this.selected = 0
  }

  onClick = (event: Event) => {
    event.stopImmediatePropagation()
  }

  render() {
    if (this.channel && !this.editMode) {
      return (
        <div onClick={this.onClick}>
          <selected-channel channel={this.channel} onEditClick={this.toggleEdit} />
        </div>
      )
    } else {
      const hasSuggestions = Boolean(this.suggestions.length)
      const showContainer = this.editMode && (hasSuggestions || this.fetchingChannels)
      return (
        <div class="channel-root" onClick={this.onClick}>
          <div>
            <Search className="search-icon" />
            <input
              autocomplete="off"
              id="input"
              placeholder="Search for a channel"
              onKeyUp={this.filter}
              value={this.input}
              onFocus={this.onInputFocused}
              onKeyDown={this.onKeyPress}
            />
          </div>
          {showContainer && (
            <div class="suggestion-container">
              {this.fetchingChannels && <bearer-loading />}
              {!this.fetchingChannels && hasSuggestions && (
                <ul>
                  {this.suggestions.map((c, index) => (
                    <li
                      class={this.selected === index ? 'selected' : ''}
                      onClick={() => {
                        this.attachChannel(c)
                      }}
                      onMouseEnter={this.onFocus(index)}
                    >
                      {c.is_private ? <channel-lock /> : '#'}
                      {c.name}
                      <button onFocus={this.onFocus(index)}>Select</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )
    }
  }
}
