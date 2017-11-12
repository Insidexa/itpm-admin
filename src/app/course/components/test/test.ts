import {Question} from "./question";
export class Test {
    id: number;
    unit_id: number;
    questions: Array<Question> = [];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}