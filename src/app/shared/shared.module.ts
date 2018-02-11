import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";

import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {BaseItemComponent} from "./components/item/base-item.component";
import {SearchItemComponent} from "./components/search-item/search-item.component";

import {
  AuthModule,
  ITPMModule,
  NamedRouteModule,
  InterceptorMessageModule
} from "itpm-shared";
import {environment} from "../../environments/environment";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule.forRoot(),

    AuthModule,
    NamedRouteModule,
    ITPMModule.forRoot(environment),
    InterceptorMessageModule
  ],
  providers: [],
  declarations: [
    BaseItemComponent,
    SearchItemComponent,
  ],
  exports: [
    BaseItemComponent,
    SearchItemComponent
  ]
})
export class SharedModule {
}