import { ReferenceType } from "./ReferenceType";

export interface Reference {
  Type: ReferenceType;
  SubType?: string;
  ID: string;
  Name: string;
  UUID?: string;
  Path?: string;
  Content?: any;
  Configuration?: any;
}