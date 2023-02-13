import { AddonOwner } from "./AddonOwner";
import {
  ATDSettings,
  ApiFieldObject,
  DataView,
} from "@pepperi-addons/papi-sdk";
import { Reference } from "./Reference";

export interface ActivityTypeDefinition {
  Version?: string;
  UUID: string;
  InternaID: string;
  ExternalID: string;
  Description: string;
  CreationDateTime: string;
  ModificationDateTime: string;
  Hidden: boolean;
  Addons: AddonOwner[];
  Settings: ATDSettings;
  Fields: ApiFieldObject[];
  LineFields?: ApiFieldObject[];
  DataViews: DataView[];
  Workflow: any;
  References: Reference[];
}
