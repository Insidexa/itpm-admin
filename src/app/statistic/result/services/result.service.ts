import { Injectable } from '@angular/core';
import {HttpService} from "../../../http.service";
import {Observable} from "rxjs/Observable";
import {Response} from "@angular/http";
import {IResult} from "../models/result";

@Injectable()
export class ResultService {

  private api: string;

  constructor(private HttpService: HttpService) {
    this.api = `statistics`;
  }

  getResult(id: number): Observable<IResult> {
    return this
        .HttpService
        .get(`${this.api}/${id}`)
        .map((response: Response) => response.json().data);
  }

}
