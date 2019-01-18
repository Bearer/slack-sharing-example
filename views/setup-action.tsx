/*
  The purpose of this component is to save scenario credentials.
  This file has been generated automatically and should not be edited.
*/

import {
  RootComponent,
  State,
  Event,
  EventEmitter,
  Element
} from "@bearer/core";
import "@bearer/ui";

export type TSetupPayload = {
  setupId: string;
};

@RootComponent({
  group: "setup",
  role: "action"
})
export class SetupAction {
  @Event()
  saved: EventEmitter<TSetupPayload>;
  @Element() el: HTMLElement;

  onSetupSuccess = (event: any) => {
    this.el.shadowRoot
      .querySelector<HTMLBearerDropdownButtonElement>("bearer-dropdown-button")
      .toggle(false);
    this.saved.emit({ setupId: event.detail.referenceId });
  };

  @State()
  fields = [
    { type: "text", label: "Client ID", controlName: "clientID" },
    { type: "password", label: "Client Secret", controlName: "clientSecret" }
  ];
  render() {
    return (
      <bearer-dropdown-button>
        <span slot="dropdown-btn-content">Setup component</span>
        <bearer-setup
          onSetupSuccess={this.onSetupSuccess}
          scenarioId="BEARER_SCENARIO_ID"
          fields={this.fields}
        />
      </bearer-dropdown-button>
    );
  }
}
