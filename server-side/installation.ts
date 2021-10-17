/*
The return object format MUST contain the field 'success':
{success:true}

If the result of your code is 'false' then return:
{success:false, erroeMessage:{the reason why it is false}}
The erroeMessage is importent! it will be written in the audit log and help the user to understand what happen
*/

import { PapiClient, Relation } from "@pepperi-addons/papi-sdk";
import { execPath } from "process";
import { relations } from "./metadata";
import MyService from "./my.service";

exports.install = async (Client, Request) => {
  try {
    const service = new MyService(Client);
    const hedears = {};
    hedears["X-Pepperi-SecretKey"] = Client.AddonSecretKey;
    hedears["X-Pepperi-OwnerID"] = Client.AddonUUID;

    let tableName: string = `importExportATD`;
    let body = {
      Name: tableName,
    };
    let retVal = await service.papiClient.post(`/addons/data/schemes`, body, hedears);

    retVal = await insertKeyToTable(service, Client, {
      Key: `webhooks`,
      Value: {},
    },
      hedears,
      tableName
    );

    retVal = await insertKeyToTable(
      service,
      Client,
      {
        Key: `resolution`,
        Value: {},
      },
      hedears,
      tableName
    );

    await upsertRelations(service.papiClient, relations);

    return { success: true };
  } catch (e) {
    return {
      success: false,
      erroeMessage: e,
    };
  }
};

exports.uninstall = async (Client, Request) => {

  try {
    const service = new MyService(Client);
    const myClonedObject = JSON.parse(JSON.stringify(relations));
    const hiddenRelation = myClonedObject.map((relation: Relation) => {
      relation.Hidden = true;
      return relation;
    })
    await upsertRelations(service.papiClient, hiddenRelation);
    return { success: true };
  }
  catch (e) {
    return {
      success: false,
      erroeMessage: JSON.stringify(e),
    };
  }
};

exports.upgrade = async (Client, Request) => {

  try {
    const service = new MyService(Client);
    var res = await upsertRelations(service.papiClient, relations);
    return { success: res.success, errorMessage: res.errorMessage ?? 'Unknown Error Occured' };
  }
  catch (e) {
    return { success: false, errorMessage: e };
  }
};

exports.downgrade = async (Client, Request) => {
  return { success: true };
};

async function upsertRelations(papiClient: PapiClient, relations) {
  try {
    for (let relation of relations) {
      await papiClient.post('/addons/data/relations', relation);
    }

    return {
      success: true,
      errorMessage: ""
    }
  }
  catch (err) {
    throw err;
  }
}

async function insertKeyToTable(
  service: MyService,
  Client: any,
  body: {},
  hedears: {},
  tableName: string
) {
  const result = await service.papiClient.post(
    `/addons/data/${Client.AddonUUID}/${tableName}`,
    body,
    hedears
  );
}
