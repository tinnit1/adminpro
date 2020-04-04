import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.modeule';

import { PagesComponent } from './pages.component';

import { FormsModule} from '@angular/forms';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { PAGES_ROUTES } from './pages.routes';
import {IncrementadorComponent} from '../components/incrementador/incrementador.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graphics1Component,
        IncrementadorComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graphics1Component,
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule
    ]
})
export class PagesModule { }
