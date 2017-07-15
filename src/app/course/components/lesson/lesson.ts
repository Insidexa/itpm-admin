import {Unit} from "../unit/unit";
export class Lesson {
    id: number;
    name: string = '';
    description: string = '';
    cource_id: number;
    units: Array<Unit> = [];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}