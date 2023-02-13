import { Reference } from "./Reference";

export interface Mapping {
  Origin: Reference;
  Destination: Reference;
}

export interface References {
  Mapping: Mapping[];
}
