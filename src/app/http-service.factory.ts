import {RequestOptions, XHRBackend} from "@angular/http";

import {HttpService} from "./http.service";
import {JWTService} from "./helpers/services/jwt";
export function HttpServiceFactory (XHRBackend: XHRBackend, RequestOptions: RequestOptions, JWTService: JWTService) {
    return new HttpService(XHRBackend, RequestOptions, JWTService);
}