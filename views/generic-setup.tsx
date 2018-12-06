import Bearer, {
  Component,
  State,
  Element,
  Event,
  EventEmitter,
  Prop,
  StateManager,
  RootComponent
} from "@bearer/core";

import "@bearer/ui";

import { FieldSet } from "./field-set";

import { OAuth2SetupType, EmailSetupType, KeySetupType } from "./setup-types";

type TSetupPayload = {
  Item: { referenceId: string };
};

@RootComponent({
  role: "action",
  group: "generic"
})
export class GenericSetup {
  @Prop()
  fields: Array<any> | string = [];
  @Prop()
  referenceId: string;
  @Prop()
  scenarioId: string;

  @Element()
  element: HTMLElement;

  @Event()
  setupSuccess: EventEmitter;

  @State()
  fieldSet: FieldSet;
  @State()
  error: boolean = false;
  @State()
  loading: boolean = false;

  handleSubmit = (e: Event) => {
    e.preventDefault();
    this.loading = true;
    const formSet = this.fieldSet.map(el => {
      return { key: el.controlName, value: el.value };
    });

    let action: any = StateManager.storeSetup;
    if (this.referenceId) {
      action = (payload: any) => {
        return StateManager.storeSecret(this.referenceId, payload);
      };
    }
    action(
      formSet.reduce((acc, obj) => ({ ...acc, [obj["key"]]: obj["value"] }))
    )
      .then((item: TSetupPayload) => {
        this.loading = false;
        const referenceId = item.Item.referenceId;
        console.log(
          "[BEARER]",
          "setup_success",
          `setup_success:${this.scenarioId}`
        );
        Bearer.emitter.emit(`setup_success:${this.scenarioId}`, {
          referenceId
        });
        this.setupSuccess.emit({ referenceId });
      })
      .catch(() => {
        this.error = true;
        this.loading = false;
        Bearer.emitter.emit(`setup_error:${this.scenarioId}`, {});
      });
  };

  componentWillLoad() {
    console.log("generic-setup usage");
    if (typeof this.fields !== "string") {
      this.fieldSet = new FieldSet(this.fields as Array<any>);
      return;
    }
    switch (this.fields) {
      case "email":
        this.fieldSet = new FieldSet(EmailSetupType);
        break;
      case "type":
        this.fieldSet = new FieldSet(KeySetupType);
        break;
      case "oauth2":
      default:
        this.fieldSet = new FieldSet(OAuth2SetupType);
    }
  }

  render() {
    console.log("rendering generic setup");
    console.log("ScenarioID", this.scenarioId, "referenceId", this.referenceId);
    return [
      this.error && (
        <bearer-alert kind="danger">
          [Error] Unable to store the credentials
        </bearer-alert>
      ),
      this.loading ? (
        <bearer-loading />
      ) : (
        <bearer-form
          fields={this.fieldSet as any}
          clearOnInput={true}
          onSubmit={this.handleSubmit}
        />
      )
    ];
  }
}
