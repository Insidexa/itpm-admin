import {Injectable} from '@angular/core';
import {HttpService} from "../../../http.service";
import {Observable} from "rxjs/Observable";
import {Response} from "@angular/http";
import {IResult, ISchema} from "../models/result";

import * as jspdf from 'jspdf/dist/jspdf.min.js';

@Injectable()
export class ResultService {

    private api: string;

    constructor(private HttpService: HttpService) {
        this.api = `statistics`;
    }

    public getResult(id: number): Observable<IResult> {
        return this
            .HttpService
            .get(`${this.api}/${id}`)
            .map((response: Response) => response.json().data);
    }

    public schemaIsFilled(schema: ISchema): boolean {
        return schema.diagram.nodeDataArray.length !== 0;
    }

    public printImage(img) {
        const width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        const height = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;

        let windowImage = window.open('', 'PRINT', `height=${height},width=${width}`);

        windowImage.document.write(`<html><head><title></title>`);
        windowImage.document.write(`</head><body onload="window.print()">`);
        windowImage.document.write(`<img src="${img.src}" />`);
        windowImage.document.write(`</body></html>`);

        windowImage.document.close(); // necessary for IE >= 10
        windowImage.focus(); // necessary for IE >= 10*/
    }

    public downloadPDF(img) {
        let pdf = new jspdf();
        pdf.addImage(img.src, 'JPEG', 1, 1);
        pdf.save();
    }

    public makeImage(diagram, scale: number = 0.8) {
        return diagram.getDiagram().makeImage({
            scale: scale
        });
    }

}
