import { AddonDataScheme, ApiFieldObject } from "@pepperi-addons/papi-sdk"
import { BooleanLiteral } from "typescript"

const addonUUID = 'e9029d7f-af32-4b0e-a513-8d9ced6f8186';

export interface relation {
    RelationName: string;
    AddonUUID: string;
    Name: string;
    Hidden: Boolean;
    Description: string;
    Type: "AddonAPI" | "NgComponent" | "Navigation";
    [key:string]:any;
}


export const relations: relation[] = [
    {
        RelationName: "TransactionTypeListMenu",
        AddonUUID: addonUUID,
        Name:"ImportATDRelations",
        Hidden: false,
        Description:"Import",
        Type:"NgComponent",
        AddonRelativeURL:"import_export_atd",
        SubType: "NG14",
        ModuleName: 'ImportAtdModule',
        ComponentName: 'ImportAtdComponent',
        ElementsModule: 'WebComponents',
        ElementName: `import-element-${addonUUID}`,
    },
    {
        RelationName: "TransactionTypeListMenu",
        AddonUUID: addonUUID,
        Name:"ExportATDRelations",
        Hidden: false,
        Description:"Export",
        Type:"NgComponent",
        AddonRelativeURL:"import_export_atd",
        SubType: "NG14",
        ModuleName: 'ExportAtdModule',
        ComponentName: 'ExportAtdComponent',
        ElementsModule: 'WebComponents',
        ElementName: `export-element-${addonUUID}`,
    },
    {
        RelationName: "ActivityTypeListMenu",
        AddonUUID: addonUUID,
        Name:"ImportATDRelations",
        Hidden: false,
        Description:"Import",
        Type:"NgComponent",
        AddonRelativeURL:"import_export_atd",
        SubType: "NG14",
        ModuleName: 'ImportAtdModule',
        ComponentName: 'ImportAtdComponent',
        ElementsModule: 'WebComponents',
        ElementName: `import-element-${addonUUID}`,
    },
    {
        RelationName: "ActivityTypeListMenu",
        AddonUUID: addonUUID,
        Name:"ExportATDRelations",
        Hidden: false,
        Description:"Export",
        Type:"NgComponent",
        AddonRelativeURL:"import_export_atd",
        SubType: "NG14",
        ModuleName: 'ExportAtdModule',
        ComponentName: 'ExportAtdComponent',
        ElementsModule: 'WebComponents',
        ElementName: `export-element-${addonUUID}`,
    },
]


