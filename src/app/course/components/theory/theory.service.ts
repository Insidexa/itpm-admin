import {Injectable} from "@angular/core";

import 'rxjs/operator/map';
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs";
import {HttpService} from "../../../http.service";
import {Theory} from "./theory";
import {JWTService} from "../../../helpers/services/jwt";
import {environment} from "../../../../environments/environment";

@Injectable()
export class TheoryService {
    private prefix: string;
    private api: string;

    constructor(private HttpService: HttpService, private originalHttp: Http, private jwt: JWTService) {
        this.prefix = 'theory/';
        this.api = `${this.HttpService.adminPrefix}${this.prefix}`;
    }

    async file(file: File, theory_id: number): Promise<Response> {

        let headers = new Headers();
        headers.append('Authorization', `Bearer ${this.jwt.getToken()}`);

        let fd = new FormData();

        fd.append('file', file, file.name);
        fd.append('theory_id', theory_id.toString());

        const url = `${environment.apiHost}${this.HttpService.apiPrefix}${this.api}attachment`;

        return this.originalHttp.post(url, fd, new RequestOptions({headers: headers})).toPromise();
    }

    store(_theory: Theory): Observable<Promise<Theory>> {
        return this.HttpService.post(`${this.api}`, _theory).map(async (data: Response) => {

            let theory = new Theory(data.json());

            if (_theory.file) {
                let file = await this.file(_theory.file, theory.id);

                theory.file = file.json();
            }

            return theory;
        });
    }
}