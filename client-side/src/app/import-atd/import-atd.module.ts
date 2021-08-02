import { AppService } from './../app.service';
import { PepUIModule } from './../modules/pepperi.module';
import { PepSelectModule } from '@pepperi-addons/ngx-lib/select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../modules/material.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateStore, TranslateService } from '@ngx-translate/core';
import { PepAddonService, PepCustomizationService, PepFileService, PepHttpService, PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { PepDialogService } from '@pepperi-addons/ngx-lib/dialog';
import {  PepAddonLoaderService } from '@pepperi-addons/ngx-remote-loader';
import { ImportAtdComponent } from '.';
import {config } from './addon.config';

export function createTranslateLoader(http: HttpClient, fileService: PepFileService, addonService: PepAddonLoaderService) {

  const translationsPrefix: string = fileService.getAssetsTranslationsPath();
  const translationsSuffix: string = fileService.getAssetsTranslationsSuffix();
  const addonPublicURL = addonService.getAddonPath(config.AddonUUID);

  return new MultiTranslateHttpLoader(http, [
      {prefix: addonPublicURL + translationsPrefix, suffix: translationsSuffix},
      {prefix: addonPublicURL + 'assets/i18n/', suffix: '.json'},
  ]);
}
@NgModule({
  declarations: [
      ImportAtdComponent
    ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    PepUIModule,
    MaterialModule,
  ],
  exports: [ImportAtdComponent]
})
export class ImportAtdModule { }
