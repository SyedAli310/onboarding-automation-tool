import { ModuleWithProviders, NgModule } from '@angular/core';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerConfig, BsDatepickerModule, BsDaterangepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { RatingModule } from 'ngx-bootstrap/rating';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

@NgModule({
    imports: [
        TypeaheadModule.forRoot(),
        ModalModule.forRoot(),
        TooltipModule.forRoot(),
        BsDropdownModule.forRoot(),
        BsDatepickerModule.forRoot(),
        PopoverModule.forRoot(),
        TabsModule.forRoot(),
        CollapseModule.forRoot(),
        ProgressbarModule.forRoot(),
        TimepickerModule.forRoot(),
        AccordionModule.forRoot(),
        RatingModule.forRoot(),
        CarouselModule.forRoot()
    ],
    exports: [
        TypeaheadModule,
        ModalModule,
        TooltipModule,
        BsDropdownModule,
        BsDatepickerModule,
        PopoverModule,
        TabsModule,
        CollapseModule,
        ProgressbarModule,
        TimepickerModule,
        AccordionModule,
        RatingModule,
        CarouselModule,
    ],
    providers: [],
    declarations: [],
})
export class NgxBootstrapModule {
    static forRoot(): ModuleWithProviders<NgxBootstrapModule> {
        return {
            ngModule: NgxBootstrapModule,
            providers: [],
        };
    }
}
