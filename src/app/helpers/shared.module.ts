import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {PaginationComponent} from "./pagination/pagination.component";
import {PaginationService} from "./pagination/service/pagination.service";

@NgModule({
    imports: [
        CommonModule,
        NgbModule.forRoot()
    ],
    providers: [
        PaginationService
    ],
    declarations: [
        PaginationComponent
    ],
    exports: [
        PaginationComponent
    ]
})
export class SharedModule {
}