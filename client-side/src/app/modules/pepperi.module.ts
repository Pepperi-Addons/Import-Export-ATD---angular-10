import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    PepIconModule,
    PepIconRegistry,
    pepIconSystemBolt,
    pepIconNoImage,
} from "@pepperi-addons/ngx-lib/icon";
import { PepNgxLibModule } from "@pepperi-addons/ngx-lib";
import { PepAttachmentModule } from "@pepperi-addons/ngx-lib/attachment";
import { PepCheckboxModule } from "@pepperi-addons/ngx-lib/checkbox";

import { PepFilesUploaderModule } from "@pepperi-addons/ngx-lib/files-uploader";
import { PepColorModule } from "@pepperi-addons/ngx-lib/color";
import { PepDateModule } from "@pepperi-addons/ngx-lib/date";
import { PepImageModule } from "@pepperi-addons/ngx-lib/image";
import { PepImagesFilmstripModule } from "@pepperi-addons/ngx-lib/images-filmstrip";
// import { PepInternalButtonModule } from "@pepperi-addons/ngx-lib/internal-button";
// import { PepMenuModule } from "@pepperi-addons/ngx-lib/menu";
import { PepQuantitySelectorModule } from "@pepperi-addons/ngx-lib/quantity-selector";
import { PepRichHtmlTextareaModule } from "@pepperi-addons/ngx-lib/rich-html-textarea";
import { PepSelectModule } from "@pepperi-addons/ngx-lib/select";
import { PepSeparatorModule } from "@pepperi-addons/ngx-lib/separator";
import { PepSignatureModule } from "@pepperi-addons/ngx-lib/signature";
import { PepSizeDetectorModule } from "@pepperi-addons/ngx-lib/size-detector";
import { PepTextareaModule } from "@pepperi-addons/ngx-lib/textarea";
import { PepTextboxModule } from "@pepperi-addons/ngx-lib/textbox";
import { PepListModule } from "@pepperi-addons/ngx-lib/list";
import { PepTopBarModule } from "@pepperi-addons/ngx-lib/top-bar";

const pepperiComponentsModules = [
    PepAttachmentModule,
    PepCheckboxModule,
    PepColorModule,
    PepDateModule,
    PepImageModule,
    PepImagesFilmstripModule,
    PepListModule,
    PepCheckboxModule,
    //   PepInternalButtonModule,
    //   PepMenuModule,
    PepQuantitySelectorModule,
    PepRichHtmlTextareaModule,
    PepSelectModule,
    PepSeparatorModule,
    PepSignatureModule,
    PepSizeDetectorModule,
    PepTextareaModule,
    PepTextboxModule,
    PepIconModule,
    PepFilesUploaderModule,
    PepTopBarModule
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        PepNgxLibModule,
        pepperiComponentsModules,
    ],
    exports: [PepNgxLibModule, pepperiComponentsModules],
})
export class PepUIModule {
    
}
