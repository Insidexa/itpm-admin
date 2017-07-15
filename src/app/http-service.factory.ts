import {RequestOptions, XHRBackend} from "@angular/http";
import {JWTService} from "./helpers/services/jwt";
import {HttpService} from "./http.service";
export function HttpServiceFactory (backend: XHRBackend, options: RequestOptions, jwt:JWTService) {
    return new HttpService(backend, options, jwt);
}