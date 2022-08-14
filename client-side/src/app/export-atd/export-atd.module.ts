import { AppService } from './../app.service';
import { PepUIModule } from './../modules/pepperi.module';
import { PepSelectModule } from '@pepperi-addons/ngx-lib/select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../modules/material.module";
import { ExportAtdComponent } from './export-atd.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateStore, TranslateService } from '@ngx-translate/core';
import { PepAddonService, PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { ExportAtdService } from '.';
import { config } from '../addon.config';

@NgModule({
    declarations: [ExportAtdComponent],
    imports: [
        CommonModule,
        PepUIModule,
        MaterialModule,
        HttpClientModule,
        PepSelectModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (addonService: PepAddonService) => 
                    PepAddonService.createMultiTranslateLoader(config.AddonUUID, addonService, ['ngx-lib']),
                deps: [PepAddonService]
            }, isolate: false
        }),
        PepNgxLibModule
    ],
    exports: [ExportAtdComponent],
    providers: [
        TranslateStore,
        AppService,
        ExportAtdService,
    ]
})
export class ExportAtdModule {
    constructor(
        translate: TranslateService,
        private pepAddonService: PepAddonService

    ) {
        this.pepAddonService.setDefaultTranslateLang(translate);
    }
}
