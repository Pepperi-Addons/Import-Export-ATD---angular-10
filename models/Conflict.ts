import { ConflictStatus } from "./ConflictStatus.enum";
import { ReferenceType } from "./ReferenceType";
import { ResolutionOptionType } from "./ResolutionOption";

export interface Conflict {
  ID: string;
  Object: ReferenceType;
  Name: string;
  Status: ConflictStatus;
  Resolution: ResolutionOptionType;
  UUID: string;
}
