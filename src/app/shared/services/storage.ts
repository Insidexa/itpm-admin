

import {Injectable} from "@angular/core";
import {isObject} from "rxjs/util/isObject";

@Injectable()
export class StorageService {
    /**
     *
     * @param key
     * @param _default
     * @return {any}
     */
    get (key, _default?) {
        let data = localStorage.getItem(key);

        if (data) {
            try {
                data = JSON.parse(data);
            } catch (e) {
            }

            return data;
        } else {
            if (_default) {
                return _default;
            }
            return null;
        }
    }

    /**
     *
     * @param key
     * @param value
     * @return {StorageService}
     */
    set(key, value) {
        let data = (isObject(value)) ? JSON.stringify(value) : value;
        localStorage.setItem(key, data);

        return this;
    }

    /**
     *
     * @param key
     * @return {StorageService}
     */
    rm(key) {
        localStorage.removeItem(key);

        return this;
    }

}