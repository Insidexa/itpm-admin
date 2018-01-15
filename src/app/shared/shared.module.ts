import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {PaginationComponent} from "./components/pagination/pagination.component";
import {PaginationService} from "./components/pagination/service/pagination.service";
import {BaseItemComponent} from "./components/item/base-item.component";
import {NamedRouteDirective} from "./directives/named-route-directive/named-route.directive";
import {NamedRouteService} from "./directives/named-route-directive/named-route.service";
import {SearchItemComponent} from "./components/search-item/search-item.component";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule.forRoot(),
        NgbModule.forRoot()
    ],
    providers: [
        PaginationService,
        NamedRouteService
    ],
    declarations: [
        PaginationComponent,
        BaseItemComponent,
        NamedRouteDirective,
        SearchItemComponent,
    ],
    exports: [
        PaginationComponent,
        BaseItemComponent,
        NamedRouteDirective,
        SearchItemComponent
    ]
})
export class SharedModule {
}