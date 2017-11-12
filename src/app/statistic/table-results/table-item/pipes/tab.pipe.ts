
import {Pipe, PipeTransform} from "@angular/core";

import {tabs} from "../statuses";

@Pipe({
    name: 'tabPipe'
})
export class TabPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        return tabs[value];
    }

}