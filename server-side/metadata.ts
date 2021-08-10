import { AddonDataScheme, ApiFieldObject } from "@pepperi-addons/papi-sdk"
import { BooleanLiteral } from "typescript"

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
        AddonUUID: "e9029d7f-af32-4b0e-a513-8d9ced6f8186",
        Name:"ImportATDRelations",
        Hidden: false,
        Description:"Import",
        Type:"NgComponent",
        AddonRelativeURL:"import_export_atd",
        SubType: "NG11",
        ModuleName: 'ImportAtdModule',
        ComponentName: 'ImportAtdComponent'
    },
    {
        RelationName: "TransactionTypeListMenu",
        AddonUUID: "e9029d7f-af32-4b0e-a513-8d9ced6f8186",
        Name:"ExportATDRelations",
        Hidden: false,
        Description:"Export",
        Type:"NgComponent",
        AddonRelativeURL:"import_export_atd",
        SubType: "NG11",
        ModuleName: 'ExportAtdModule',
        ComponentName: 'ExportAtdComponent'
    },
    {
        RelationName: "ActivityTypeListMenu",
        AddonUUID: "e9029d7f-af32-4b0e-a513-8d9ced6f8186",
        Name:"ImportATDRelations",
        Hidden: false,
        Description:"Import",
        Type:"NgComponent",
        AddonRelativeURL:"import_export_atd",
        SubType: "NG11",
        ModuleName: 'ImportAtdModule',
        ComponentName: 'ImportAtdComponent'
    },
    {
        RelationName: "ActivityTypeListMenu",
        AddonUUID: "e9029d7f-af32-4b0e-a513-8d9ced6f8186",
        Name:"ExportATDRelations",
        Hidden: false,
        Description:"Export",
        Type:"NgComponent",
        AddonRelativeURL:"import_export_atd",
        SubType: "NG11",
        ModuleName: 'ExportAtdModule',
        ComponentName: 'ExportAtdComponent'
    },
]


