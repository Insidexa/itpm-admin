
import {HttpService} from "../../http.service";
import {Injectable} from "@angular/core";
import {RequestOptions, Headers, Response} from "@angular/http";

import 'rxjs/add/operator/map';
import {User} from "../../home/user";
import {StorageService} from "./storage";
import {JWTService} from "./jwt";
import {ToastsManager} from "ng2-toastr";
import {Observable} from "rxjs";

@Injectable()
export class AuthService {

    constructor(
        private http: HttpService,
        private jwt: JWTService,
        private storage: StorageService,
        private toast: ToastsManager
    ) {}

    /**
     *
     * @return {boolean}
     */
    public isAuth() {
        return this.jwt.isAuthenticated();
    }

    /**
     *
     * @return {string|any|null}
     */
    public getUser() {
        return this.storage.get('user');
    }

    /**
     *
     * @param user
     * @return {Observable<R>}
     */
    public auth(user:User) {
        return this.http.post(`auth/signin`, user, new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })).map((response: Response) => {
            let data = response.json();

            if (data.user.role === 'admin') {
                this.storage.set('user', data.user);
                this.jwt.setToken(data.token);

                return data;
            }

            this.toast.error('Access Denied');

            return Observable.throw(new Error('Access Denied'));
        });
    }


}