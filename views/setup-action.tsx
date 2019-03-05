/*
  The purpose of this component is to save scenario credentials.
  This file has been generated automatically and should not be edited.
*/

import Bearer, {
  RootComponent,
  State,
  Event,
  EventEmitter,
  Element,
  Output,
  Listen
} from "@bearer/core";
import "@bearer/ui";

import { FieldSet } from "@bearer/ui/lib/collection/components/Forms/Fieldset";
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
  @Output() setup: { clientID: string; clientSecret: string } = {
    clientID: "",
    clientSecret: ""
  };

  @State() innerListener = `setup_success:BEARER_SCENARIO_ID`;
  @Listen("setup-setupSaved")
  setupSavedHandler(e: CustomEvent) {
    const event = new CustomEvent("setupSuccess", e);
    document.dispatchEvent(event);
    this.el.shadowRoot
      .querySelector<HTMLBearerDropdownButtonElement>("bearer-dropdown-button")
      .toggle(false);
    Bearer.emitter.emit(this.innerListener, {
      referenceId: e.detail.referenceId
    });
    this.saved.emit({ setupId: event.detail.referenceId });
  }

  handleSubmit = (e: CustomEvent) => {
    const { value: clientID } = e.detail.set.find(
      ({ controlName }: { controlName: string }) => {
        return controlName === "clientID";
      }
    );

    const { value: clientSecret } = e.detail.set.find(
      ({ controlName }: { controlName: string }) => {
        return controlName === "clientSecret";
      }
    );

    this.setup = { clientID, clientSecret };
  };

  @State()
  fields = new FieldSet([
    { type: "text", label: "Client ID", controlName: "clientID" },
    { type: "password", label: "Client Secret", controlName: "clientSecret" }
  ]);
  render() {
    return (
      <bearer-dropdown-button>
        <span slot="dropdown-btn-content">Setup component</span>
        <bearer-form onSubmit={this.handleSubmit} fields={this.fields} />
      </bearer-dropdown-button>
    );
  }
}
