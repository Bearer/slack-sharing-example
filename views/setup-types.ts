import { FieldType } from "./field-set";

export const KeySetupType = [
  {
    type: "text" as FieldType,
    label: "Enter your Key",
    controlName: "key",
    required: true
  }
];
export const EmailSetupType = [
  {
    type: "email" as FieldType,
    label: "Email",
    controlName: "email",
    required: true
  },
  {
    type: "password" as FieldType,
    label: "Password",
    controlName: "password",
    required: true
  }
];
export const OAuth2SetupType = [
  {
    type: "text" as FieldType,
    label: "Client ID",
    controlName: "clientId",
    required: true
  },
  {
    type: "password" as FieldType,
    label: "Client Secret",
    controlName: "clientSecret",
    required: true
  }
];
