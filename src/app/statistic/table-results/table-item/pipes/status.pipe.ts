
import {Pipe, PipeTransform} from "@angular/core";

import {statuses} from "../statuses";

@Pipe({
    name: 'statusPipe'
})
export class StatusPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        return statuses[value];
    }

}