import { Injectable } from "@angular/core";
//@ts-ignore
// @ts-ignore
import { ActivityTypeDefinition } from "./../../../../models/activityTypeDefinition";
import { PepHttpService } from "@pepperi-addons/ngx-lib";
import { AppService } from "../app.service";

@Injectable({
    providedIn: "root",
})
export class ImportAtdService {
    [x: string]: any;

    accessToken = "";
    parsedToken: any;
    papiBaseURL = "";
    pluginUUID = `e9029d7f-af32-4b0e-a513-8d9ced6f8186`;
    exportedAtdstring: string;
    exportedAtd: ActivityTypeDefinition;

    constructor(
        private appService: AppService,
        private httpService: PepHttpService
    ) {}

    //   callToAddonApi(
    //     method: string,
    //     methodName: string,
    //     params: any
    //   ): Promise<any> {
    //     if (method === "GET") {
    //       return this.appService
    //         .getAddonServerAPI(this.pluginUUID, "api", methodName, {
    //           params: params,
    //         })
    //         .toPromise();
    //     } else if (method === "post") {
    //       return this.appService
    //         .getAddonServerAPI(this.pluginUUID, "api", methodName, {
    //           params: params,
    //         })
    //         .toPromise();
    //     }
    //   }

    callToPapi(method: string, url: string, body?: any): Promise<any> {
        if (method === "GET") {
            return this.appService.getPapiCall(url).toPromise();
        } else if (method === "POST") {
            return this.appService.postPapiCall(url, body).toPromise();
        }
    }

    getTypeOfSubType(subtypeid: string): Promise<any> {
        return this.appService.getPapiCall(`/types/${subtypeid}`).toPromise();
    }

    callToServerAPI(
        methodName: string,
        method: string,
        params: any,
        body?: any,
        isAsync?: boolean
    ): Promise<any> {
        if (method === "GET") {
            return this.appService
                .getAddonServerAPI(
                    this.pluginUUID,
                    "api",
                    methodName,
                    {
                        params: params,
                    },
                    isAsync
                )
                .toPromise();
        } else if (method === "POST") {
            return this.appService
                .postAddonServerAPI(
                    this.pluginUUID,
                    "api",
                    methodName,
                    body,
                    {
                        params: params,
                    },
                    isAsync
                )
                .toPromise();
        }
    }
}
