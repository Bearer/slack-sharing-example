/*
  The purpose of this component is to save scenario credentials.
  This file has been generated automatically and should not be edited.
*/

import { RootComponent, State, Event, EventEmitter, Prop } from "@bearer/core";
import "@bearer/ui";

export type TSetupPayload = {
  setupId: string;
};

@RootComponent({
  group: "setup",
  role: "action"
})
export class SetupAction {
  @Prop() setupRefId: string;

  @Event()
  saved: EventEmitter<TSetupPayload>;

  @State()
  fields = [
    { type: "text", label: "Client ID", controlName: "clientID" },
    { type: "password", label: "Client Secret", controlName: "clientSecret" }
  ];

  @State()
  innerListener = `setup_success:BEARER_SCENARIO_ID`;

  render() {
    return (
      <bearer-dropdown-button
        innerListener={this.innerListener}
        btnProps={{ content: "Setup component" }}
      >
        <generic-action
          scenarioId="BEARER_SCENARIO_ID"
          fields={this.fields}
          referenceId={this.setupRefId}
        />
      </bearer-dropdown-button>
    );
  }
}
