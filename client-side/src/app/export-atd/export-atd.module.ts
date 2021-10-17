import { AppService } from './../app.service';
import { PepUIModule } from './../modules/pepperi.module';
import { PepSelectModule } from '@pepperi-addons/ngx-lib/select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../modules/material.module";
import { ExportAtdComponent } from './export-atd.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateStore, TranslateService } from '@ngx-translate/core';
import { PepAddonService, PepCustomizationService, PepFileService, PepHttpService, PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { PepDialogService } from '@pepperi-addons/ngx-lib/dialog';
import { ExportAtdService } from '.';
import { config } from './addon.config';


// export function createTranslateLoader(http: HttpClient, fileService: PepFileService, addonService: PepAddonService) {

//     const translationsPrefix: string = fileService.getAssetsTranslationsPath();
//     const translationsSuffix: string = fileService.getAssetsTranslationsSuffix();
//     const addonPublicURL = addonService.getAddonStaticFolder(config.AddonUUID);
//     PepAddonService.createDefaultMultiTranslateLoader
//     return new MultiTranslateHttpLoader(http, [
//         { prefix: addonPublicURL + translationsPrefix, suffix: translationsSuffix },
//         { prefix: addonPublicURL + 'assets/i18n/', suffix: '.json' },
//     ]);
// }

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
                useFactory: (http: HttpClient, fileService: PepFileService, addonService: PepAddonService) =>
                PepAddonService.createDefaultMultiTranslateLoader(http, fileService, addonService, config.AddonUUID),
                deps: [HttpClient, PepFileService, PepAddonService]
            }, isolate: false
        }),
        PepNgxLibModule
    ],
    exports: [ExportAtdComponent],
    providers: [
        AppService,
        ExportAtdService,
        HttpClient,
        TranslateStore,
        PepHttpService,
        PepAddonService,
        PepFileService,
        PepCustomizationService,
        PepDialogService
    ]
})
export class ExportAtdModule {
    constructor(
        translate: TranslateService
    ) {

        let userLang = 'en';
        translate.setDefaultLang(userLang);
        userLang = translate.getBrowserLang().split('-')[0]; // use navigator lang if available

        if (location.href.indexOf('userLang=en') > -1) {
            userLang = 'en';
        }
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use(userLang).subscribe((res: any) => {
            // In here you can put the code you want. At this point the lang will be loaded
        });
    }
}
