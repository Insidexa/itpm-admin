import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {TableResultsComponent} from './table-results/table-results.component';
import {ResultComponent} from './result/result.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {TableResultsService} from "./table-results/services/table-results.service";
import {TableItemComponent} from "./table-results/table-item/table-item.component";
import {TabPipe} from "./table-results/table-item/pipes/tab.pipe";
import {StatusPipe} from "./table-results/table-item/pipes/status.pipe";
import {ResultService} from "./result/services/result.service";

const routes: Routes = [
    {
        path: '',
        component: TableResultsComponent,
    },
    {
        path: ':id',
        component: ResultComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        NgbModule.forRoot(),
    ],
    providers: [
        TableResultsService,
        ResultService
    ],
    declarations: [
        TableResultsComponent,
        ResultComponent,
        TableItemComponent,

        TabPipe,
        StatusPipe
    ]
})
export class StatisticModule {
}
