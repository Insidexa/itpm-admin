

import {Injectable} from "@angular/core";
import {StorageService} from "./storage";

@Injectable()
export class JWTService {

    private tokenName: string;

    constructor(
        private storage: StorageService
    ) {
        this.tokenName = 'auth_token';
    }

    /**
     *
     * @param token
     * @return {any}
     */
    parse(token) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    /**
     *
     * @param token
     * @return {JWTService}
     */
    setToken(token) {
        this.storage.set(this.tokenName, token);

        return this;
    }

    /**
     *
     * @return {boolean|boolean}
     */
    isAuthenticated () {
        return this.isExpired();
    }

    /**
     *
     * @return {boolean}
     */
    isExpired () {
        let token = this.getToken();
        if (token) {
            let params = this.parse(token);
            let isExpired = Math.round(new Date().getTime() / 1000) <= params.exp;

            if (!isExpired) {
                if (this.storage.get('user') || this.storage.get(this.tokenName)) {
                    this.storage.rm('user').rm(this.tokenName);
                }
            }

            return isExpired;
        } else {
            return false;
        }
    }

    /**
     *
     * @return {JWTService}
     */
    removeToken() {
        this.storage.rm(this.tokenName);

        return this;
    }

    /**
     *
     * @return {string|any|null}
     */
    getToken() {
        return this.storage.get(this.tokenName);
    }
}