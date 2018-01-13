import {Unit} from "../../unit/unit/unit";
export class Lesson {
    id: number;
    name: string = '';
    description: string = '';
    course_id: number;
    units: Array<Unit> = [];
    deleted_at: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}