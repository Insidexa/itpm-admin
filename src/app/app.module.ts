import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, RequestOptions, XHRBackend} from '@angular/http';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import { HomeComponent } from './home/home.component';
import {HttpService} from "./http.service";
import {StorageService} from "./helpers/services/storage";
import {AuthService} from "./helpers/services/auth";
import {JWTService} from "./helpers/services/jwt";
import {AuthGuard} from "./helpers/guards/auth";
import {ToastModule} from "ng2-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpServiceFactory} from "./http-service.factory";

const appRoutes: Routes = [
  {
    // root route
    path: '', component: HomeComponent,
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
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    ToastModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    StorageService,
    JWTService,
    AuthGuard,
    {
      provide: HttpService,
      useFactory: HttpServiceFactory,
      deps: [
        XHRBackend,
        RequestOptions,
        JWTService
      ]
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
