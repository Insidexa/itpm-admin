import {Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {JWTService} from "./shared/services/jwt";
import {environment} from "../environments/environment";

@Injectable()
export class HttpService extends Http {
    public apiUrl: string;
    public apiPrefix: string;
    public adminPrefix: string;

    /**
     *
     * @param {XHRBackend} backend
     * @param {RequestOptions} options
     * @param {JWTService} jwt
     */
    constructor(backend: XHRBackend, options: RequestOptions, private jwt: JWTService) {
        super(backend, options);
        this.apiUrl = environment.apiHost;
        this.apiPrefix = 'api/';
        this.adminPrefix = 'admin/';
    }

    /**
     *
     * @param options
     * @return {RequestOptionsArgs}
     */
    getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        options.headers.append('Accept', 'application/json');
        options.headers.append('Authorization', `Bearer ${this.jwt.getToken()}`);
        return options;
    }

    /**
     * Performs any type of http request. First argument is required, and can either be a url or
     * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
     * object can be provided as the 2nd argument. The options object will be merged with the values
     * of {@link BaseRequestOptions} before performing the request.
     */
    request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options);
    }

    /**
     * Performs a request with `get` http method.
     */
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = `${this.apiUrl}${this.apiPrefix}${url}`;
        return super.get(url, this.getRequestOptionArgs(options));
    };
    /**
     * Performs a request with `post` http method.
     */
    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        url = `${this.apiUrl}${this.apiPrefix}${url}`;
        return super.post(url, body, this.getRequestOptionArgs(options));
    };
    /**
     * Performs a request with `put` http method.
     */
    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        url = `${this.apiUrl}${this.apiPrefix}${url}`;
        return super.put(url, body, this.getRequestOptionArgs(options));
    };
    /**
     * Performs a request with `delete` http method.
     */
    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = `${this.apiUrl}${this.apiPrefix}${url}`;
        return super.delete(url, this.getRequestOptionArgs(options));
    };
    /**
     * Performs a request with `patch` http method.
     */
    patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        url = `${this.apiUrl}${this.apiPrefix}${url}`;
        return super.patch(url, body, this.getRequestOptionArgs(options));
    };
}