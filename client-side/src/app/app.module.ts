import { DoBootstrap, Injector, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { ImportAtdComponent, ImportAtdModule } from './import-atd/index';
import { ExportAtdComponent, ExportAtdModule } from './export-atd/index';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PepUIModule } from "./modules/pepperi.module";
import { MaterialModule } from "./modules/material.module";
import { PepAddonService } from '@pepperi-addons/ngx-lib';
import { config } from './addon.config';

@NgModule({
    declarations: [AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ExportAtdModule,
        ImportAtdModule,
        PepUIModule,
        MaterialModule,
        TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: (addonService: PepAddonService) => 
                  PepAddonService.createMultiTranslateLoader(config.AddonUUID, addonService, ['ngx-lib']),
              deps: [PepAddonService]
          }
      }),
    ],
    providers: [TranslateService],
    bootstrap: [
      // AppComponent
    ],
})
export class AppModule implements DoBootstrap {
  constructor(
      private injector: Injector,
      translate: TranslateService,
      private pepAddonService: PepAddonService
  ) {
      this.pepAddonService.setDefaultTranslateLang(translate);
  }

  ngDoBootstrap() {
      this.pepAddonService.defineCustomElement(`import-element-${config.AddonUUID}`, ImportAtdComponent, this.injector);
      this.pepAddonService.defineCustomElement(`export-element-${config.AddonUUID}`, ExportAtdComponent, this.injector);
      // this.pepAddonService.defineCustomElement(`settings-element-${config.AddonUUID}`, ExportAtdComponent, this.injector);
  }
}