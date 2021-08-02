import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ObjectType } from "./../../../../models/ObjectType.enum";
import {
    // PepHttpService,
    PepAddonService, IPepOption, PepHttpService, PepLoaderService
} from "@pepperi-addons/ngx-lib";
import { AuditLog } from "@pepperi-addons/papi-sdk";
import { PepDialogActionButton, PepDialogData, PepDialogService } from "@pepperi-addons/ngx-lib/dialog";
import { AppService } from "../app.service";
import { ExportAtdService } from "./export-atd.service";
import { PepSelectComponent } from "@pepperi-addons/ngx-lib/select";
@Component({
    selector: "export-atd",
    templateUrl: "./export-atd.component.html",
    styleUrls: ["./export-atd.component.scss"]

})
export class ExportAtdComponent implements OnInit {
    data: any;
    isCallbackExportFinish = false;
    disableExportButton: boolean = true;
    activityTypes: IPepOption[];
    selectedActivity: any;
    reportInterval = undefined;
    pluginUUID = `e9029d7f-af32-4b0e-a513-8d9ced6f8186`;
    message: string;
    @ViewChild('pepSelect') pepSelect: PepSelectComponent;
    @Input() hostObject: any;
    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();
    atd;


    constructor(
        private translate: TranslateService,
        private exportedService: ExportAtdService,
        private appService: AppService,
        private addonService: PepAddonService,
        private loaderService: PepLoaderService
    ) {
    }

    ngOnInit(): void {
        this.selectedActivity = this.hostObject.activityTypeDefinition.InternalID
        this.message = `About to export type defintion: ${this.hostObject.activityTypeDefinition.Name}. Please wait...`
        this.exportAtd();
    }


    ngOnDestroy() {
        if (this.reportInterval) {
            window.clearInterval(this.reportInterval);
        }
    }


    exportAtd() {
        this.isCallbackExportFinish = false;
        // debugger;
        let typeString = ``;
        this.exportedService.getTypeOfSubType(this.selectedActivity)
            .then(async (type) => {
                this.loaderService.show();
                if (type.Type === ObjectType.transactions) {
                    typeString = ObjectType.toString(ObjectType.transactions);
                } else {
                    typeString = ObjectType.toString(ObjectType.activities);
                }
                const res = await this.exportedService.callToExportATDAPI(
                    typeString,
                    this.selectedActivity
                );
                this.reportInterval = window.setInterval(() => {
                    if (res?.URL) {
                        window.clearInterval(this.reportInterval);
                        this.isCallbackExportFinish = true;
                        this.data = res.URL;

                        this.appService.openDialog(
                            // this.openDialog(
                            this.translate.instant(
                                "Export_ATD_Dialog_Title"
                            ),
                            this.translate.instant(
                                "Export_ATD_Dialog_Success_Message"
                            ),
                            () => this.downloadUrl()
                        );
                    }
                    else {
                        this.appService.getExecutionLog(res.ExecutionUUID)
                            // this.getExecutionLog(res.ExecutionUUID)
                            .then((logRes) => {
                                if (
                                    logRes &&
                                    logRes.Status &&
                                    logRes.Status.Name !== "InProgress" &&
                                    logRes.Status.Name !== "InRetry"
                                ) {
                                    window.clearInterval(this.reportInterval);
                                    const resultObj = JSON.parse(
                                        logRes.AuditInfo.ResultObject
                                    );
                                    if (resultObj.URL) {
                                        this.isCallbackExportFinish = true;
                                        this.data = resultObj.URL;
                                        //this.hostEvents.emit({ closeDialog: true });
                                        this.loaderService.hide();

                                        this.message = this.translate.instant(
                                            "Export_ATD_Dialog_Success_Message"
                                        );
                                        this.downloadUrl();
                                        // this.appService.openDialog(
                                        //     // this.openDialog(
                                        //     this.translate.instant(
                                        //         "Export_ATD_Dialog_Title"
                                        //     ),
                                        //     this.translate.instant(
                                        //         "Export_ATD_Dialog_Success_Message"
                                        //     ),
                                        //     () => this.downloadUrl()
                                        //);
                                    } else if (resultObj.success == "Exception") {
                                        
                                        this.isCallbackExportFinish = true;
                                        window.clearInterval(this.reportInterval);
                                        //this.hostEvents.emit({ action: 'close-dialog' });
                                        this.loaderService.hide();

                                        this.message = `${this.translate.instant("Error_Occurred")}: ${resultObj.errorMessage}`;
                                        let error = JSON.parse(
                                            resultObj.errorMessage.substring(
                                                resultObj.errorMessage.indexOf("{")
                                            )
                                        ).fault.faultstring;

                                        let contentError =
                                            error && error != ""
                                                ? error
                                                : this.translate.instant(
                                                    "Error_Occurred"
                                                );
                                        this.appService.openDialog(
                                            // this.openDialog(
                                            this.translate.instant("Error"),
                                            contentError
                                        );
                                    }
                                }
                            });
                    }

                }, 1500);
            });
    }

    downloadUrl() {
        const data = fetch(this.data, { method: `GET` })
            .then((response) => response.json())
            .then((data) => {
                var fileContents = JSON.stringify(data);
                var filename = `${this.selectedActivity}.json`;
                var filetype = "text/plain";

                var a = document.createElement("a");
                const dataURI =
                    "data:" +
                    filetype +
                    ";base64," +
                    btoa(unescape(encodeURIComponent(fileContents)));
                a.href = dataURI;
                a["download"] = filename;
                var e = document.createEvent("MouseEvents");
                // Use of deprecated function to satisfy TypeScript.
                e.initMouseEvent(
                    "click",
                    true,
                    false,
                    document.defaultView,
                    0,
                    0,
                    0,
                    0,
                    0,
                    false,
                    false,
                    false,
                    false,
                    0,
                    null
                );
                a.dispatchEvent(e);
                //a.removeNode()
            });
    }

    isValidHttpUrl(string) {
        let url;

        try {
            url = new URL(string);
        } catch (_) {
            return false;
        }

        return url.protocol === "http:" || url.protocol === "https:";
    }

}
