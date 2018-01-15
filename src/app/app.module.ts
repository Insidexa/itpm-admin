import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, RequestOptions, XHRBackend} from '@angular/http';
import {RouterModule, Routes} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {HttpService} from "./http.service";
import {StorageService} from "./shared/services/storage";
import {AuthService} from "./shared/services/auth";
import {JWTService} from "./shared/services/jwt";
import {AuthGuard} from "./shared/guards/auth";
import {ToastModule} from "ng2-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpServiceFactory} from "./http-service.factory";
import {NamedRouteService} from "./shared/directives/named-route-directive/named-route.service";
import {MyHttpInterceptor} from "./http-interceptor";

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
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    ToastModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  providers: [
    AuthService,
    StorageService,
    JWTService,
    AuthGuard,
    NamedRouteService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true
    },
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
