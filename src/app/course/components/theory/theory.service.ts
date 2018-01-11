import {Injectable} from "@angular/core";

import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";
import 'rxjs/operator/map';

import {Theory} from "./theory";


@Injectable()
export class TheoryService {
    private prefix: string;

    constructor(private HttpClient: HttpClient) {
        this.prefix = 'theory/';
    }

    protected readFile (file: File): Observable<any> {
        const reader = new FileReader();
        let fileReaderObserver = Observable.create((observer: any) => {
            reader.onload = (data) => {
                const extension = file.name.split('.').pop();
                observer.next({
                    extension: extension,
                    content: data.target['result'].split(',')[1]
                });
            };
        });

        reader.readAsDataURL(file);

        return fileReaderObserver;
    }

    public attachFile(file: File, theory_id: number): Observable<any> {
        return this.readFile(file).switchMap((data) => this.HttpClient.post(`${this.prefix}attachment`, {
            'file': data.content,
            'theory_id': theory_id,
            'extension': data.extension
        }));
    }

    store(_theory: Theory): Observable<Theory> {
        return this.HttpClient.post<Theory>(`${this.prefix}`, _theory);
    }
}