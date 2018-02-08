import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ToastModule} from "ng2-toastr";

import {AuthModule, ITPMModule} from "itpm-shared";

import {AppComponent} from "./app.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./shared/guards/auth";

import {environment} from "../environments/environment";

const appRoutes: Routes = [
  {
    // root route
    pathMatch: 'full',
    path: '', component: HomeComponent,
    data: {
      routeName: 'home'
    }
  },
  {
    path: 'panel',
    loadChildren: './panel/panel.module#PanelModule',
    canActivate: [
      AuthGuard
    ]
  }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    ToastModule.forRoot(),
    BrowserAnimationsModule,
    NgbModule.forRoot(),

    AuthModule,
    ITPMModule.forRoot(environment)
  ],
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  providers: [
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
