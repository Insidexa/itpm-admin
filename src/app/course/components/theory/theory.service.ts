import {Injectable} from "@angular/core";

import 'rxjs/operator/map';
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs";
import {HttpService} from "../../../http.service";
import {Theory} from "./theory";
import {JWTService} from "../../../helpers/services/jwt";

@Injectable()
export class TheoryService {
    private prefix: string;
    private api: string;

    constructor(private http: HttpService, private originalHttp: Http, private jwt: JWTService) {
        this.prefix = 'theory/';
        this.api = `${this.http.adminPrefix}${this.prefix}`;
    }

    async file(file: File, theory_id: number): Promise<Response> {

        let headers = new Headers();
        headers.append('Authorization', `Bearer ${this.jwt.getToken()}`);

        let fd = new FormData();

        fd.append('file', file, file.name);
        fd.append('theory_id', theory_id.toString());

        return this.originalHttp.post(`http://localhost:8000/api/files/`, fd, new RequestOptions({headers: headers})).toPromise();
    }

    store(_theory: Theory): Observable<Promise<Theory>> {
        return this.http.post(`${this.api}`, _theory).map(async (data: Response) => {

            let theory = new Theory(data.json());

            let file = await this.file(_theory.file, theory.id);

            theory.file = file.json();

            return theory;
        });
    }
}