import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';

import {ToastsManager} from "ng2-toastr";

import {JWTService} from "./shared/services/jwt";
import {environment} from "../environments/environment";


@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
    private apiUrl: string;
    private apiPrefix: string;
    private adminPrefix: string;

    constructor(private JWTService: JWTService,
                private ToastsManager: ToastsManager ) {
        this.apiUrl = environment.apiHost;
        this.apiPrefix = environment.apiPrefix;
        this.adminPrefix = environment.adminPrefix;
    }

    protected transformData (event: HttpResponse<any>): HttpEvent<any> {
        const response = event.body.data;
        return new HttpResponse({
            body: response,
            headers: event.headers,
            status: event.status,
            statusText: event.statusText,
            url: event.url
        });
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authReq = req.clone({
            setHeaders: {
                Accept: 'application/json',
                Authorization: `Bearer ${this.JWTService.getToken()}`,
            },
            url: `${this.apiUrl}${this.apiPrefix}${this.adminPrefix}${req.url}`
        });

        return next.handle(authReq)
            .map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    if (event.body.hasOwnProperty('message')) {
                        this.ToastsManager.success(event.body.message);
                    }
                    event = this.transformData(event);
                }

                return event;
            })
            .catch((error: HttpEvent<any>, caught: any) => {
                if (error instanceof HttpErrorResponse) {
                    switch (error.status) {
                        case 422:
                            this.ToastsManager.error(error['_body']);
                            break;
                        case 404:
                            this.ToastsManager.error('Ресурс не найден');
                            break;
                        default:
                            this.ToastsManager.error('Server error');
                    }
                }
                console.log('error', error);
                console.log('caught', caught);
                return Observable.throw(error);
            });
    }
}